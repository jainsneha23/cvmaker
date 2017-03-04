(function() {
    'use strict';

    var app = angular.module('cvbuilder');

    

    CVM.setModel = function(scope, initialData) {
        scope.model = {};
        scope.model.personal = CVM.getObj(initialData, 'Personal Details');
        scope.model.portfolio = CVM.getObj(initialData, 'Profile Summary');
        scope.model.skill = CVM.getObj(initialData, 'Skills');
        scope.model.workexp = CVM.getObj(initialData, 'Work Experience');
        scope.model.education = CVM.getObj(initialData, 'Education');
        scope.model.others = CVM.getObj(initialData, 'Others');
    }

    CVM.getObj = function(model, name) {
        return model.filter(function(key) {
            return key.name == name;
        })[0];
    }

    app.controller('appCtrl', function($scope, $rootScope, $modal, $state, $window, $http, cvFactory, userFactory, initialData, loginInfo) {

        var oldCSSFile;

        $rootScope.selectedDesign = $state.params.id || 1;

        if (loginInfo) {
            $rootScope.loggedInUser = true;
            $rootScope.email = loginInfo;
        } else $rootScope.email = $state.params.email;

        $rootScope.logout = function() {
            userFactory.logout().then(function() {
                    window.location = 'index.html';
                },
                function(err) {
                    console.log(err);
                });
        }

        $rootScope.showLogin = function() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'loginPopup.html',
                controller: 'loginCtrl',
                size: 'md',
                windowClass: 'loginModal',
                resolve: {
                  email : $rootScope.email
                }
            });
            modalInstance.result.then(function(email) {
                $rootScope.loggedInUser = true;
                $rootScope.email = email;
                
            }, function() {});
        }

        $scope.download = function(designId) {

            var callDownload = function() {
                $rootScope.loadingView = true;
                $http({
                    url: '../phpservice/download.php',
                    method: 'POST',
                    responseType: 'arraybuffer',
                    data: postData,
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/pdf'
                    }
                }).
                success(function(data, status, headers, config) {
                    $rootScope.loadingView = false;
                    var blob = new Blob([data], {
                        type: 'application/pdf'
                    });
                    saveAs(blob, 'resume.pdf');
                }).
                error(function(data, status, headers, config) {
                    $rootScope.loadingView = false;
                });
            }
            var url = window.location.origin + window.location.pathname + $state.href('download', {
                email: $rootScope.email+''+($rootScope.timestamp || ''),
                id: $scope.selectedDesign
            });
            var postData = {
                'url': url
            };
            if(!$rootScope.timestamp && $rootScope.loggedInUser){
                cvFactory.storeData($scope.modules).then(function(data) {
                    callDownload();
                });
            }else if($rootScope.timestamp){
                postData.timestamp = $rootScope.timestamp;
                callDownload();
            }
        }

        $scope.navigate = function(str) {
            switch (str) {
                case 'resume':
                    $state.go('resume', {
                        email: $scope.email,
                        id: $scope.selectedDesign
                    });
                    break;
                case 'preview':
                    if(!$rootScope.loggedInUser)
                        $rootScope.timestamp = new Date().getTime();
                    else delete $rootScope.timestamp;
                    cvFactory.storeData($scope.modules, $rootScope.timestamp).then(function(data) {
                        $state.go('preview', {
                            email: $rootScope.email,
                            id: $rootScope.selectedDesign
                        });
                    });
                    break;
                default:
                    $state.go('/');
                    break;
            }
        };

        $scope.$on('$stateChangeStart', function() {
            $rootScope.loadingView = true;
        });

        $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.loadingView = false;
            var page = toState.name;
            switch (page) {
                case 'resume':
                    $rootScope.currentPage = 'resumeView';
                    break;
                case 'preview':
                    $rootScope.currentPage = 'previewView';
                    break;
                case 'download':
                    $rootScope.currentPage = 'downloadView';
                    break;
                default:
                    $rootScope.currentPage = 'resumeView';
                    break;
            }
            if ('ontouchstart' in window)
                $rootScope.currentPage += ' touch';
        });

        $scope.selectDesign = function() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'cvbuilder/views/selectdesign.html',
                controller: 'designModalCtrl',
                size: 'lg',
                windowClass: 'designModal',
                backdrop: 'static',
                resolve: {
                    data: function() {
                        return {
                            selectedDesign: $rootScope.selectedDesign
                        }
                    }
                }
            });

            modalInstance.result.then(function(selectedDesign) {
                $rootScope.selectedDesign = selectedDesign;
                $scope.navigate('preview');
            }, function() {});
        }
    });

    app.controller('loginCtrl', function($scope, $modalInstance, $state) {

        $scope.email = $state.params.email;

        $scope.ok = function(email) {
            $modalInstance.close(email);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.obj = {
            email : $scope.email,
            success: $scope.ok,
            skip : $scope.cancel
        }

    });

    app.controller('designCtrl', function($scope, $rootScope, $state) {

        $scope.model = {};
        $scope.model.height = 125;
        $scope.model.selectedDesign = 0;

        $scope.model.hideCancel = true;
        $scope.model.okBtnText = 'Next';

        $scope.model.ok = function() {
            $rootScope.selectedDesign = $scope.model.selectedDesign;
            $state.go('resume', {
                email: $state.params.email,
                id: $scope.model.selectedDesign
            });
        }
    });

    app.controller('cvbuilderCtrl', function($scope, $rootScope, $state, initialData) {
        $rootScope.modules = initialData;
        $rootScope.selectedDesign = $state.params.id;
        CVM.setModel($rootScope, initialData);

        $scope.prev = function(index) {
            var key = Object.keys($scope.model);
            if (index == 0)
                return;
            $scope.model[key[index]].visited = false;
            $scope.model[key[index]].active = false;
            $scope.model[key[index - 1]].active = true;
        }

        $scope.next = function(index) {
            var key = Object.keys($scope.model);
            if (index == key.length)
                return;
            $scope.model[key[index]].visited = true;
            $scope.model[key[index]].active = false;
            $scope.model[key[index + 1]].active = true;
        }
    });

    app.controller('downloadCtrl', function($scope, $rootScope, initialData) {
        if (!initialData) {
            $rootScope.errorView = true;
            $rootScope.errorMsg = 'OOPS!! Something went wrong. Please try downloading again.';
            return;
        }
        $rootScope.modules = initialData;
        CVM.setModel($rootScope, initialData);
    });

})();
