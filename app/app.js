'use strict';

angular.module('iqrmpApp', [
    'iqrmpApp.views',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.select',
    'ui.bootstrap',
    'monospaced.elastic',
    'dibari.angular-ellipsis',
    'toastr'
]);

angular.module('iqrmpApp')
    .config(['toastrConfig', function (toastrConfig) {
        angular.extend(toastrConfig, {
            progressBar: true
        });
    }]);

angular.module('iqrmpApp')
    .config(['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('report-index');
        });

        $httpProvider.interceptors.push(['$rootScope', '$q', function ($rootScope, $q) {
            return {
                'requestError': function (rejection) {
                    console.log('requestError', rejection);
                    $rootScope.$emit('http-error', rejection);
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    console.log('responseError', rejection);
                    $rootScope.$emit('http-error', rejection);
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);

// CurrentUser management
angular.module('iqrmpApp')
    .run(['$rootScope', '$state', '$resource', '$window', 'User',
        function ($rootScope, $state, $resource, $window, User) {

            angular.element($window).on('resize', function () {
                $rootScope.$broadcast('global:resize');
            });

            // Redirect to login if route requires auth and you're not logged in
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

                if (!User.currentUser.id) {
                    event.preventDefault();
                    $resource('/api/user/me').get().$promise
                        .then(function (me) {
                            angular.copy(me.user, User.currentUser);
                            User.getCurrentUserPrivileges();
                            $state.go(toState.name, toParams);
                        })
                        .catch(function () {
                            $window.location.href = '/login';
                        });
                }
            });

    }]);

