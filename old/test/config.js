(function (CVM) {
    'use strict';

    CVM.Config =  CVM.Config || {};
    CVM.Config.autoComplete = {
        location : {types:'(cities)', country: 'in' }
    };
    CVM.Config.designIds = [{
	    val: 1,
	    text: ''
	  }, {
	    val: 2,
	    text: ''
	  }, {
        val: 3,
        text: ''
      },{
        val: 4,
        text: ''
      }];

	CVM.Config.designPath = 'cvimages';
	CVM.Config.designFilename = 'image';

})(window.CVM = window.CVM || {}); 
