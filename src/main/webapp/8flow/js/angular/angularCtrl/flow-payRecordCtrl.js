flowApp.controller('payRecordController', function($rootScope, $scope,
		$cookieStore,$HttpService) {
	var vm = $scope.vm = {};// 流量卡方法集合
	var om = $scope.oneTab = {};// tab1参数
	var tm = $scope.tm = {};// tab2参数
	vm.tabContent = 0; // 初始化tab
	
	$scope.currentPage = 1;
	$scope.pageSize = 5;

	vm.itemCountext;


	vm.init = function(){
		//直接根据 userCode查询  消费记录
		vm.getConsumeRecord(vm.getTab1Params());
	};
	
	// tab切换
	vm.showTab = function(count) {
		vm.tabContent = count;
		$scope.currentPage = 1;
		
		if(count == 0){
			vm.getConsumeRecord(vm.getTab1Params());
		}else{
			vm.getConsumeRecordByPhoneNum(vm.getTab2Params());
		}
	};

	// tab切换
	vm.getItem = function(item, id) {
		vm.itemCountext = item.count;
	};

	vm.btnSeach = function(type) {
		//总览查询 
		//时间
		//搜索内容
		//排序方式
		if (type == 'total') {
			vm.getConsumeRecord(vm.getTab1Params());
		}
		//明细查询
		//时间
		//搜索内容
		//排序方式
		if (type == 'detail') {
			//模拟查询结果数据
			vm.getConsumeRecordByPhoneNum(vm.getTab2Params());
		}

	}

	vm.getTab1Params = function(){
		var params = {
			currentPage : $scope.currentPage ,
			pageSize :$scope.pageSize
		};
		
		if(vm.serchContent){
			params["couponNo"] = vm.serchContent;
		}
		
		var startTime =angular.element("#o_start_time").val();
		var endTime = angular.element("#o_end_time").val();
		
		if(startTime){
			params["consumeStartDate"] = startTime;
		}
		if(endTime){
			params["consumeEndDate"] = endTime;
		}
		
		return params;
	};
	vm.getTab2Params = function(){
		var params = {
			currentPage : $scope.currentPage ,
			pageSize :$scope.pageSize
		};
		
		if(tm.serchContent){
			params["rechargeAccount"] = tm.serchContent;
		}
		
		var startTime =angular.element("#t_start_time").val();
		var endTime = angular.element("#t_end_time").val();
		
		if(startTime){
			params["consumeStartDate"] = startTime;
		}
		if(endTime){
			params["consumeEndDate"] = endTime;
		}
		
		return params;
	}
	vm.getConsumeRecord = function(params){
		var postValue={
				url:'../coupon/queryCouponRecord',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				vm.liulianglist = res.data.resultBody;
				if(vm.liulianglist.length == 0){
					$rootScope.showToast("无符合查询条件的数据", 2000);
					return;
				}
				if (res.data.pageInfo != undefined) {
					$scope.totalPage = res.data.pageInfo.totalPage;
				}
				$scope.createPages();
			}else if(res.data.resultCode== 0){
				
				$rootScope.showToast("无符合查询条件的数据", 2000);
				return;
			}else{
				
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	
	vm.getConsumeRecordByPhoneNum = function(params){
		var postValue={
				url:'../coupon/queryCouponRecord',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			console.log(res.data);
			if(res.data.resultCode== 1){
				vm.phonelist = res.data.resultBody;
				if (res.data.pageInfo != undefined) {
					$scope.totalPage = res.data.pageInfo.totalPage;
				}
				$scope.createPages();
			}else if(res.data.resultCode== 0){
				
				$rootScope.showToast("无符合查询条件的数据", 2000);
				return;
			}else{
				
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	
	
	// 创建分页和页码

	$scope.pages = [];
	$scope.createPages = function() {
		$scope.pages=[];
		// 以当前页为中心，向两边扩展
		var start = $scope.currentPage - 2;
		var end = $scope.currentPage + 2;
		// 起点小于1
		if (start < 1 && $scope.totalPage >= 5) {
			start = 1;
			end = 5;
		}
		
		if(start < 1 && $scope.totalPage < 5){
			start = 1;
			end = $scope.totalPage;
		}
		
		// 终点大于总页
		if (end > $scope.totalPage && $scope.totalPage > 5) {
			end = $scope.totalPage;
			start = $scope.totalPage - 4;
		}
		
		if (end > $scope.totalPage && $scope.totalPage <= 5) {
			end = $scope.totalPage;
			start = 1;
		}
		
		for (start; start <= end; start++) {
			var j = {
				value : start,
				name : start
			};
			$scope.pages.push(j);
		}
	};
	
	
	// 跳转页面
	$scope.switchPagePrize = function(index) {
		if ($scope.currentPage == index) {
			if (index == 1) {
				$rootScope.showToast("已经是首页", 2000);
				return;
			}
			if (index == $scope.totalPage) {
				$rootScope.showToast("已经是末页", 2000);
				return;
			}
		}
		if (index == undefined || index > $scope.totalPage) {
			$rootScope.showToast("请输入正确的页码", 2000);
			return;
		}
		if (!index) {
			$scope.currentPage = 1;
		} else {
			$scope.currentPage = index;
		}
		
		
		//总览列表
		if(vm.tabContent == 0){
			vm.getConsumeRecord(vm.getTab1Params());
		}else{		//明细列表
			vm.getConsumeRecordByPhoneNum(vm.getTab2Params());
		}
		
	};
});
