flowApp.controller('sumeHistoryController', function($rootScope, $scope,
		$cookieStore,$HttpService,$location) {
	var vm = $scope.vm = {};// 兑换卡方法集合

	// 初始化
	vm.getSumeHistory = function() {
		// 获取状态
		//vm.getState();
		// 获取全部数据第一页
		vm.sumeHistoryList({});

	}
	// 获取状态
	vm.getState = function() {
		vm.stateList = stateData.list;
		console.log(vm.stateList);
	};

	// 过滤状态
	vm.getStateStr = function(str) {
		for ( var i = 0; i < vm.stateList.length; i++) {
			if (str == vm.stateList[i].state) {

				return vm.stateList[i].name;
			}

		}

	};
	
	vm.queryDetail = function(exchangeNo){
		$location.path("sumeHistoryDetail/"+exchangeNo);
	};
	// 获取全部数据第一页
	vm.sumeHistoryList = function(params) {
		var postValue={
				url:'../coupon/queryExchangeBatchRecord',
				params:params
		}; 
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				vm.histroyList = res.data.resultBody;
			}else{
				vm.histroyList = [];
				console.log(res.data);
			}
		});
	};
	// 搜索
	vm.btnSeach = function() {
		var params = {
			exchangeBatchName : vm.serchContent,
			currentPage : 1,
			pageSize : 10
		};
		
		
		var startTime =angular.element("#o_start_time").val();
		var endTime = angular.element("#o_end_time").val();
		if(startTime){
			params["createStartDate"] = startTime;
		}
		
		if(endTime){
			params["createEndDate"] = endTime;
		}
		
		vm.sumeHistoryList(params);
	};
});
