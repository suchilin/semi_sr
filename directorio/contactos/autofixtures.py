from contactos.models import Contacto
from autofixture import generators, register, AutoFixture
from random import randint


class ContactoAutoFixture(AutoFixture):
    field_values={
        'nombre': generators.FirstNameGenerator(),
        'apellidos': generators.LastNameGenerator(),
        'direccion': generators.StringGenerator(),
        'telefono': '+'+str(randint(100000000000, 1000000000000))
    }

register(Contacto, ContactoAutoFixture)
