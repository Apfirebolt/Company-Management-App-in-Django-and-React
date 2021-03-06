from django.urls import path
from . views import RegisterAPI, LoginAPI, UserAPI, ListUserApi, LogoutView

urlpatterns = [
  path('api/register', RegisterAPI.as_view()),
  path('api/login', LoginAPI.as_view()),
  path('api/user', UserAPI.as_view()),
  path('api/list', ListUserApi.as_view()),
  path('api/logout', LogoutView.as_view()),
]