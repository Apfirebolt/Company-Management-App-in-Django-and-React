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
from django.views.decorators.csrf import csrf_exempt

# Register API

class RegisterAPI(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = []

  def create(self, request, *args, **kwargs):  # <- here i forgot self
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    token, created = Token.objects.get_or_create(user=serializer.instance)
    return Response({
      'token': token.key,
      'message': 'You have successfully registered'
    }, status=status.HTTP_201_CREATED, headers=headers)


# Login API
class LoginAPI(generics.GenericAPIView):
  permission_classes = []

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