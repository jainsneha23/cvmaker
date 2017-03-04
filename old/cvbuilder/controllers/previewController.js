(function() {
    var app = angular.module('cvbuilder');
    app.controller('previewCtrl', function($scope, $rootScope, $modal, $state, initialData) {
    if(!initialData) return;
    $rootScope.modules = initialData;
    $rootScope.email = $state.params.email;
    CVM.setModel($rootScope,initialData);

    $scope.openPopup = function(module, type) {

      if(type == 'portfolio'){
        var templateUrl = 'summaryPopup.html';
        var controller = 'summaryPopupCtrl';
        var title = 'Profile Summary';
        var placeholder1 = 'Summary Title';
        var placeholder2 = 'Write Summary/Goals/Objective/Content here';

      }else if(type == 'others'){
        var templateUrl = 'summaryPopup.html';
        var controller = 'summaryPopupCtrl';
        var title = 'Other Information';
        var placeholder1 = 'Title';
        var placeholder2 = 'Add certifications/achievements/personal information here';

      }else if(type == 'workexp'){
        var templateUrl = 'workExpPopup.html';
        var controller = 'workExpPopupCtrl';
        var skills = $scope.model.skill;
      
      }else if(type == 'education'){
        var templateUrl = 'educationPopup.html';
        var controller = 'educationPopupCtrl';
      }


      var modalInstance = $modal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: controller,
        size: 'lg',
        windowClass: '',
        backdrop:'static',
        resolve: {
            data: function() {
                return {
                    obj: module,
                    title: title,
                    placeholder1: placeholder1,
                    placeholder2: placeholder2,
                    skills : skills
                }
            }
        }
    });

    modalInstance.result.then(function(obj) {
        Object.keys(module).forEach(function(key){
          module[key] = obj[key];
        });
      }, function() {});
    }

    $scope.openModulePopup = function(module, type) {

      var templateUrl = type == 'personal' ? 'personalPopup.html' : 'skillPopup.html';

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: 'modulePopupCtrl',
        size: 'lg',
        windowClass: '',
        backdrop:'static',
        resolve: {
            data: function() {
                return {
                    obj: module
                }
            }
        }
    });

    modalInstance.result.then(function(obj) {
        Object.keys(module).forEach(function(key){
          module[key] = obj[key];
        });
      }, function() {});
    }

  });
})();