define(['app'], function (app) {

    app.controller('AuthenticationCtrl', ['$scope', '$timeout', '$filter', '$window', '$http', '$location',
        function ($scope, $timeout, $filter, $window, $http, $location) {

        $scope.logOut = function() {
            delete $window.sessionStorage['authorizedUser'];
            $location.path('/');
        };

        var arrUrl = $location.path().split('/');
        var authenticated = $window.sessionStorage.authorizedUser;

        if (arrUrl.indexOf('admin') != -1) {
            if (authenticated == undefined) {
                $location.path('/login');
            }
        }

    }]);

});