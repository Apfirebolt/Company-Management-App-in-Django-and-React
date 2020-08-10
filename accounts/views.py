from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import status
from django.contrib.auth import authenticate

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "message": 'New user was created successfully!'
    }, status=status.HTTP_201_CREATED)

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
      Token.objects.create(user=instance)

# Login API
class LoginAPI(generics.GenericAPIView):

  def post(self, request):
    params = request.data
    user = authenticate(username=params['username'], password=params['password'])
    if user:
      userData = UserSerializer(user).data
      userToken = Token.objects.get(user_id=userData['id'])
      return Response({"message": "You have been successfully logged in, please continue!",
                       "user_data": userData, "token": userToken.key}, status=status.HTTP_200_OK)
    else:
      return Response({"message": "Invalid credentials, Failed to login!"},
                      status=status.HTTP_401_UNAUTHORIZED)

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

# Get data for all users
class ListUserApi(generics.ListAPIView):
  permission_classes = [

  ]
  serializer_class = UserSerializer

  def get_queryset(self):
      qs = User.objects.all()
      return qs