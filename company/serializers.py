from rest_framework import serializers
from . models import Company
from rest_framework.serializers import ValidationError
import re


class CompanySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(max_length=100)
    company_logo = serializers.ImageField()

    class Meta:
        model = Company
        fields = '__all__'

    def validate_company_name(self, value):
        pattern = '^[a-zA-Z0-9,.!?]*$'
        result = re.match(pattern, value)

        if not result:
            raise ValidationError("Company Name cannot contain special characters aside from spaces.")
        return value

    def validate_company_logo(self, value):
        if value.size > 1048576:
            raise ValidationError("Size of the uploaded file should not exceed 1 MB")
        return value



