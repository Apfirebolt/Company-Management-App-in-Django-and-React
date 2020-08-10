from django.urls import path
from . views import company_home, CompanyViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'api', CompanyViewSet, basename='api')

urlpatterns = [
    path('', company_home, name='company_name'),
]

urlpatterns += router.urls