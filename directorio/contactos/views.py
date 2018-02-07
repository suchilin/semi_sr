from rest_framework import viewsets
from rest_framework.response import Response
from contactos.models import Contacto, RedSocial
from contactos.serializers import ContactoSerializer, RedSocialSerializer


class ContactoViewSet(viewsets.ModelViewSet):
    queryset=Contacto.objects.all().order_by('apellidos')
    serializer_class = ContactoSerializer

class RedSocialViewSet(viewsets.ModelViewSet):
    queryset=RedSocial.objects.all()
    serializer_class = RedSocialSerializer

    def get_queryset(self):
        contacto_id = self.request.GET.get('contacto_id')
        redes = RedSocial.objects.all()
        if contacto_id:
            contacto = Contacto.objects.get(id=contacto_id)
            redes = redes.filter(contacto = contacto)
        return redes



