define(['app'], function (app) {

	app.directive('boxFooter', function() {
		return {
			restrict: 'EA',
			replace: true,
			controller: 'FooterCtrl',
			templateUrl: 'partials/footer.html'
		};
	});

});