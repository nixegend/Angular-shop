define(['app'], function (app) {

	app.directive('ngHtml', function ($http, $templateCache, $compile, $parse) {
		return {
			restrict: 'E',
			replace: true,
			controller: 'AuthenticationCtrl',
            link: function(scope , element, attrs) {
              var myView = $parse(attrs.view)(scope);
              $http.get(myView, {cache: $templateCache}).success(function(tplContent){
                element.replaceWith($compile(tplContent)(scope));
              });
            }
		};
	});

});