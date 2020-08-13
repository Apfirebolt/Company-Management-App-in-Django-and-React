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
        queryset = Company.objects.filter(created_by_id=request.user.id)
        serializer = CompanySerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        requestData = request.data
        queryset = Company.objects.all()
        companyObj = get_object_or_404(queryset, pk=pk)
        companyObj.company_name = requestData['company_name']
        companyObj.company_owner = requestData['company_owner']
        companyObj.company_employees = requestData['company_employees']
        companyObj.company_shares = requestData['company_shares']
        companyObj.company_worth = requestData['company_worth']
        if requestData['company_logo']:
            companyObj.company_logo = requestData['company_logo']
        companyObj.save()
        return Response({'message': 'Company Data was updated successfully'}, status=status.HTTP_200_OK)

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
        requestData = request.data
        newCompanyObj = Company(
            created_by=request.user,
            company_name=requestData['company_name'],
            company_owner=requestData['company_owner'],
            company_employees=requestData['company_employees'],
            company_shares=requestData['company_shares'],
            company_worth=requestData['company_worth'],
            company_logo=requestData['company_logo']
        )
        newCompanyObj.save()
        return Response({'message': 'New Company added successfully'}, status=status.HTTP_200_OK)

def company_home(request):
    return render(request, 'company/company_home.html', {})
