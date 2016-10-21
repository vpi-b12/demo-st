angular.module('demoApp')

    .service('User', ['$resource', '$q', function ($resource) {
        'use strict';

        var resource = $resource('/api/user/:id', { id: '@ID' }, {'update': { method: 'PUT' }}),
            resourceMe = $resource('/api/user/me');

        var self = this;

        self.currentUser = {};

        self.me = function () {
            return resourceMe.get().$promise
                .then(function (result) {
                    return result.user;
                });
        };

        self.getList = function () {
            return resource.get().$promise
                .then(function (result) {
                    return result.users || [];
                });
        };

        self.get = function (userID) {
            return resource.get({ id: userID }).$promise
                .then(function (result) {
                    return result.user
                });
        };

        self.save = function (user) {
            return resource.save(null, user).$promise
                .then(function (result) {
                    return result.user
                });
        };

        self.remove = function (user) {
            return resource.remove({ id: user.id }, user).$promise;
        };

        self.update = function (user) {
            return resource.update({ id: user.id }, user).$promise
                .then(function (result) {
                    return result.user
                });
        };
    }])