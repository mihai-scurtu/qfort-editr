var qfortEditr = angular.module('qfortEditr', []);

qfortEditr.controller('DataCtrl', function($scope) {
	$scope.data = [['', 'd'], ['d', '']];

	$scope.rows = function() {
		return $scope.data.length;
	};

	$scope.cols = function() {
		if($scope.data[0]) {
			return $scope.data[0].length;
		} else {
			return 0;
		}
	};

	$scope.focus = function (i, j) {
		if(i == $scope.rows() - 1) {
			$scope.extendVertically();
		}

		if(j == $scope.cols() - 1) {
			$scope.extendHorizontally();
		}
	}

	$scope.update = function() {
	}

	$scope.extend = function(direction) {
		$scope.extendVertically();
		$scope.extendHorizontally();
	}

	$scope.extendVertically = function() {
		var row = [];

		for(var i = 0; i < $scope.cols(); i++) {
			row.push('');
		}

		$scope.data.push(row);
	}

	$scope.extendHorizontally = function() {
		for(var i = 0; i < $scope.data.length; i++) {
			$scope.data[i].push('');
		}
	}
});
