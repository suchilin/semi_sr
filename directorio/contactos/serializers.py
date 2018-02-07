from rest_framework import serializers
from contactos.models import Contacto, RedSocial

class ContactoSerializer(serializers.ModelSerializer):
    #redes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Contacto
        fields = '__all__'

class RedSocialSerializer(serializers.ModelSerializer):

    class Meta:
        model = RedSocial
        fields = '__all__'
