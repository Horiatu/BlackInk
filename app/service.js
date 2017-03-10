angular.module('blackInkApp').service('blackInkStorage', function ($q) {
    var _this = this;
    //_this.Data = {};

    this.findAll = function(options) {
      	var data = {};
    	var defer = $q.defer();
		console.log('options:',options);
        chrome.storage.sync.get('blackInk', function(keys) {
        	keys.forEachProp(function(key, value) {
        		options.forEachProp(function(k, v) {
        			if(!value.hasOwnProperty(k) || value[k]===undefined)
    	    		{
    	    			data[k]=v;
	        			// console.log('k,v:',k,v);
	        			// console.log('k, _this.Data[k]:',k, data[k]);
	        			// console.log('k, _this.Data.InkColor:',k, data.InkColor);
	        			// console.log('data:',data);
    	    		}
    	    		else {
	        			//console.log('k,value[k]:',k,value[k]);
    	    			data[k] = value[k];
	        			//console.log('_this.Data[k]:',_this.Data,_this.Data[k]);
    	    		}

        		});
        	});

        	defer.resolve(data);
        });
        return defer.promise;
    };

    this.sync = function() {
        chrome.storage.sync.set({'blackInk': _this.Data}, function() {
            console.log('Data is stored in Chrome storage');
         //    chrome.storage.sync.get('blackInk', function(keys) {
        	// 	console.log('keys', keys);
        	// });
        });
    };

    this.add = function (newValues) {
    	if(newValues=={}) return;
    	console.log('add', newValues, _this.Data);
    	var data = _this.Data;
        newValues.forEachProp(function(prop, val) {
        	data[prop] = val;
        	// console.log(prop, data[prop]);
        });
        // console.log('newValues, data, _this.Data:', newValues, data, _this.Data);
        //if(data !== _this.Data) {
        	_this.Data = data;
	    	_this.Data.date = new Date().toLocaleTimeString();
	        _this.sync();
        //}
    };

    this.removeAll = function() {
        _this.Data = {};
        // _this.sync();
        chrome.storage.sync.set({'blackInk': {}}, function() {
            console.log('Data in Chrome storage erased');
        });
    };
});