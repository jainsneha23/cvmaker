(function() {
    'use strict';

    var app = angular.module('cvbuilder');

    app.controller('loginController', ['$scope', '$location', '$http', 'userFactory',function($scope, $location, $http, userFactory) {

        $scope.loginObj = {};

        if ($location.search().email) {
            $scope.loginObj.email = $location.search().email;
            $scope.returningUser = true;
            $scope.msg = $location.search().message;
        }

        userFactory.checkLogin($scope).then(function(data){
                $scope.loggedInUser = true;
            $scope.loginObj.email = data;
              },function(err){
                console.log(err);
              });

        $scope.logout = function() {
            $scope.loadingView = true;
            $http.post('../phpservice/logout.php').
            success(function(data, status, headers, config) {
                $scope.loadingView = false;
                if (data.status == 'Success') {
                    window.location = 'index.html';
                } else {}
            }).
            error(function(data, status, headers, config) {
                $scope.loadingView = false;
            });
        }

        $scope.checkUser = function() {
            var postData = {
                email: $scope.loginObj.email
            }
            $scope.returningUser = false;
            $scope.newUser = false;

            $scope.loadingView = true;
            $http.post('../phpservice/checkUser.php', postData).
            success(function(data, status, headers, config) {
                $scope.loadingView = false;
                if (data.status == 'Success') {
                    $scope.returningUser = true;
                } else {
                    $scope.newUser = true;
                }
            }).
            error(function(data, status, headers, config) {
                $scope.loadingView = false;
                $scope.newUser = true;
            });

        }
        $scope.register = function() {
        	if($scope.loginObj.password != $scope.loginObj.cnfpassword){
        		$scope.msg = 'Password donot match';
        		return;
        	}
            var postData = {
                email: $scope.loginObj.email,
                password: $scope.loginObj.password
            }
            $scope.loadingView = true;
            $http.post('../phpservice/register.php', postData).
            success(function(data, status, headers, config) {
                $scope.loadingView = false;
                if (data.status == 'Success') {
                    $scope.msg = 'Please check mail to verify your email ID, and then login here';
                    $scope.returningUser = true;
                    $scope.newUser = false;
                    $scope.loginObj.password = null;
                } else {
                    $scope.msg = 'Registeration failed';
                }
            }).
            error(function(data, status, headers, config) {
                $scope.loadingView = false;
                $scope.msg = 'Registeration failed';
            });

        }
        $scope.login = function() {
            var postData = {
                email: $scope.loginObj.email,
                password: $scope.loginObj.password
            }
            $http.post('../phpservice/login.php', postData).
            success(function(data, status, headers, config) {
                if (data.status == 'Success') {
                    navigate();
                } else {
                    $scope.msg = data.message;
                }
            }).
            error(function(data, status, headers, config) {
                $scope.msg = 'Login failed';
            });

        }
        var navigate = function() {
            location.href = 'cvmaker.html#/design/' + $scope.loginObj.email;
        }
        $scope.skip = function() {
            navigate();
        }

    }]);

})();
