from django.shortcuts import render
from django.views.generic import TemplateView


class FrontendHome(TemplateView):
    template_name = 'frontend/index.html'


class FriendsHome(TemplateView):
    template_name = 'frontend/friends_home.html'