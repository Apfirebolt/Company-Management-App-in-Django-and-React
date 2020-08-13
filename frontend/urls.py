from django.urls import path
from . views import FrontendHome, FriendsHome


urlpatterns = [
    path('friends', FriendsHome.as_view(), name='friends_home'),
    path('', FrontendHome.as_view(), name='front_home'),

]
