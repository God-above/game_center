flowApp.controller('returnFailController', function ($rootScope,$scope,$cookieStore,$HttpService,$location,$routeParams) {
	$scope.init=function(){
		$scope.showType=$routeParams.type;
		console.log($scope.showType);
	};
});
