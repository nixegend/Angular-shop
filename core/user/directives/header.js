define(['app'], function (app) {

	app.directive('boxHeader', function () {
		return {
			restrict: 'E',
			replace: true,
			controller: 'HeaderCtrl',
			templateUrl: '/user/partials/header.html'
		};
	});

});