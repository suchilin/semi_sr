from django.urls import include, path
from rest_framework.routers import DefaultRouter
from contactos import views

router = DefaultRouter()
router.register(r'contactos', views.ContactoViewSet)
router.register(r'redes', views.RedSocialViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'auth/', include('rest_auth.urls')),
    path(r'auth/registration/', include('rest_auth.registration.urls'))
]
