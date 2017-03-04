(function() {
    "use strict";

    var app = angular.module('cvbuilder');

    app.directive('loginBox', function($location, $http, userFactory) {
        return {
            restrict: 'A',
            templateUrl:'cvbuilder/views/login.html',
            scope:{
                model: '='
            },
            link: function(scope, element, attrs) {

                scope.loginObj = {};

                userFactory.checkLogin().then(function(data) {
                    scope.loginObj.email = data;
                }, function(err) {
                });

                scope.logout = function() {
                    userFactory.logout().then(function() {
                        window.location = 'index.html';
                    },
                    function(err) {
                        console.log(err);
                    });
                }


                scope.checkUser = function() {
                    var postData = {
                        email: scope.loginObj.email
                    }
                    scope.returningUser = false;
                    scope.newUser = false;
                    scope.loadingView = true;

                    userFactory.checkUser(postData).then(function(){
                        scope.returningUser = true;
                    },function(){
                        scope.newUser = true;
                    });

                }
                scope.register = function() {
                    if (scope.loginObj.password != scope.loginObj.cnfpassword) {
                        scope.msg = 'Password donot match';
                        return;
                    }
                    var postData = {
                        email: scope.loginObj.email,
                        password: scope.loginObj.password
                    }
                    userFactory.registerUser(postData).then(function(){
                        scope.msg = 'Please check mail to verify your email ID, and then login here';
                        scope.returningUser = true;
                        scope.newUser = false;
                        scope.loginObj.password = null;
                    },function(){
                        scope.msg = 'Registeration failed';
                    });
                }
                scope.login = function() {
                    var postData = {
                        email: scope.loginObj.email,
                        password: scope.loginObj.password
                    }
                    userFactory.loginUser(postData).then(function(){
                        scope.model.success(scope.loginObj.email);
                    },function(data){
                        scope.msg = data.message;
                    });
                }
                scope.skip = function() {
                    scope.model.skip(scope.loginObj.email);
                }
                if(scope.model.email){
                    scope.loginObj.email = scope.model.email;
                    scope.checkUser();
                }
                if ($location.search().email) {
                    scope.loginObj.email = $location.search().email;
                    scope.returningUser = true;
                    scope.msg = $location.search().message;
                }
            }
        }

    });

    app.directive('loader', function() {
        return {
            restrict: 'A',
            template: '<div class="modal bgloading" ng-show="loadingView">\
                        <div class="spinner">\
                          <div class="dot1"></div>\
                          <div class="dot2"></div>\
                        </div>\
                      </div>',
            scope: {},
            link: function(scope, element, attrs) {
                scope.$on('loaderChange',function(evt, newVal, oldVal){
                    if(newVal === oldVal)
                        return;
                    if(newVal) scope.loadingView = true;
                    else scope.loadingView = false;
                });
            }
        }

    });


})();
