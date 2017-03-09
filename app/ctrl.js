angular.module('blackInkApp').controller('BlackInkCtrl', function($scope, blackInkStorage) {
	$scope.UndoDis='true'; 
    $scope.RedoDis='true';
    $scope.InkColor='black';
    $scope.TextWeight='bold';
    $scope.showHelp='inherit';
    $scope.helpTooltip='hide help';

	$scope.blackInkStorage = blackInkStorage;

	$scope.$watch('blackInkStorage.Data', function() {
        console.log('watch', $scope.blackInkStorage.Data);
        //$scope.InkColor = $scope.blackInkStorage.InkColor;
    });

    $scope.blackInkStorage.findAll(function(data){
    	//$scope.removeAll();
        //$scope.todoList = data;
        //console.log('findAll', data);
        //if(data && data.length===0) {
        var init = {};
        ['InkColor', 'TextWeight'].forEach(function(val) {
        	if(!data.hasOwnProperty(val)) {
        		init[val] = $scope[val];
        	}
        });

        $scope.add(init);
        //}
        $scope.$apply();
    });

    $scope.add = function(newContent) {
        //console.log('add', newContent);
        blackInkStorage.add(newContent);
        $scope.newContent = '';
    };

    $scope.removeAll = function() {
        //console.log('removeAll');
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

