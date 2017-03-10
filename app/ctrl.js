angular.module('blackInkApp').controller('BlackInkCtrl', function($scope, blackInkStorage) {
	$scope.UndoDis='true'; 
    $scope.RedoDis='true';
    // $scope.InkColor='black';
    $scope.TextWeight='bold';
    $scope.showHelp='inherit';
    $scope.helpTooltip='hide help';

	$scope.blackInkStorage = blackInkStorage;

	$scope.$watch('blackInkStorage.Data', function(value) {
		if($scope.blackInkStorage.Data===undefined) return;
        $scope.InkColor = $scope.blackInkStorage.Data.InkColor;
        $scope.TextWeight = $scope.blackInkStorage.Data.TextWeight;
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
        console.log('findAll', data);
        $scope.blackInkStorage.Data=data;
        console.log('$scope.blackInkStorage.Data', $scope.blackInkStorage.Data);
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

