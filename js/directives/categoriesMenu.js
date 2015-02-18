define(['app', 'isActiveLink'], function (app) {

    app.directive("categoriesMenu", ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                categories: '='
            },
            template: '<ul><li ng-repeat="item in categories">' +
            '<a is-active ng-hide="item.subLevel.length > 0" ng-href="#{{item.path}}">{{item.name}}</a>' +
            '<span class="head" ng-click="toggleShowHideMenu(this)" ng-show="item.subLevel.length > 0">' +
            '<i class="fa fa-caret-down"></i> {{item.name}} <i class="fa fa-level-down"></i></span>' +
            '<categories-menu ng-if="item.subLevel.length > 0" categories="item.subLevel">' +
            '</categories-menu></li></ul>',
            replace: true,
            compile: function (element) {
                //We are removing the contents/innerHTML from the element we are going to be applying the
                //directive to and saving it to adding it below to the $compile call as the template
                var contents = element.contents().remove();
                var compiled;
                return function(scope, element){
                    if(!compiled) {
                    //Get the link function with the contents frome top level template with
                    //the transclude
                        compiled = $compile(contents);
                    }


                    //     $(this).parent().children('ul.tree').toggle(300);

                    scope.toggleShowHideMenu = function(thisElem) {
                            // if(scope.parentData) {
                            //     var itemIndex = scope.parentData.indexOf(scope.val);
                            //   scope.parentData.splice(itemIndex,1);
                            // }
                            // scope.val = {};
                            console.log(thisElem.item);
                    }
                    //Call the link function to link the given scope and
                    //a Clone Attach Function, http://docs.angularjs.org/api/ng.$compile :
                    // "Calling the linking function returns the element of the template.
                    //    It is either the original element passed in,
                    //    or the clone of the element if the cloneAttachFn is provided."
                    compiled(scope,function(clone){
                        //Appending the cloned template to the instance element, "iElement",
                        //on which the directive is to used.
                        element.append(clone);
                    });
                };
            }

        };
    }]);

});