from django.db import models
from django.contrib.auth.models import User

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)

    def __str__(self):
        return '%s %s'%(self.nombre, self.apellidos)

    class Meta:
        db_table='contactos'

class RedSocial(models.Model):
    nombre = models.CharField(max_length=100)
    contacto = models.ForeignKey(Contacto, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table='redes_sociales'


