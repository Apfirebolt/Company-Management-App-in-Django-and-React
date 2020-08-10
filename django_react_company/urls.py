from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django_react_company import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),
    path('frontend/', include(('frontend.urls', 'frontend'), namespace='frontend')),
    path('admin/', admin.site.urls),
    path('company/', include(('company.urls', 'company'), namespace='company')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
