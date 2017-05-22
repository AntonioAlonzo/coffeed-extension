angular.module("app")
    .controller("MainController", function ($scope, UrlResource, urlStorage) {
        $scope.title = "Mis feeds";
        $scope.urlStorage = urlStorage;

        $scope.$watch('urlStorage.data', function () {
            $scope.urlList = $scope.urlStorage.data;
        });

        $scope.urlStorage.findAll(function (data) {
            $scope.urlList = data;
            $scope.$apply();
        });
    })
    .controller("UrlDetailController", function ($scope, UrlResource, $stateParams) {
        $scope.title = "Artículos";
        $scope.url = UrlResource.get({id: $stateParams.id});
    })
    .controller("UrlListController", function ($scope, UrlResource, urlStorage, $location) {
        $scope.title = "Mis feeds";
        $scope.urlList = UrlResource.query();
        $scope.urlStorage = urlStorage;
        $scope.selectedUrls = []; // URLs que serán almacenadas en el storage de Chrome

        $scope.continue = function () {
            $scope.selectedUrls.forEach($scope.urlStorage.add);
            $location.path('/');
        };

        $scope.toggle = function (item, list) {
            var index = list.indexOf(item);

            if (index > -1) {
                list.splice(index, 1);
            } else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
    })
    .controller("NewUrlController", function ($scope, UrlResource) {
        $scope.url = {};
        $scope.title = "Agregar nuevo feed";

        $scope.saveUrl = function () {
            UrlResource.save({data: $scope.url}, function (data) {
                console.log(data);
            });
        }
    });
