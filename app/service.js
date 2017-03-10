angular.module('blackInkApp').service('blackInkStorage', function ($q) {
    var _this = this;
    //_this.Data = {};

    this.findAll = function(options) {
      	var data = {};
    	var defer = $q.defer();
		// console.log('options:',options);
        chrome.storage.sync.get('blackInk', function(keys) {
        	keys.forEachProp(function(key, value) {
        		options.forEachProp(function(k, v) {
        			if(!value.hasOwnProperty(k) || value[k] === undefined) {
    	    			data[k] = v;
    	    		}
    	    		else {
    	    			data[k] = value[k];
    	    		}

        		});
        	});

        	defer.resolve(data);
        });
        return defer.promise;
    };

    this.add = function (newValues) {
    	if(newValues=={}) return;
    	// console.log('add', newValues, _this.Data);
    	var changed = false;
    	if(!_this.Data || _this.Data === undefined) _this.Data = {};
        newValues.forEachProp(function(prop, val) {
        	if(_this.Data[prop] !== val)
        	{
        		_this.Data[prop] = val;
        		changed = true;
        	}
        });
    	
        _this.sync(changed);
    };

    this.removeAll = function() {
        _this.Data = {};
        // _this.sync();
        chrome.storage.sync.set({'blackInk': {}}, function() {
            console.log('Data in Chrome storage erased');
        });
    };

    this.sync = function(update) {
    	console.log('update:', update);
    	if(!update) return;
    	_this.Data.date = new Date().toLocaleTimeString();
        chrome.storage.sync.set({'blackInk': _this.Data}, function() {
            console.log('Data is stored in Chrome storage');
            // chrome.storage.sync.get('blackInk', function(keys) {
        	// 	console.log('keys', keys);
        	// });
        });
    };


});