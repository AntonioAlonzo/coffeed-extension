angular.module("app", ["ui.router", "ngMaterial", "ngResource"])
    .config(
        function ($stateProvider, $urlRouterProvider, $compileProvider, $mdThemingProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'MainController'
                })
                .state('list', {
                    url: '/list',
                    templateUrl: 'templates/url_list.html',
                    controller: 'UrlListController'
                })
                .state('details', {
                    url: '/:id',
                    templateUrl: 'templates/url_articles.html',
                    controller: 'UrlDetailController'
                })
                .state('create', {
                    url: '/create',
                    templateUrl: 'templates/new_url_form.html',
                    controller: 'NewUrlController'
                });

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

            $mdThemingProvider.theme('default')
                .primaryPalette('orange')
                .accentPalette('orange');

            $mdThemingProvider.theme('dark', 'default')
                .primaryPalette('orange')
                .dark();
        });
