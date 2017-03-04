(function() {
  "use strict";

  var app = angular.module('cvbuilder');

  /*app.directive('sjValidator', function() {
        return {
          require: 'ngModel',
          link: function(scope, $elem, attrs, ctrl) {

            function patternValidator(ngModelValue) {
                if(pattern.test(ngModelValue)){
                    ctrl.$setValidity('patternValidator', true);
                }else{
                    ctrl.$setValidity('patternValidator', false);
                }
                return ngModelValue;
            }

            if(attrs.pattern){
              var pattern = new RegExp(attrs.pattern);
              ctrl.$parsers.push(patternValidator);
            }
          }
        };
    });*/

  app.directive('appFilereader', function($q) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return;

      ngModel.$render = function() {};

      element.on('dragover dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.addClass('over');
      });

      element.on('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.removeClass('over');
      });

      element.on('drop', function(e) {
        if (e.originalEvent.dataTransfer) {
          if (e.originalEvent.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            handleFiles(e.originalEvent.dataTransfer.files);
            element.removeClass('over');
          }
        }
      });

      var targetInput = element.is('div') && element.find('input').length ? element.find('input') : element;

      targetInput.on('change', function(e) {
        var element = e.target;
        targetInput.disabled = true;
        handleFiles(element.files);
      });

      function handleFiles(files) {
        $q.all(Array.prototype.slice.call(files, 0).map(readFile))
          .then(function(values) {
            scope.loading = false;
            if (element.multiple) ngModel.$setViewValue(values);
            else ngModel.$setViewValue(values[0]);
            targetInput.value = null;
            targetInput.disabled = false;
          });
      }

      function readFile(file) {
        scope.loading = true;
        var deferred = $q.defer();

        var reader = new FileReader()
        reader.onload = function(e) {
          deferred.resolve(e.target.result);
        }
        reader.onerror = function(e) {
          deferred.reject(e);
        }
        reader.readAsDataURL(file);

        return deferred.promise;
      }
    }
  };
});

  app.directive('ckEditor', function($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, $elem, attrs, ngModel) {

        if (!ngModel) return;

        var editor;

        ngModel.$render = function() {

          $elem.attr('id', $elem.attr('id') + '_' + scope.$id);

          editor = CKEDITOR.inline($elem.attr('id'));

          editor.on('instanceReady', function(ev) {
            ev.editor.setReadOnly(false);
            editor.setData(ngModel.$viewValue);
            $elem.addClass('empty');
          });

          editor.on('change', function() {
            scope.$evalAsync(function() {
              ngModel.$setViewValue(editor.getData());
              if (editor.getData().trim().length)
                $elem.removeClass('empty');
              else $elem.addClass('empty');
            });
          });
        }

        scope.$on('$destroy', function() {
          if (editor.status != 'destroyed')
            editor.destroy();
        });
      }
    };
  });

  app.directive('barRating', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      template: '<ul class="bar" ng-mouseleave="reset()"><li ng-repeat="rate in rating" ng-click="select(rate.value,true)" ng-mouseover="select(rate.value,false)"><i class="fa fa-star-o" ng-hide="rate.active"></i><i class="fa fa-star" ng-show="rate.active"></i></li></ul>',
      link: function(scope, $elem, attrs, ngModel) {

        if (!ngModel) return;

        var oldVal;

        scope.rating = [{
          name: 'Basic',
          value: 1
        }, {
          name: 'Working',
          value: 2
        }, {
          name: 'Intermediate',
          value: 3
        }, {
          name: 'Advanced',
          value: 4
        }, {
          name: 'Expert',
          value: 5
        }];

        scope.reset = function() {
          scope.select(oldVal, true);
        }

        scope.select = function(val, isClick) {

          if (attrs.disabled == true)
            return;

          if (isClick) {
            oldVal = val;
            ngModel.$setViewValue(val);
          }

          scope.rating.map(function(rate, i) {
            rate.active = val >= rate.value ? true : false;
          });
        }

        ngModel.$render = function() {
          scope.select(+ngModel.$viewValue, true);
        }

      }
    }
  });



  app.directive('fixHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var setSize = function() {
          var height = window.innerHeight - attrs.fixHeight;
          element.css('height', height);
        }

        setSize();

        $(window).on('resize', setSize);
      }
    }
  });

  app.directive('minHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var setSize = function() {
          var height = window.innerHeight - attrs.minHeight;
          element.css('min-height', height);
        }

        setSize();

        $(window).on('resize', setSize);
      }
    }
  });

  app.directive('niceScroll', function() {
    return {
      restrict: 'A',
      link: function(scope, $elm, attr) {

        var niceScrollObj;

        $elm.css("overflow", "hidden");

        var defaultSetting = {
          touchbehavior: false,
          cursorcolor: '#40A7BA',
          cursorborder: '0px',
          cursorborderradius: 5,
          cursoropacitymax: 1,
          cursorwidth: 6,
          hidecursordelay: 1000,
          autohidemode: true,
          hwacceleration: true,
          bouncescroll: true,
          horizrailenabled: false,
          enablemousewheel: true
        };
        //initializeNiceScroll();
        function initializeNiceScroll() {
          if (attr.niceScroll) {
            var options = scope.$eval(attr.niceScroll);
            if (options) {
              angular.extend(defaultSetting, options);
            }
            niceScrollObj = $elm.niceScroll(defaultSetting);
          } else {
            niceScrollObj = $elm.niceScroll(defaultSetting);
          }
        };

        function setLock(val) {
          if (niceScrollObj && Object.keys(niceScrollObj).length > 0)
            niceScrollObj.locked = val;
          else initializeNiceScroll();
        }

        if ('onorientationchange' in window) {
          $elm.on('touchstart', function(e) {
            var target = $(e.target).parents('[nice-scroll]')[0];
            var $target = $(target);
            if ($target)
              var $parent = $target.parents('[nice-scroll]');
            if ($target && $parent.length > 0) {
              $parent.getNiceScroll()[0].locked = true;
            } else {
              setLock(false);
              if ($parent.length > 0)
                $parent.getNiceScroll()[0].locked = false;
            }
          });
          $elm.on("touchstart", function() {
            if (niceScrollObj && niceScrollObj.resize)
              niceScrollObj.resize();
            else
              initializeNiceScroll();
          });
        } else {
          $elm.on("mousemove", function() {
            if (niceScrollObj && niceScrollObj.resize)
              niceScrollObj.resize();
            else initializeNiceScroll();
          });

          $elm.on("mousedown", function(e) {
            e.stopImmediatePropagation();
          });
        }
        scope.$on('$destroy', function() {
          if (niceScrollObj && niceScrollObj.remove)
            niceScrollObj.remove();
        });
        $elm.on('destroy', function() {
          if (niceScrollObj && niceScrollObj.remove)
            niceScrollObj.remove();
        });
      }
    }
  });

  app.directive('dynamicDirective', function($compile) {
    var arr = ['personal', 'portfolio', 'skill', 'workexp', 'education', 'others'];
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var index = scope.$eval(attrs.index);
        element.html($compile('<section ' + arr[index] + ' fix-height = "195" nice-scroll ng-model="module" class="' + arr[index] + '"></section>')(scope));
      }
    };
  });

  app.directive('resizable', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        size: '=resizable',
        updateMask: '='
      },
      link: function(scope, element, attrs) {

        element.resizable({
          containment: '.cropWindow',
          aspectRatio: 3 / 4,
          minHeight: 80,
          minWidth: 60,
          handles: {
            'ne': '#negrip',
            'se': '#segrip',
            'sw': '#swgrip',
            'nw': '#nwgrip'
          },
          resize: function(evt, ui) {
            scope.updateMask(ui.element);
            scope.$apply();
          },
          stop: function(evt, ui) {
            scope.updateMask(ui.element, true);
            scope.$apply();
          }
        });
        element.draggable({
          containment: '.cropWindow',
          drag: function(evt, ui) {
            scope.updateMask(ui.helper);
            scope.$apply();
          },
          stop: function(evt, ui) {
            scope.updateMask(ui.helper, true);
            scope.$apply();
          }
        });
      }
    };
  });

  app.directive('imageChooser', function($timeout, $q) {
      return {
        require: 'ngModel',
        restrict: 'A',
        templateUrl:'cvbuilder/views/imageChooser.html',
        scope: {
          model: '=ngModel',
          size: '=imageChooser'
        },
        link: function(scope, element, attrs) {
          scope.newImageUrl = '';

          var maskElm = element.find('.mask'),
            imageWindow = element.find('.cropWindow'),
            image = element.find('.imageEdit img'),
            cropElm = element.find('.croppable');

          scope.$watch('newImageUrl', function(newval, oldval) {
            if (newval == oldval) return;
            $timeout(function() {
              cropElm.width(Math.min(scope.size.width,image.width()));
              cropElm.height(Math.min(scope.size.height,image.height()));
              imageWindow.width(image.width());
              imageWindow.height(image.height());
              scope.updateMask(cropElm);
              saveImage();
            });
          });

          scope.updateMask = function(element,save) {
            var position = element.position();
            var right = imageWindow.width() - position.left - element.width();
            var bottom = imageWindow.height() - position.top - element.height();
            maskElm.css('border-width', position.top + 'px ' + right + 'px ' + bottom + 'px ' + position.left + 'px');
            if(save)
              saveImage();
          }

          var saveImage = function() {
            var canvas, ctx, neededHeight, neededWidth;
            var original = {h:image[0].naturalHeight,w:image[0].naturalWidth};
            var displayed = {h:image.height(),w:image.width()};
            var cropped = {h:cropElm.height(),w:cropElm.width()};
            var ratio = {h: original.h/displayed.h, w : original.w/displayed.w};

            var needed = {h:cropped.h * ratio.h, w: cropped.w * ratio.w};

            var cropPosition = cropElm.position();

            var neededPosition = {top:cropPosition.top*ratio.h,left:cropPosition.left*ratio.w}
            
            var dummyImage = document.createElement('img');
            dummyImage.src = image[0].src;
            canvas = document.createElement("canvas");
            canvas.width = needed.w;
            canvas.height = needed.h;
            ctx = canvas.getContext("2d");
            ctx.drawImage(dummyImage,neededPosition.left,neededPosition.top,needed.w,needed.h ,0,0, needed.w, needed.h);
            scope.model = canvas.toDataURL("image/jpeg");
          }
      }
    };
  });

  app.directive("ngPrint", [

    function() {
      var printSection = document.getElementById('printSection');
      // if there is no printing section, create one
      if (!printSection) {
        printSection = document.createElement('div');
        printSection.id = 'printSection';
        document.body.appendChild(printSection);
      }

      function link(scope, element, attrs) {
        element.on('click', function() {
          var elemToPrint = document.getElementById(attrs.printElementId);
          if (elemToPrint) {
            printElement(elemToPrint);
          }
        });
      }

      function printElement(elem) {
        // clones the element you want to print
        var domClone = elem.cloneNode(true);
        printSection.innerHTML = '';
        printSection.appendChild(domClone);
        window.print();
        printSection.innerHTML = '';
      }
      return {
        link: link,
        restrict: 'A'
      };
    }
  ]);

  app.directive('ngAutocomplete', function($parse) {
    return {
      scope: {
        details: '=',
        ngAutocomplete: '=',
        options: '='
      },

      link: function(scope, element, attrs, model) {

        var opts;

        var initOpts = function() {
          opts = {}
          if (scope.options) {
            if (scope.options.types) {
              opts.types = []
              opts.types.push(scope.options.types)
            }
            if (scope.options.bounds) {
              opts.bounds = scope.options.bounds
            }
            if (scope.options.country) {
              opts.componentRestrictions = {
                country: scope.options.country
              }
            }
          }
        }
        initOpts()

        var newAutocomplete = function() {
          try {
            scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
              scope.$apply(function() {
                scope.details = scope.gPlace.getPlace();
                scope.ngAutocomplete = element.val();
              });
            });
          } catch (e) {}
        }

        //watch options provided to directive
        scope.watchOptions = function() {
          return scope.options
        };
        scope.$watch(scope.watchOptions, function() {
          initOpts();
          newAutocomplete();
        }, true);
      }
    };
  });

  app.directive('toggleSwitch', function($templateCache) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        switch: '=ngModel'
      },
      templateUrl: 'toggleSwitch.html',
      link: function(scope, $elem, attrs, ngModel) {
        if (!ngModel) return;
        scope.label = {
          true: 'ON',
          false: 'OFF'
        };
      }
    }
  });

  app.directive('photoGallery', function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        model: '=model'
      },
      templateUrl: 'cvbuilder/views/designSelector.html',
      link: function(scope, $elem, attrs, ngModel) {

        var zoomFactor = 1;

        scope.model.images = CVM.Config.designIds.map(function(obj) {
          return {
            url: CVM.Config.designPath + '/' + CVM.Config.designFilename + obj.val + ".jpg",
            thumbnail: CVM.Config.designPath + '/' + CVM.Config.designFilename + obj.val + "_thumb.jpg",
            id: obj.val,
            caption: obj.text,
            name: 'Design ' + obj.val
          }
        });

        var images = scope.model.images;

        scope.open = function(image) {
          scope.previewMode = true;
          scope.previewImage = image;
          var index = image.id - 1;
          images.map(function(img) {
            img.style = 'z-index:-1';
            return img;
          });
          image.style = 'left:0;right:0;z-index:3';
          images[index == 0 ? images.length - 1 : index - 1].style = 'left:-100%;z-index:1';
          images[(index + 1) % images.length].style = 'left:100%;z-index:1';
        }

        scope.close = function(argument) {
          images.map(function(img) {
            delete img.style;
            delete img.zoom;
            return img;
          });
          scope.previewMode = false;
        }

        scope.select = function(image) {
          scope.model.selectedDesign = image.id;
        }

        scope.nav = function(dir) {
          var index = scope.previewImage.id - 1;

          if (dir == 'right') {
            scope.previewImage = images[(index + 1) % images.length];
            images[index].style = 'left:-100%;z-index:2';
            images[(index + 2) % images.length].style = 'left:100%;z-index:1';
          } else {
            scope.previewImage = images[index - 1 < 0 ? images.length + index - 1 : index - 1];
            images[index].style = 'left:100%;z-index:2';
            images[index - 2 < 0 ? images.length + index - 2 : index - 2].style = 'left:-100%;z-index:1';
          }
          zoomFactor = 1;
          images[index].zoom = 'transform: scale(1);cursor:normal';
          scope.previewImage.style = 'left:0;right:0;z-index:3';
        }

        scope.zoom = function(arg) {

          if (!arg) {
            zoomFactor = 1;
            scope.previewImage.zoom = 'transform: scale(1);cursor:normal';
          } else if (arg == 'in') {
            zoomFactor = Math.min(zoomFactor += 0.1, 2);
            scope.previewImage.zoom = 'transform: scale(' + zoomFactor + ');cursor:-webkit-grab';
          } else if (arg == 'out') {
            zoomFactor = Math.max(zoomFactor -= 0.1, 0.5);
            scope.previewImage.zoom = 'transform: scale(' + zoomFactor + ');cursor:normal';
          }
        }
      }
    }
  });

  app.directive('imageDraggable', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.draggable({
          start: function(event, ui) {
            var rect = ui.helper[0].getBoundingClientRect();
            if (rect.height <= ui.helper.parent().height() && rect.width <= ui.helper.parent().width()) {
              event.preventDefault();
            } else {
              ui.helper.css('cursor', '-webkit-grabbing');
            }
          },
          drag: function(event, ui) {
            var rect = ui.helper[0].getBoundingClientRect();
            var diffH = (rect.height - ui.helper.height()) / 2;
            var diffW = (rect.width - ui.helper.width()) / 2;

            if (rect.height > ui.helper.parent().height()) {
              if (ui.position.top < 0)
                ui.position.top = Math.max(ui.position.top, -diffH);
              else ui.position.top = Math.min(ui.position.top, diffH);
            } else ui.position.top = ui.originalPosition.top;

            if (rect.width > ui.helper.parent().width()) {
              if (ui.position.left < 0)
                ui.position.left = Math.max(ui.position.left, -diffW);
              else ui.position.left = Math.min(ui.position.left, diffW);
            } else ui.position.left = ui.originalPosition.left;
          },
          stop: function(event, ui) {
            ui.helper.css({
              'cursor': '-webkit-grab'
            });
          }
        });
      }
    };
  });

})();