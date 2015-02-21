define(['app', 'directHeader', 'isActiveLink', 'bootstrap', 'RCMservice', 'APIservice'],
    function (app, RCMservice, APIservice) {
	app.controller('HeaderCtrl', ['$scope', 'RCMservice', 'APIservice',
        function ($scope, RCMservice, APIservice) {

        $scope.langModel = 'en';
        $scope.navMenu = 'partials/nav-menu.html';
        $scope.basket = 'svg/basket.svg';

        APIservice.getJSONresponse('menu').then(function (response) {
            $scope.menu = RCMservice.reConstructor(response);
        });

	}]);
});