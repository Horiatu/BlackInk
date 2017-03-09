var blackIncApp=angular.module('blackInkApp'); 
blackIncApp.controller('BlackInkCtrl',function($scope){
	$scope.UndoDis='true'; 
    $scope.RedoDis='true';
    $scope.IncColor='black';
    $scope.TextWeight='bold';
    $scope.showHelp='inherit';
    $scope.helpTooltip='hide help';
    $scope.toggleShowHelp = function() {
    	if($scope.showHelp==='inherit') {
    		$scope.showHelp='none';
		    $scope.helpTooltip='show help';
    	}
    	else {
    		$scope.showHelp='inherit';
		    $scope.helpTooltip='hide help';
    	}
    };
    $scope.closeExtension = function() {
    	 window.close();
    };
});

blackIncApp.service('blackInkStorage', function ($q) {
    var _this = this;
    this.data = [];
    this.findAll = function(callback) {
        chrome.storage.sync.get('blackInk', function(keys) {
            if (keys.blackInk !== null) {
                _this.data = keys.blackInk;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i].id = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    };

    this.sync = function() {
        chrome.storage.sync.set({blackInk: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    };

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var blackInk = {
            id: id,
            content: newContent,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(blackInk);
        this.sync();
    };

    this.remove = function(blackInk) {
        this.data.splice(this.data.indexOf(blackInk), 1);
        this.sync();
    };

    this.removeAll = function() {
        this.data = [];
        this.sync();
    };
});