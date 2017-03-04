(function() {

  var app = angular.module('cvbuilder', ['ui.router','ngSanitize','ngAnimate','ngTouch','datePicker','ui.sortable','ui.bootstrap','720kb.tooltips']);

  app.config(function(tooltipsConfigProvider) {
    tooltipsConfigProvider.options({
      lazy: false,
      size: 'small',
      side: 'right',
      showTrigger: 'click',
      speed: 'fast'
    })
  });

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/design/");

  var getData = function($stateParams, cvFactory, initialData) {
    if ($stateParams.email) {
      var isDownload = this.self.name == 'download';
      return cvFactory.getData($stateParams.email,isDownload).then(function(data) {
        if(data.status != 'Error')
          return data;
        else {
          console.log(data.error);
          initialData[0].fields.Email_Address = $stateParams.email;
          return initialData;
        }
      },function(err){
          console.log(err);
          initialData[0].fields.Email_Address = $stateParams.email;
          return initialData;
      });
    } else return initialData;
  }

  $stateProvider
    .state('cvbuilder', {
      url: "",
      templateUrl:'cvbuilder/layout.html',
      controller: "appCtrl",
      abstract: "true",
      resolve: {
          initialData: function(cvFactory) {
              return cvFactory.getData().then(function(data){
                return data;
              },function(err){
                console.log(err);
              });
          },
          loginInfo : function(userFactory){
             return userFactory.checkLogin().then(function(data) {
                 return data;
             },function(err){
             });
          }
      }
    })
    .state('resume', {
      url: "/resume/:email/:id",
      parent: 'cvbuilder',
      templateUrl: "cvbuilder/views/newcv.html",
      controller: 'cvbuilderCtrl',
      resolve: {
        initialData: getData,
        cssLoaded: function (injectCSS) {
            return injectCSS.delete();
        }
      }
    })
    .state('preview', {
      url: "/preview/:email/:id",
      parent: 'cvbuilder',
      templateUrl: function($stateParams){ 
        var id = $stateParams.id || 1;
        var arr = CVM.Config.designIds.filter(function(obj){return obj.val == id});
        id = (arr && arr.length)? id : 1;          
        return 'cvbuilder/cvdesigns/design'+(id || 1)+'.html' 
      },
      controller: "previewCtrl",
      resolve: {
           initialData: getData,
           cssLoaded: function ($stateParams, injectCSS) {
             var id = $stateParams.id || 1;
             var arr = CVM.Config.designIds.filter(function(obj){return obj.val == id});
             id = (arr && arr.length)? id : 1;
             injectCSS.delete().then(function(){
                return injectCSS.set(id, 'cvbuilder/cvdesigns/design'+id+'.css' );
             })
           }
       }
    })
    .state('download', {
        url: "/download/:email/:id",
        parent: 'cvbuilder',
        templateUrl: function($stateParams){
          var id = $stateParams.id || 1;
          var arr = CVM.Config.designIds.filter(function(obj){return obj.val == id});
          id = (arr && arr.length)? id : 1;
          return 'cvbuilder/cvdesigns/design'+id+'.html'
        },
        controller: "downloadCtrl",
        resolve: {
            initialData: getData,
            cssLoaded: function ($stateParams, injectCSS) {
              var id = $stateParams.id || 1;
              var arr = CVM.Config.designIds.filter(function(obj){return obj.val == id});
              id = (arr && arr.length)? id : 1;
              injectCSS.delete().then(function(){
                return injectCSS.set(id, 'cvbuilder/cvdesigns/design'+id+'.css' );
             })
            }
         }
      }).state('design', {
        url: "/design/:email",
        parent: 'cvbuilder',
        templateUrl: 'cvbuilder/views/selectdesign.html',
        controller: "designCtrl"
      })
    }]);
})();