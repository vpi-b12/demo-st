from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator

from mongoengine import connect, errors

import ConfigParser, os
import models
import views
import addons
import privileges


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    connect('iqrmp', host=settings['iqrmp.mongo.uri'] )

    config = Configurator(settings=settings)

    config.include('pyramid_chameleon')

    ### FIXME - dev only
    #config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('static', 'iqrmp:static')

    # Security policies
    authn_policy = AuthTktAuthenticationPolicy(settings['iqrmp.secret'], hashalg='sha512')
    authz_policy = ACLAuthorizationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)

    config.add_route('login',                             '/login')
    config.add_route('logout',                            '/logout')

    config.add_route('user_collection',                   '/api/user')
    config.add_route('user_me',                           '/api/user/me')
    config.add_route('user_id',                           '/api/user/{uid}')

    config.add_route('company_collection',                '/api/company')

    config.add_route('report_collection',                 '/api/report')
    config.add_route('report_id',                         '/api/report/{rid}')

    config.add_route('index',                             '/')
    config.add_route('default',                           '/{route}')

    config.scan()

    return config.make_wsgi_app()
