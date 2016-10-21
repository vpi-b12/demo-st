import logging
import traceback

from pyramid.httpexceptions import HTTPNotFound, HTTPForbidden, HTTPBadRequest, HTTPUnauthorized, HTTPInternalServerError
from pyramid.view import view_config

LOG = logging.getLogger(__name__)

@view_config(context=HTTPBadRequest, renderer='json')
def bad_request(exc, request):
    request.response.status_code = 400

    LOG.error(str(traceback.format_exc(request.exc_info)))
    return {
        'error': 'Bad request',
        'message': exc.detail,
        'explanation': exc.explanation,
        'status': 400,
    }

@view_config(context=HTTPForbidden, renderer='json')
def forbidden(exc, request):
    request.response.status_code = 403

    LOG.error(str(traceback.format_exc(request.exc_info)))
    return {
        'error': 'Forbidden',
        'message': exc.detail,
        'explanation': exc.explanation,
        'status': 403,
    }

@view_config(context=HTTPUnauthorized, renderer='json')
def unauthorized(exc, request):
    request.response.status_code = 401

    LOG.error(str(traceback.format_exc(request.exc_info)))
    return {
        'error': 'Unauthorized',
        'message': exc.detail,
        'explanation': exc.explanation,
        'status': 401,
    }

@view_config(context=HTTPNotFound, renderer='json')
def not_found(exc, request):
    request.response.status_code = 404

    LOG.error(str(traceback.format_exc(request.exc_info)))
    return {
        'error': 'Not Found',
        'message': exc.detail,
        'explanation': exc.explanation,
        'status': 404,
    }
