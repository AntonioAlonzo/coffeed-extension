angular.module('app')
    .service('urlStorage', function ($q) {
        var _this = this;
        this.data = [];

        this.sync = function () {
            chrome.storage.sync.set({url: this.data}, function () {
                console.log('Data is stored in Chrome storage');
            });
        }

        this.findAll = function (callback) {
            chrome.storage.sync.get('url', function (keys) {
                if (keys.url != null) {
                    _this.data = keys.url;

                    for (var i = 0; i < _this.data.length; i++) {
                        _this.data[i]['url'] = i + 1;
                    }

                    console.log(_this.data);
                    callback(_this.data);

                    return true;
                }

                return false;
            });
        };

        this.add = function (url) {
            console.log(url);

            var newUrl = {
                id: url.id,
                domain: url.domain
            };

            _this.data.push(newUrl);
            _this.sync();
        };

        this.remove = function (url) {
            this.data.splice(this.data.indexOf(url), 1);
            this.sync();
        }
    })
    .factory('UrlResource', function ($resource, $httpParamSerializerJQLike) {
        return $resource(
            "http://localhost:3000/url/:id",
            {
                id: "@id"
            },
            {
                'query': {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function (data) {
                        return angular.fromJson(data).data;
                    }
                },
                'save': {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (data) {
                        return $httpParamSerializerJQLike(data);
                    }
                }
            }
        );
    });