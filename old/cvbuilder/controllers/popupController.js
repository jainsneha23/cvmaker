(function() {

    var app = angular.module('cvbuilder');

    app.controller('modulePopupCtrl', function($scope, $modalInstance, data) {

        $scope.module = angular.copy(data.obj);
        
        $scope.ok = function() {
            $modalInstance.close($scope.module);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });

    app.controller('summaryPopupCtrl', function($scope, $modalInstance, data) {

        $scope.buttonName = "Add";

        $scope.data = data;

        if (data.obj) {
            $scope.field = data.obj.field;
            $scope.value = data.obj.value;
            $scope.buttonName = "Save";
        }

        $scope.ok = function() {
            if (!$scope.field || !$scope.value)
                return;
            var obj = {
                field: $scope.field,
                value: $scope.value
            }
            $modalInstance.close(obj);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });

    app.controller('workExpPopupCtrl', function($scope, $modalInstance, data) {

        $scope.buttonName = "Add";

        $scope.data = data;

        $scope.skills = data.skills;

        $scope.form = {};

        if (data.obj) {
            $scope.obj = angular.copy(data.obj);
            $scope.skillLength = $scope.obj.fields.Skills_and_Tools_Used.length;
            $scope.buttonName = "Save";
        } else {
            $scope.obj = {
                "fields": {
                    "Job_Title": {
                        "value": ""
                    },
                    "Company_Name": {
                        "value": ""
                    },
                    "Start_Date": {
                        "value": ""
                    },
                    "End_Date": {
                        "value": ""
                    },
                    "Role_and_Responsibilities": {
                        "value": ""
                    },
                    "Skills_and_Tools_Used": []
                }
            };
        }

        $scope.skillChange = function(module, skill, checkbox) {
            if (checkbox)
                module.fields.Skills_and_Tools_Used.push(skill);
            else {
                var index = module.fields.Skills_and_Tools_Used.indexOf(skill);
                module.fields.Skills_and_Tools_Used.splice(index, 1);
            }
            module.skillLength = module.fields.Skills_and_Tools_Used.length;
        }

        $scope.skillSelected = function(module, field) {

            if (!module) return false;

            var res = module.fields.Skills_and_Tools_Used.filter(function(val) {
                return val.name == field.name;
            });
            return res.length ? true : false;
        }

        $scope.ok = function() {
            if ($scope.form.workExpForm.$invalid)
                return;
            delete $scope.obj.skillLength;
            $modalInstance.close($scope.obj);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });

    app.controller('educationPopupCtrl', function($scope, $modalInstance, data) {

        $scope.buttonName = "Add";

        $scope.data = data;

        $scope.skills = data.skills;

        $scope.form = {};

        if (data.obj) {
            $scope.obj = angular.copy(data.obj);
            $scope.buttonName = "Save";
        } else {
            $scope.obj = {
                "fields": {}
            };
        }

        $scope.ok = function() {
            if ($scope.form.educationForm.$invalid)
                return;
            $modalInstance.close($scope.obj);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });

    app.controller('imageChooserController', function($scope, $modalInstance, obj) {

      $scope.size = obj.size;
      $scope.model = obj.model;

      $scope.ok = function() {
        $modalInstance.close($scope.model);
      };
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    });

    app.controller('designModalCtrl', function($scope, $modalInstance, data) {

      $scope.model = {};
      $scope.model.height = 65;
      $scope.model.selectedDesign = data.selectedDesign || 0;
      $scope.model.okBtnText = 'Ok';

      $scope.model.ok = function() {
        $modalInstance.close($scope.model.selectedDesign);
      };

      $scope.model.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
  });

})();
