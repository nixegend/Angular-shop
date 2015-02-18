define(['app', 'directHeader', 'isActiveLink', 'bootstrap', 'RCMservice', 'APIservice'],
    function (app, RCMservice, APIservice) {
	app.controller('HeaderCtrl', ['$scope', 'RCMservice', 'APIservice',
        function ($scope, RCMservice, APIservice) {

        APIservice.getJSONresponse('menu').then(function (response) {
            $scope.menu = RCMservice.reConstructor(response);
        });

	}]);
});