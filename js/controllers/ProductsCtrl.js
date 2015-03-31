define(['app', 'RCMservice', 'APIservice'], function (app) {

	app.controller('ProductsCtrl', ['$scope', '$http', 'RCMservice', 'APIservice',
		function ($scope, $http, RCMservice, APIservice) {
//==============================================================
	   	$scope.productsFilters = function (obj) {
			var newObj = new Object();
			var filterCriteria = ['manufacturer', 'memory'];

			for (var i = 0; i < filterCriteria.length; i++) {
				var arrCriteria = obj.map(function (m) {
						for (var p in m) {
							return m[filterCriteria[i]];
						}
					}).filter(function (m, idx, arr) {
						return arr.indexOf(m) == idx;
					});

				if(isNaN(arrCriteria[0])){
					newObj[filterCriteria[i]] = arrCriteria.sort();
				} else {
					newObj[filterCriteria[i]] = arrCriteria.sort(function(a, b){return a-b});
				}
			}

			$scope.filterCriteria = newObj;
		};

		function getDomElement(element, all) {
			if (all && all !== undefined) {
				return document.querySelectorAll(element);
			} else {
				return document.querySelector(element);
			}
		};

		function ngElement(element) {
			return angular.element(element);
		};

		var sortDescAsc = getDomElement('#sortDescAsc');

		$scope.sortChanged = function() {
			$scope.sortoptions = ['memory', 'model', 'price'];
		var predicateSort = ($scope.sortCriteria == undefined) ? $scope.sortoptions[0] : $scope.sortCriteria;
			$scope.predicate = predicateSort;
			$scope.sortCriteria = predicateSort;
		}

			$scope.sortChanged();

		$scope.sortDescAscBtn = function() {
			ngElement(sortDescAsc).toggleClass('fa-sort-amount-asc fa-sort-amount-desc');
			$scope.reverse = !$scope.reverse;
		}

			$scope.sortDescAscBtn();
  			$scope.layouts = ['partials/layout-list.html', 'partials/layout-box.html'];

		$scope.boxListLayout = function(layout) {
  			$scope.layout = (layout == 'list') ? $scope.layouts[0] : $scope.layouts[1];

  			$scope.radioModel = layout;
			$scope.box = !$scope.box;
			$scope.list = !$scope.list;
		}

  			$scope.boxListLayout('list');

//==============================================================
		$scope.count = function (value, prop) {
			return function (obj) {
			  return obj[prop] == value;
			}
		}
//==============================================================

		$http.get('/js/json/phones.json').success(function (data, status, headers, config){
			$scope.productsFilters(data);
			$scope.dataProducts = data;

	  		var criteriaObj = {};
			$scope.filterProducts = function (param, prop) {
			  var arrProducts = [];

			  function getProductsObj (scopeArr) {
				arrProducts = [];
				return (scopeArr.length == 0) ? data : scopeArr;
			  }

			  if (criteriaObj.hasOwnProperty(prop)) {
				var x = criteriaObj[prop].indexOf(param);
				if (x > -1) {
				  criteriaObj[prop].splice(x, 1);
				  if (criteriaObj[prop].length == 0)
				  delete(criteriaObj[prop]);
				} else {
				  criteriaObj[prop].push(param);
				}
			  } else {
				criteriaObj[prop] = [param];
			  }

			  for (var p in criteriaObj) {
				getProductsObj(arrProducts).map(function (obj) {
				  if (criteriaObj[p].indexOf(obj[p]) > -1)
					arrProducts.push(obj);
				});
			  }

			  	if (param === true && prop === true) {
				  	criteriaObj = {};
	  				arrProducts = [];
			  	}

			  var retakeProducts = (arrProducts.length == 0) ? data : arrProducts;
			  $scope.productsPagenation(retakeProducts);
			}

  			$scope.productsPagenation(data);

  			$scope.filtersReset = function() {
  				$scope.filterProducts(true, true);
			}

		}).error(function (data, status, headers, config) {
			console.log(status);
			alert('can not get phones.json');
		});

//==============================================================

		$scope.productsPagenation = function(obj) {

			$scope.pagerOptions = {
				selectArr: [8, 16, 32, 64, 128, 'All'],
				totalItems: obj.length,
				itemsPerPage: 8,
				currentPage: 1,
				maxSize: 3
			};

			$scope.pageChanged = function() {
			var items = $scope.pagerOptions.itemsPerPage;
				items = (items == 'All') ? obj.length : +items;

				var begin = (($scope.pagerOptions.currentPage - 1) * items);
				var end = items + begin;
				$scope.displayProducts = obj.slice(begin, end);
			}
			$scope.pageChanged();
		}

		$scope.boxesInRow = 4;
//==============================================================

    APIservice.getJSONresponse('categories').then(function (response) {
       $scope.categories = RCMservice.reConstructor(response);
    });

    $scope.categoriesMenu = 'partials/categories-menu.html';

//==============================================================

// todo : use nativ script and angular
	$scope.toggleShowHideMenu = function (event) {
		// $(event.target).next('ul').slideToggle()
	}

	$scope.collapseAll = function() {
		// $('#categoriesMenu span.head').each(function() {
		// 	$(this).next('ul').slideUp();
		// });
	}

	$scope.expandAll = function() {
		// $('#categoriesMenu span.head').each(function() {
		// 	$(this).next('ul').slideDown();
		// });
	}

//==============================================================

	}]);


	app.filter('rows', function() {
	    return function(arrLength) {
	        var numRows = Math.ceil(arrLength);
	        var arrRows = [];
	        for (var i = 0; i < numRows; i++) {
	            arrRows[i] = i;
	        }
	        return arrRows;
	    };
	});


});