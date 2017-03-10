angular.module('blackInkApp').controller('BlackInkCtrl', function($scope, blackInkStorage) {
	$scope.UndoDis='true'; 
    $scope.RedoDis='true';
    // $scope.InkColor='black';
    // $scope.TextWeight='bold';
    $scope.ShowHelp='inherit';
    $scope.helpTooltip='hide help';

	$scope.blackInkStorage = blackInkStorage;

	$scope.$watch('blackInkStorage.Data', function(value) {
		if($scope.blackInkStorage.Data===undefined) return;
		var changed = false;
		if($scope.InkColor !== $scope.blackInkStorage.Data.InkColor) {
	        $scope.InkColor = $scope.blackInkStorage.Data.InkColor;
	        changed = true;
	    }
		if($scope.TextWeight !== $scope.blackInkStorage.Data.TextWeight) {
	        $scope.TextWeight = $scope.blackInkStorage.Data.TextWeight;
	        changed = true;
	    }
        $scope.blackInkStorage.sync(changed);
    });

 	$scope.$watch('InkColor', function(value) {
        var inkColor = $scope.InkColor;
        if(inkColor && inkColor !== undefined) {
        	$scope.add({'InkColor': inkColor});
        }
    });

 	$scope.$watch('TextWeight', function(value) {
        var textWeight = $scope.TextWeight;
        if(textWeight && textWeight !== undefined) {
        	$scope.add({'TextWeight': textWeight});
        }
    });

    $scope.blackInkStorage.findAll({InkColor:'black', TextWeight:'bold'}).then(function(data){
        // console.log('findAll', data);
        $scope.blackInkStorage.Data=data;
        // console.log('$scope.blackInkStorage.Data', $scope.blackInkStorage.Data);
    });

    $scope.add = function(newContent) {
        blackInkStorage.add(newContent);
    };

    $scope.removeAll = function() {
        blackInkStorage.removeAll();
    };

    // $scope.removeAll();
    // $scope.add({'InkColor': $scope.InkColor, 'TextWeight': $scope.TextWeight});

    $scope.toggleShowHelp = function() {
    	if($scope.ShowHelp==='inherit') {
    		$scope.ShowHelp='none';
		    $scope.helpTooltip='show help';
    	}
    	else {
    		$scope.ShowHelp='inherit';
		    $scope.helpTooltip='hide help';
    	}
    };
    $scope.closeExtension = function() {
    	 window.close();
    };

});

