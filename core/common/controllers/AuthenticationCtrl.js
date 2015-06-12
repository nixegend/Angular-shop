define(['app', 'directHtml'], function (app) {
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

        function including(param) {
            if (param) {
                // $scope.cssStyles = '/admin/css/admin-styles.css';
                $scope.appView = '/admin/index.html';
            } else {
                // $scope.cssStyles = '/user/css/client-styles.css';
                $scope.appView = '/user/index.html';
            }
        };

        function viewSide() {
        if (findAdmin() != -1) {
            getUserData().then(function (data) {
                if (checkUserCredentials(data)) {
                    including(true);
                } else {
                    including(false);
                    $location.path('/');
                    $timeout(function() {
                        $rootScope.openLoginFormModal();
                    }, 400);
                }
            });
            } else {
                including(false);
            }
        };

            viewSide();
        $scope.$on("$routeChangeSuccess", function () {
            viewSide();
        });

  }]).run(['$route', angular.noop]);

});