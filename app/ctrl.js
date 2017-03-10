angular.module('blackInkApp').controller('BlackInkCtrl', function($scope, blackInkStorage) {
	$scope.UndoDis='true'; 
    $scope.RedoDis='true';
    // $scope.InkColor='black';
    // $scope.TextWeight='bold';
    // $scope.ShowHelp='inherit';
    $scope.helpTooltip='hide help';
    $scope.NightMode='pink';
    // $scope.Latitude = 43.7303873;
    // $scope.Longitude = -79.32944619999999;

	$scope.blackInkStorage = blackInkStorage;

	$scope.$watch('blackInkStorage.Data', function(value) {
		if($scope.blackInkStorage.Data===undefined) return;
		var changed = false;
        if($scope.ShowHelp !== $scope.blackInkStorage.Data.ShowHelp) {
            $scope.ShowHelp = $scope.blackInkStorage.Data.ShowHelp;
            changed = true;
        }
		if($scope.InkColor !== $scope.blackInkStorage.Data.InkColor) {
	        $scope.InkColor = $scope.blackInkStorage.Data.InkColor;
	        changed = true;
	    }
        if($scope.TextWeight !== $scope.blackInkStorage.Data.TextWeight) {
            $scope.TextWeight = $scope.blackInkStorage.Data.TextWeight;
            changed = true;
        }
        if($scope.Latitude !== $scope.blackInkStorage.Data.Latitude) {
            $scope.Latitude = $scope.blackInkStorage.Data.Latitude;
            changed = true;
        }
        if($scope.Longitude !== $scope.blackInkStorage.Data.Longitude) {
            $scope.Longitude = $scope.blackInkStorage.Data.Longitude;
            changed = true;
        }
        $scope.blackInkStorage.sync(changed);
    });

    $scope.$watch('ShowHelp', function(value) {
        var showHelp = $scope.ShowHelp;
        if(showHelp && showHelp !== undefined) {
            $scope.add({'ShowHelp': showHelp});
        }
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

    $scope.blackInkStorage.findAll({
        InkColor:'black', 
        TextWeight:'bold', 
        ShowHelp:'none',
        NightMode:'pink',
        Latitude: 43.7303873,
        Longitude: -79.32944619999999,

    }).then(function(data){
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


    $scope.getLocation = function () {
        // var _this = this;
        var showPosition = function (position) {
            $scope.add({Latitude: $scope.Latitude = position.coords.latitude});
            $scope.add({Longitude: $scope.Longitude = position.coords.longitude});
            $scope.$apply();
            //$scope.sync(true);
            console.log('Latitude: '+ position.coords.latitude+' Longitude: '+position.coords.longitude);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    };

});

