$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    $('nav a').removeClass('active');
	    $(this).addClass('active');

	    var target = this.hash;
	    var $target = $(target);
	    var location;

	    if(!$target.length)
	    	location = 0;
	    else location = $target.offset().top;
	    	

	    $('html, body').stop().animate({
	        'scrollTop': location
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	$(window).scroll(function() {
		var bottom = $('.bigImage')[0].getBoundingClientRect().bottom;
		if (bottom < 50){  
		    $('body > header').addClass("sticky");
		}
		else{
		    $('body > header').removeClass("sticky");
		}
	});
});

(function () {
    'use strict';

    var app = angular.module('cvbuilder', []);

    app.config(['$locationProvider',function ($locationProvider) {
    	$locationProvider.html5Mode(true);
    }]);

	app.controller('homeCtrl', ['$scope','$http',function($scope,$http) {

		var navigate = function(email) {
    	    location.href = 'cvmaker.html#/design/' + email;
		}

		$scope.obj = {
            email : $scope.email,
            success: navigate,
            skip : navigate
        }

		$scope.submitForm = function(argument) {
			var postData = {
				username: $scope.username,
				email: $scope.email,
				message: $scope.message
			}
			$http.post('../phpservice/feedback.php',postData).
			  success(function(data, status, headers, config) {
			  	if(data.status == 'Success'){
					$scope.username = '';
					$scope.email = '';
					$scope.message = '';
					alert('Thanks for writing to Us.');
			  	}else alert('Error Occured.');
			  }).
			  error(function(data, status, headers, config) {
				alert('Error Occured.');
			  });
		}

  	}]);

})();


