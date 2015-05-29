define(['app'], function (app) {

	app.directive('ngBody', function() {
		return {
			restrict: 'A',
			replace: false,
			controller: 'AuthenticationCtrl'
		};
	});

});