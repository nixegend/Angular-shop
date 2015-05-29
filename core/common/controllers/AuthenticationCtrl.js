define(['app', 'directBody'], function (app) {
    app.controller('AuthenticationCtrl', ['$scope', '$location', '$timeout', '$window',
        function ($scope, $location, $timeout, $window) {

        if ($location.url().split('/').indexOf('admin') != -1) {
            $scope.adminView = '/admin/index.html';
        } else {
            $scope.adminView = '/user/index.html';
        }

        $scope.$on("$routeChangeSuccess", function () {
            if ($location.url().split('/').indexOf('admin') != -1) {
                $scope.adminView = '/admin/index.html';
            } else {
                $scope.adminView = '/user/index.html';
            }
        });

        console.log($scope.adminView);

        // var arrUrl = $location.path().split('/');
        // var authenticated = $window.sessionStorage.authorizedUser;

        // if (arrUrl.indexOf('admin') != -1) {
        //     if (authenticated == undefined) {
        //         $location.path('/login');
        //     }
        // }

  }]).run(['$route', angular.noop]);

// run.run(['$route', function($route)  {
//   $route.reload();
// }]);

});