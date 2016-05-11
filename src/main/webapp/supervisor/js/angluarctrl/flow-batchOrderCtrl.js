/**
 * 批次注入方法
 * 
 */
flowApp.controller('batchOrderController', function($scope,$rootScope,$location,$HttpService) {
	
	var vm = $scope.vm = {};
	
	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型	
	$scope.pageSizeCode = 10;// 每页展示多少条数
	
	// 初始化加载
	vm.batchInit = function() {
		window.scrollTo(0, 0);
		//导航样式,防刷新
		$rootScope.getSign(2,3);
		vm.getEnums();
		
	};
	
	
	vm.getEnums = function() {
		var postValue = {
			url : '../batch/get_enums',
			params : {
				type : 'batchStatus'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.orderStatus = res.data.resultSet;
				angular.identity();
			}
		});
	}
	
	/*
	 * 根据枚举过滤状态
	 */
	vm.getStatusStr = function(statu) {
		for ( var i = 0; i < vm.orderStatus.length; i++) {
			if (statu == vm.orderStatus[i].code) {
				return vm.orderStatus[i].name;
			}

		}
	};

	vm.batchBtn =function(){
		var params={
				currentPage:1,
				pageSizeCode:$scope.pageSizeCode
				
		}
		
		var startTime = $('#startCreateDate').val();
		var endTime = $('#endCreateDate').val();
		if (startTime != undefined && endTime != undefined) {
			var sDate = new Date((startTime).replace(/-/g, "/"));
			var eDate = new Date((endTime).replace(/-/g, "/"));
			if (sDate > eDate) {
				$rootScope.showToast("开始时间不能大于结束时间", 2000);
				return;
			}
		}

		if (startTime) {
			params["beginTime"] = startTime;
		}
		if (endTime) {
			params["endTime"] = endTime;
		}
		if ($scope.searchContent) {
			params['searchContent'] = $scope.searchContent;

		}
		if ($scope.userInfo) {
			params['userInfo'] = $scope.userInfo;

		}
		if ($scope.status) {
			params['status'] = $scope.status;

		}
		if ($scope.sortType) {
			params['sortType'] = $scope.sortType;

		}
		if ($scope.sortType) {
			params['sortType'] = $scope.sortType;

		}
		if ($scope.startTotalPrice) {
			params['startTotalPrice'] = $scope.startTotalPrice;

		}
		if ($scope.endTotalPrice) {
			params['endTotalPrice'] = $scope.endTotalPrice;

		}
		
		
		var postValue={
				url:'../batch/query_batch_list',
				params:params,
				rolling:true
		};
		$scope.rememberFJ=params;
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode=='0'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				vm.batchList=res.data.resultSet;
				if(vm.batchList.length>0){
					$scope.createPages();
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！",2000);
				}
			}else{
				console.log(res.data);
			}
		});
	};
	
	vm.goDetail=function(code){
		$location.path("batchDetail/" + code);
	};
	/*---------------------------------------------------------分页start------------------*/
	// 分页跳转
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
			return;
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
		console.log($scope.rememberFJ);
		params = $scope.rememberFJ;
		params["currentPage"] = index;
		$scope.currentPage = index;
		var postValue = {
			url:'../batch/query_batch_list',
			params : params,
			rolling : true
		};
		console.log(postValue);
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.pageInfo = res.data.pageInfo;
				if ($scope.pageInfo != undefined) {
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				vm.batchList=res.data.resultSet;
				$scope.createPages();
			}else {
				$rootScope.showToast(res.data.resultComment);
			}

		});
	};
	$scope.pages = [];
	$scope.createPages = function() {
		$scope.pages = [];
		// 以当前页为中心，向两边扩展
		var start = $scope.currentPage - 2;
		var end = $scope.currentPage + 2;
		// 起点小于1
		if (start < 1 && $scope.totalPage >= 5) {
			start = 1;
			end = 5;
		}

		if (start < 1 && $scope.totalPage < 5) {
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
	/*---------------------------------------------------------页面跳转end------------------*/
});
