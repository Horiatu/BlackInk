(function () {
    'use strict';

	angular
		.module("blackInkApp", [])
		.filter('utcTimeStr2Local', utcTimeStr2Local);

    function utcTimeStr2Local($filter) {
        return function (utcTimeString, format) {
            if (!utcTimeString) {
                return;
            }

	
		    var m = /(\d{1,2}):(\d{1,2}):(\d{1,2})\s+(AM|PM)/gi.exec(utcTimeString);
			if (m === null) return;

		    // console.log(m, m[1], m[2], m[3], m[4]);
		    if(m[4] === 'PM') m[1] = Number(m[1])+12;
        	utcTimeString = '2000-01-01T'+m[1]+':'+m[2]+':'+m[3]+'Z';

            return $filter('date')(new Date(utcTimeString), format);
        };
    }
})(); 