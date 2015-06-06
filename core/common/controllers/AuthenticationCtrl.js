define(['app', 'directBody'], function (app) {
    app.controller('AuthenticationCtrl', ['$scope', '$http', '$q', '$filter', '$rootScope', '$location', '$timeout', '$window',
        function ($scope, $http, $q, $filter, $rootScope, $location, $timeout, $window) {

        function checkUserCredentials(data) {
        var getUser = $window.sessionStorage.authorizedUser;
            if (undefined != getUser) {
                var uEmail =  getUser.split('/')[0];
                var uName =  getUser.split('/')[1];
                var uPassword =  getUser.split('/')[2];
                var userObj = $filter('filter')(data, {email : uEmail, password : uPassword})[0];
                return (angular.isObject(userObj)) ? true : false;
            } else {
                return false;
            }
        };

        function getUserData() {
        var def = $q.defer();
            $http.get('/core/user/json/users.json').success(function(data) {
                def.resolve(data);
            }).error(function (data, status) {
              alert('Can not get users.json');
                console.log(status);
                def.reject(false);
            });
        return def.promise;
        };

        function findAdmin() {
            return $location.url().split('/').indexOf('admin');
        };

        function viewSide() {
        if (findAdmin() != -1) {
            getUserData().then(function (data) {
                if (checkUserCredentials(data)) {
                    $scope.adminView = '/admin/index.html';
                } else {
                    $scope.adminView = '/user/index.html';
                    $location.path('/');
                    $rootScope.openLoginFormModal();
                }
            });
            } else {
                $scope.adminView = '/user/index.html';
            }
        };

            viewSide();
        $scope.$on("$routeChangeSuccess", function () {
            viewSide();
        });

  }]).run(['$route', angular.noop]);

});