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
			$scope.extend('vertical');
		}

		if(j == $scope.cols() - 1) {
			$scope.extend('horizontal');
		}
	}

	$scope.update = function() {
	}

	$scope.extend = function(direction) {
		if(direction == 'vertical' || direction === undefined) {
			var row = [];

			for(var i = 0; i < $scope.cols(); i++) {
				row.push('');
			}

			$scope.data.push(row);
		}

		if(direction == 'horizontal' || direction === undefined) {
			for(var i = 0; i < $scope.data.length; i++) {
				$scope.data[i].push('');
			}
		}

		console.log($scope.rows(), $scope.cols());
	}
});
