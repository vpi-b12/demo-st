/*globals console, angular, document*/

angular.module('iqrmpApp')
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('user-index', {
                url: '/user',
                templateUrl: 'user.index.html',
                controller: 'UserIndexCtrl',
                resolve: {
                    userList: ['User', function (User) {
                        return User.getList();
                    }]
                }
            })
            .state('user-create', {
                url: '/user/create',
                templateUrl: 'user.detail.html',
                controller: 'UserDetailCtrl',
                resolve: {
                    action: function () { return 'Create'; },
                    user: function () { return {}; },
                    companies: ['Company', function (Company) {
                        return Company.getList();
                    }]
                }
            })
            .state('user-delete', {
                url: '/user/:ID/delete',
                templateUrl: 'user.detail.html',
                controller: 'UserDetailCtrl',
                resolve: {
                    action: function () { return 'Delete'; },
                    user: ['$stateParams', 'User', function ($stateParams, User) {
                        return User.get($stateParams.ID);
                    }],
                    companies: ['Company', function (Company) {
                        return Company.getList();
                    }]
                }
            })
            .state('user-edit', {
                url: '/user/:ID/edit',
                templateUrl: 'user.detail.html',
                controller: 'UserDetailCtrl',
                resolve: {
                    action: function () { return 'Edit'; },
                    user: ['$stateParams', 'User', function ($stateParams, User) {
                        return User.get($stateParams.ID);
                    }],
                    companies: ['Company', function (Company) {
                        return Company.getList();
                    }]
                }
            });
    }]);