flowApp.controller('testController', function($rootScope, $scope,
		$cookieStore, $location,orderList,$HttpService) {
	var vm = $scope.vm = {};// 用户函数方法集合
	$scope.currentPage=1;
	vm.tabContent =0;	
	vm.orderList=orderList;
	console.log(vm.orderList);
	


});
