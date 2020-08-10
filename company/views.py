from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from . models import Company
from . serializers import CompanySerializer
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import status


class CompanyViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    serializer_class = CompanySerializer  # add this
    queryset = Company.objects.all()

    def list(self, request):
        queryset = Company.objects.all()
        serializer = CompanySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Company.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = CompanySerializer(user)
        return Response(serializer.data)

    def create(self, request):
        # Once you are done, create the instance with the validated data
        try:
            serializer = CompanySerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'message': 'New Company was successfully posted'}, status=status.HTTP_201_CREATED)
        except Exception as err:
            print(err)
            return Response({'message': 'Some error occured'}, status=status.HTTP_400_BAD_REQUEST)



def company_home(request):
    return render(request, 'company/company_home.html', {})
