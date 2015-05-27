define(['app'], function (app) {

	app.directive('boxLoginForm', function () {
		return {
			restrict: 'E',
			replace: true,
			controller: 'LoginFormCtrl',
			templateUrl: 'partials/login-form.html'
		};
	});

});