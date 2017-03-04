(function() {

    ww = {};
    var self;
    ww.angular = {
        // extends deferred with $http compatible .success and .error functions
        $httpDeferredExtender: function(deferred) {
            deferred.promise.success = function(fn) {
                deferred.promise.then(fn, null);
                return deferred.promise;
            }
            deferred.promise.error = function(fn) {
                deferred.promise.then(null, fn);
                return deferred.promise;
            }
            return deferred;
        },
        // creates a resolved/rejected promise from a value
        $httpPromiseFromValue: function($q, val, reject) {
            var def = $q.defer();
            if (reject)
                def.reject(val);
            else
                def.resolve(val);
            self.$httpDeferredExtender(def);
            return def.promise;
        }
    };
    self = ww.angular;

    var app = angular.module('cvbuilder');

    app.service('cvFactory', ['$http', '$q','loaderFactory',
        function($http, $q, loaderFactory) {
            var cvFactory = {
                obj: {
                    data: {},
                    email: ''
                },
                getData: function(email, isDownload) {

                    var defer = $q.defer(),
                        req;

                    if (email && email == this.obj.email)
                        return ww.angular.$httpPromiseFromValue($q, this.obj.data);
                    else if (email) {
                        req = {
                            method: 'POST',
                            url: 'phpservice/get.php',
                            data: {
                                'email': email,
                                'isDownload': isDownload
                            }
                        }
                    } else {
                        req = {
                            method: 'GET',
                            url: 'mockdata/cvform.json',
                        }
                    }
                    if (req)
                        loaderFactory.show();
                        $http(req).success(function(result) {
                            if (result && result.data)
                                defer.resolve(JSON.parse(result.data));
                            else defer.resolve(result);
                        }).error(function(data) {
                            defer.reject(data);
                        }).finally(function(){
                            loaderFactory.hide();
                        });

                    return defer.promise;
                },
                storeData: function(data, timestamp) {
                    var postData = angular.copy(data);
                    var defer = $q.defer();
                    postData.forEach(function(obj) {
                        delete obj.$$hashKey;
                        delete obj.form;
                        delete obj.active;
                        delete obj.visited;
                    });
                    postData[0].active = true;
                    this.obj.data = postData;
                    this.obj.email = data[0].fields.Email_Address;

                    loaderFactory.show();
                    $http.post('phpservice/store.php', {
                        data: JSON.stringify(this.obj.data),
                        email: this.obj.email,
                        timestamp: timestamp
                    }).success(function(data, status, headers, config) {
                        if (data.status == 'Success') {
                            defer.resolve(data.user);
                        }else defer.reject();
                    }).error(function(data, status, headers, config) {
                        defer.reject();
                    }).finally(function(){
                        loaderFactory.hide();
                    });
                    return defer.promise;
                }
            }
            return cvFactory;
        }
    ]);

    app.factory("injectCSS", ['$q', '$http','$timeout', function($q, $http,$timeout) {
        var injectCSS = {};

        var createLink = function(id, url) {
            var link = document.createElement('link');
            link.id = id;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            return link;
        }

        var checkLoaded = function(url, deferred, tries) {
            for (var i in document.styleSheets) {
                var href = document.styleSheets[i].href || "";
                if (href.indexOf(url) != -1) {
                    deferred.resolve();
                    return;
                }
            }
            tries++;
            $timeout(function() {
                checkLoaded(url, deferred, tries);
            }, 50);
        };

        injectCSS.delete = function() {
            var deferred = $q.defer();

            if (angular.element('link[id]').length) {
                angular.element('link[id]').remove();
                deferred.resolve();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        injectCSS.set = function(id, url) {
            var tries = 0,
                deferred = $q.defer(),
                link;

            if (!angular.element('link#' + id).length) {
                link = createLink(id, url);
                link.onload = deferred.resolve;
                angular.element('head').append(link);
            }
            checkLoaded(url, deferred, tries);

            return deferred.promise;
        };

        return injectCSS;
    }]);

    app.service('userFactory',['$http','$q', 'loaderFactory',
      function($http, $q, loaderFactory){
        return {
            checkLogin: function() {
                loaderFactory.show();
                var defer = $q.defer();
                $http.get('../phpservice/checklogin.php').
                success(function(data, status, headers, config) {
                    if (data.status == 'Success') {
                        defer.resolve(data.user);
                    }else defer.reject(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                }).finally(function(){
                    loaderFactory.hide();
                });
                return defer.promise;
            },
            logout: function() {
                loaderFactory.show();
                var defer = $q.defer();
                $http.post('../phpservice/logout.php').
                success(function(data, status, headers, config) {
                    if (data.status == 'Success') {
                        defer.resolve();
                    } else {
                        defer.reject(data);
                    }
                }).
                error(function(data, status, headers, config) {
                    defer.reject();
                }).finally(function() {
                    loaderFactory.hide();
                });
                return defer.promise;
            },
            checkUser: function(postData) {
                loaderFactory.show();
                var defer = $q.defer();

                $http.post('../phpservice/checkUser.php', postData).
                success(function(data, status, headers, config) {
                    if (data.status == 'Success') {
                        defer.resolve();
                    } else {
                        defer.reject(data);
                    }
                }).
                error(function(data, status, headers, config) {
                    defer.reject(data);
                }).finally(function() {
                    loaderFactory.hide();
                });
                return defer.promise;
            },
            registerUser: function(postData) {
                loaderFactory.show();
                var defer = $q.defer();

                $http.post('../phpservice/register.php', postData).
                success(function(data, status, headers, config) {
                    if (data.status == 'Success') {
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }).
                error(function(data, status, headers, config) {
                    defer.reject();
                }).finally(function() {
                    loaderFactory.hide();
                });
                return defer.promise;
            },
            loginUser: function(postData) {
                loaderFactory.show();
                var defer = $q.defer();

                $http.post('../phpservice/login.php', postData).
                success(function(data, status, headers, config) {
                    if (data.status == 'Success') {
                        defer.resolve();
                    } else {
                        defer.reject(data);
                    }
                }).
                error(function(data, status, headers, config) {
                    defer.reject(data);
                }).finally(function() {
                    loaderFactory.hide();
                });
                return defer.promise;
            }
        }
    }]);
    app.service('loaderFactory',['$rootScope',
      function($rootScope){
        return {
            show: function() {
                $rootScope.$broadcast('loaderChange',true);
            },
            hide: function() {
                $rootScope.$broadcast('loaderChange',false);  
            }
        }
    }]);

})();
