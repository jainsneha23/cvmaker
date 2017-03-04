(function(){

  var app = angular.module('cvbuilder');

  app.directive('personal', function($modal) {
    return {
      templateUrl : 'cvbuilder/views/personaldetails.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {
        scope.model.form = scope.personalForm;
        scope.autoComp = {
          location: CVM.Config.autoComplete.location
        }
        scope.size = {'height':200,'width':150};
        scope.openImageChooser = function() {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'imageChooserPopup.html',
            controller: 'imageChooserController',
            size: 'lg',
            windowClass: '',
            backdrop:'static',
            resolve: {
              obj: function() {
                return {
                  model: scope.model.fields.image,
                  size: scope.size
                }
              }
            }
          });

          modalInstance.result.then(function(obj) {
            scope.model.fields.Image = obj;
          }, function() {});

        }
      }
    }
  });

  app.directive('droppable', function($compile) {
    return {
      scope:{model:"=ngModel"},
      restrict: 'A',
      link: function(scope,element,attrs){
        //This makes an element Droppable
        element.droppable({
          hoverClass: 'expand',
          tolerance:'touch',
          over:function(event,ui){
              ui.helper.addClass('red');
          },
          out:function(event,ui){
              ui.helper.removeClass('red');
          },
          drop:function(event,ui) {
            var dragIndex = angular.element(ui.draggable).data('index');
            scope.model.splice(dragIndex, 1);
            $(ui.helper).fadeOut(0);
            scope.showDelete = false;
          }
        });
      }
    };
  }); 

  app.directive('portfolio', function($modal) {
    return {
      templateUrl : 'cvbuilder/views/portfolio.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {
        
        scope.deletedItems = [];
        scope.showDelete = false;
        
        scope.add = function(obj) {
          scope.model.modules.splice(0,0,obj);
        }

        scope.sortableOptions = {
          revert : 100,
          helper : 'clone',
          connectWith:'.deletebox',
          tolerance: 'pointer',
          placeholder:'placeholder',
          snap:true,
          start: function(e, ui) {
            scope.showDelete = true;
            scope.$apply();
          },
          stop: function(e, ui) {
            scope.showDelete = false;
            scope.$apply();
            e.stopPropagation();
          }
        };

        scope.openPopup = function(index) {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'summaryPopup.html',
            controller: 'summaryPopupCtrl',
            size: 'lg',
            windowClass: '',
            backdrop:'static',
            resolve: {
              data: function () {
                return {
                  obj : index != null? scope.model.modules[index] : null,
                  title:'Profile Summary',
                  placeholder1:'Summary Title',
                  placeholder2:'Write Summary/Goals/Objective/Content here'
                }
              }
            }
          });

          modalInstance.result.then(function (obj) {
            if(index != null)
              scope.model.modules[index] = obj;
            else scope.add(obj);
          }, function () {});
        }
      }
    }
  });

  app.directive('skill', function() {
    return {
      templateUrl : 'cvbuilder/views/skill.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {
        scope.newSkill = "";
        scope.model.fields = scope.model.fields || [];

        scope.addSkill = function(evt){
          if(!scope.newSkill || (evt && evt.type == "keyup" && evt.which != 13))
            return;
          scope.model.fields.push({
            name: scope.newSkill,
            level: 3
          });
          scope.newSkill = "";
          scope.length = scope.model.fields.length;
        };
        scope.delete = function(index) {
          scope.model.fields.splice(index,1);
          scope.length = scope.model.fields.length;
        };

        scope.sortableOptions = {
          revert : 100,
          helper : 'clone',
          connectWith:'section[skill] .deletebox',
          tolerance: 'pointer',
          placeholder:'placeholder',
          snap:true,
          start: function(e, ui) {
            scope.showDelete = true;
            scope.$apply();
          },
          stop: function(e, ui) {
            scope.showDelete = false;
            scope.$apply();
            e.stopPropagation();
          }
        };
      }
    }
  });

  app.directive('workexp', function($modal) {
    return {
      templateUrl : 'cvbuilder/views/workexp.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {

        scope.model.skills = scope.$parent.model.skill;

        scope.deletedItems = [];
        scope.showDelete = false;
        
        scope.add = function(obj) {
          scope.model.modules.splice(0,0,obj);
        }

        scope.sortableOptions = {
          revert : 100,
          helper : 'clone',
          connectWith:'.deletebox',
          tolerance: 'pointer',
          placeholder:'placeholder',
          snap:true,
          start: function(e, ui) {
            scope.showDelete = true;
            scope.$apply();
          },
          stop: function(e, ui) {
            scope.showDelete = false;
            scope.$apply();
            e.stopPropagation();
          }
        };

        scope.openPopup = function(index) {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'workExpPopup.html',
            controller: 'workExpPopupCtrl',
            size: 'lg',
            windowClass: '',
            backdrop:'static',
            resolve: {
              data: function () {
                return {
                  obj : index != null? scope.model.modules[index] : null,
                  skills: scope.model.skills
                }
              }
            }
          });

          modalInstance.result.then(function (obj) {
            if(index != null)
              scope.model.modules[index] = obj;
            else scope.add(obj);
          }, function () {});
        }
      }
    }
  });

  app.directive('education', function($modal) {
    return {
      templateUrl : 'cvbuilder/views/education.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {

        scope.deletedItems = [];
        scope.showDelete = false;
        
        scope.add = function(obj) {
          scope.model.modules.splice(0,0,obj);
        }

        scope.sortableOptions = {
          revert : 100,
          helper : 'clone',
          connectWith:'.deletebox',
          tolerance: 'pointer',
          placeholder:'placeholder',
          snap:true,
          start: function(e, ui) {
            scope.showDelete = true;
            scope.$apply();
          },
          stop: function(e, ui) {
            scope.showDelete = false;
            scope.$apply();
            e.stopPropagation();
          }
        };

        scope.openPopup = function(index) {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'educationPopup.html',
            controller: 'educationPopupCtrl',
            size: 'lg',
            windowClass: '',
            backdrop:'static',
            resolve: {
              data: function () {
                return {
                  obj : index != null? scope.model.modules[index] : null
                }
              }
            }
          });

          modalInstance.result.then(function (obj) {
            if(index != null)
              scope.model.modules[index] = obj;
            else scope.add(obj);
          }, function () {});
        }
      }
    }
  });

  app.directive('others', function($modal) {
    return {
      templateUrl : 'cvbuilder/views/others.html',
      scope: {
        model: '=ngModel'
      },
      link: function(scope, $elem, attrs) {
        
        scope.deletedItems = [];
        scope.showDelete = false;
        
        scope.add = function(obj) {
          scope.model.modules.splice(0,0,obj);
        }

        scope.sortableOptions = {
          revert : 100,
          helper : 'clone',
          connectWith:'.deletebox',
          tolerance: 'pointer',
          placeholder:'placeholder',
          snap:true,
          start: function(e, ui) {
            scope.showDelete = true;
            scope.$apply();
          },
          stop: function(e, ui) {
            scope.showDelete = false;
            scope.$apply();
            e.stopPropagation();
          }
        };

        scope.openPopup = function(index) {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'summaryPopup.html',
            controller: 'summaryPopupCtrl',
            size: 'lg',
            windowClass: '',
            backdrop:'static',
            resolve: {
              data: function () {
                return {
                  obj : index != null? scope.model.modules[index] : null,
                  title:'Other Information',
                  placeholder1:'Title',
                  placeholder2:'Add certifications/achievements/personal information here'
                }
              }
            }
          });

          modalInstance.result.then(function (obj) {
            if(index != null)
              scope.model.modules[index] = obj;
            else scope.add(obj);
          }, function () {});
        }
      }
    }
  });

})();