/*globals console, angular, document*/

angular.module('iqrmpApp')
    .controller('UserIndexCtrl', ['$scope', 'User', 'Report', 'userList', 
        function ($scope, User, Report, userList) {
        'use strict';

        $scope.userList = userList;
        $scope.currentUser = User.currentUser;

        angular.copy({}, Report.currentReport);
    }])

    .controller('UserDetailCtrl', ['$rootScope', '$scope', '$state', 'User', 'Role', 'action', 'user',
        function ($rootScope, $scope, $state, User, Role, action, user) {

        'use strict';

        // Action from the router
        $scope.action = action;
        $scope.user = user;
        $scope.currentUser = User.currentUser;

        $scope.disabled = ['View', 'Delete'].indexOf(action) > -1;
        $scope.returnLabel = ($scope.action === 'View') ? 'Back to the list' : 'Cancel';
        $scope.saveBtnLabel = ($scope.action === 'Delete') ? 'Delete' : 'Save';

        // Save the user
        $scope.save = function (user) {
            user.roles = _.pluck(user.roles, 'id');

            switch ($scope.action) {
                case 'Create':
                    User.save(user)
                    break;
                case 'Delete':
                    User.remove(user)
                    break;
                case 'Edit':
                    User.update(user)
                    break;
            }
        };
    }]);
