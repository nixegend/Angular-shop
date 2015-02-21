define(['app', 'directHeader', 'isActiveLink', 'bootstrap', 'RCMservice', 'APIservice'],
    function (app, RCMservice, APIservice) {
	app.controller('HeaderCtrl', ['$scope', '$rootScope', 'RCMservice', 'APIservice',
        function ($scope, $rootScope, RCMservice, APIservice) {

        $scope.langModel = 'en';
        $scope.navMenu = 'partials/nav-menu.html';
        $scope.basket = 'svg/basket.svg';
        $rootScope.siteName = 'Ng-Shop';

        APIservice.getJSONresponse('menu').then(function (response) {
            $scope.menu = RCMservice.reConstructor(response);
        });

	}]);
});