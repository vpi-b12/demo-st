from mongoengine import Document, EmailField, StringField, BooleanField, ListField, ReferenceField, errors

from iqrmp.models.model import PasswordField
from iqrmp.models.role import Role


class User(Document):
    email = EmailField(required=True, unique=True)
    password = PasswordField(algorithm='sha1', required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    is_root_admin = BooleanField(required=True, default=False)
    company = ReferenceField(Company, required=True)
    roles = ListField(ReferenceField(Role))
