define(['app'], function (app) {

	app.directive('boxLoginForm', function () {
		return {
			restrict: 'E',
			replace: true,
			controller: 'LoginFormCtrl',
			templateUrl: '/user/partials/login-form.html'
		};
	});

});