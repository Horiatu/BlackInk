angular.module('blackInkApp').service('blackInkStorage', function ($q) {
    var _this = this;
    _this.Data = {};

    this.findAll = function(callback) {
      	_this.Data = {};
        chrome.storage.sync.get('blackInk', function(keys) {
        	//console.log('keys', keys);
        	keys.forEachProp(function(key) {
        		//console.log('key', key, keys[key]);
        		keys[key].forEachProp(function(val) {
    	    		_this.Data[val] = keys[key][val];
	        		//console.log(key, keys[key][val], _this.Data);
        		});
        	});
            callback(_this.Data);
        });
    };

    this.sync = function() {
    	// console.log('sync', _this.Data);
        chrome.storage.sync.set({'blackInk': _this.Data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    };

    this.add = function (newContent) {
    	console.log('add', newContent);
    	if(newContent=={}) return;
    	newContent.date = new Date();
        _this.Data = Object.assign(_this.Data, newContent);
        //console.log('assign_2', newContent, _this.Data);
        _this.sync();
    };

    // this.remove = function(blackInk) {
    // 	console.log('remove', _this.Data, blackInk);
    //     _this.Data.splice(this.Data.indexOf(blackInk), 1);
    //     _this.sync();
    // };

    this.removeAll = function() {
        _this.Data = {};
        // _this.sync();
        chrome.storage.sync.set({'blackInk': {}}, function() {
            console.log('Data in Chrome storage erased');
         //    chrome.storage.sync.get('blackInk', function(keys) {
        	// 	console.log('keys', keys);
        	// });
        });
    };
});