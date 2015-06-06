define(['app', 'directFooter'], function (app) {
	app.controller('FooterCtrl', ['$scope', function ($scope) {
		var d = new Date();
		$scope.year = d.getFullYear();
	}]);
});