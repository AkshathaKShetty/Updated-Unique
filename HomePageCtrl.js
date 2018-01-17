var myHome = angular.module("myHome", []);

//Service to get JSON Data
myHome.service('getDataService', function ($http) {
    this.getallproducts = function () {
        return $http.get('Products.json');
    };
});

////Directive for Tile View
//myHome.directive("tileView", function () {
//        return {
//            restrict: 'E',
//            templateUrl: 'TileView.html',
//            scope: {
//                itemInfo:'=itemInfo'
//            }
//        }
//    });

myHome.controller('HomePageCtrl', function ($scope, getDataService) {
    getDataService.getallproducts().then(function (resp) {
        $scope.products = resp.data;
        $scope.count = $scope.products.length;
    });


    $scope.search = function (item) {
       
        if ($scope.searchText == undefined) {
            return true;
        }
        else {
            
            if (item.name.toLowerCase()
                                 .indexOf($scope.searchText.toLowerCase()) != -1 ||
                        item.cost.toString()
                                 .indexOf($scope.searchText) != -1||
                        item.rating.toString()
                                 .indexOf($scope.searchText) != -1) {
                return true;
            }
        }

        return false;
    };

});
myHome.filter('unique', function() {
   return function(collection, keyname) {
    var output = [], 
    keys = [];
      angular.forEach(collection, function(item) {
          console.log("item",item);
          console.log("collection",collection);
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
          console.log("keys.indexOf(key)",keys.indexOf(key));
          console.log("key",key);
          console.log("collection",collection);
          keys.push(key); 
          output.push(item);
           console.log("keys",keys);
              console.log("output",output);
          }
      });
      return output;
   };
});

myHome.filter('search', function() {
   return function(collection, keyname) {
    var output = [], 
    keys = [];
      angular.forEach(collection, function(item) {
        
          var key = item[keyname];
          console.log("key",key);
          console.log("collection",collection);
          if(keys.indexOf(key) === -1) {
          keys.push(item); 
          output.push(item);
         }
      });
      return output;
   };
});







