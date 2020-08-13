from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from . models import Company
from . serializers import CompanySerializer
from django.shortcuts import get_object_or_404
from rest_framework import status


class CompanyViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    serializer_class = CompanySerializer  # add this
    queryset = Company.objects.all()

    def list(self, request):
        print('Request user is ', request.user)
        queryset = Company.objects.filter(created_by_id=request.user.id)
        serializer = CompanySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Company.objects.all()
        companyObj = get_object_or_404(queryset, pk=pk)
        serializer = CompanySerializer(companyObj)
        return Response(serializer.data)

    def delete(self, request, pk=None):
        queryset = Company.objects.all()
        companyObj = get_object_or_404(queryset, pk=pk)
        companyObj.delete()
        return Response({'message': 'Company %s was successfully deleted' % companyObj.company_name},
                        status=status.HTTP_200_OK)

    def post(self, request):
        pass

def company_home(request):
    return render(request, 'company/company_home.html', {})
