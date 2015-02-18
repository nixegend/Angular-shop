define(['app', 'directFooter'], function (app) {

	app.controller('FooterCtrl', function ($scope) {
		var d = new Date();
		$scope.year = d.getFullYear();
	});

});