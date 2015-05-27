define(['app'], function (app) {

    app.controller('LoginFormCtrl', ['$scope', '$timeout', '$filter', '$window', '$http', '$location',
        function ($scope, $timeout, $filter, $window, $http, $location) {

        $scope.logIn = function(userEmail, userPassword) {
            $http.get('/js/json/users.json').success(function (data) {

                var userObj = $filter('filter')(data, {email : userEmail, password : userPassword})[0];

                if (angular.isObject(userObj)) {
                    $window.sessionStorage.authorizedUser = userEmail;
                    window.location.href = $location.host()+'/admin/';
                } else {
                    $scope.wrongCredentials = true;
                    $timeout(function () {
                        $scope.wrongCredentials = false;
                    }, 3700);
                }

            }).error(function (data) {
                alert('Can not get users.json');
                console.log(data);
            });
        };

    }]);
});