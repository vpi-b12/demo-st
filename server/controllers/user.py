from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPForbidden, HTTPBadRequest, HTTPUnauthorized, HTTPNoContent

from mongoengine import errors

from iqrmp.models.model import PasswordField
from iqrmp.models.user import User
from iqrmp.models.role import Role
from iqrmp.views.view import PrivateView


@view_defaults(renderer='json')
class UserView(PrivateView):
    @view_config(route_name='user_collection', request_method='GET')
    def get_collection(self):
        return {'users': User.objects()}

    @view_config(route_name='user_id', request_method='GET')
    def get_id(self):
        user_id = self.request.matchdict.get('uid', None)
        user = self.get_user(user_id)

        return {'user': user}

    @view_config(route_name='user_collection', request_method='POST')
    def create(self):
        user = User(
            email=body.get('email'),
            password=body.get('password'),
            first_name=body.get('first_name'),
            last_name=body.get('last_name'),
            roles=body.get('roles'),
            company=body.get('company')['name']
        ).save()

        return {'user': user}

    @view_config(route_name='user_id', request_method='DELETE')
    def delete(self):
        user_id = self.request.matchdict.get('uid', None)
        user = self.get_user(user_id)

        user.delete()
        return HTTPNoContent()

    @view_config(route_name='user_id', request_method='PUT')
    def update(self):
        user_id = self.request.matchdict.get('uid', None)
        user = self.get_user(user_id)

        body = self.request.json_body

        user.update(
            email=body.get('email', user.email),
            first_name=body.get('first_name', user.first_name),
            last_name=body.get('last_name', user.last_name),
            password=PasswordField(algorithm='sha1').set_password(body.get('new_password')),
            roles=body.get('roles'),
            company=body.get('company', user.company)['name']
        )
    

        return {'user': User.objects.exclude('password').get(id=user_id)}
        
    @view_config(route_name='user_me', request_method='GET')
    def me(self):
        return {'user': self.logged_user}
