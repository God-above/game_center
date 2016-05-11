/**
 * 批次注入方法
 * 
 */
flowApp.controller('batchOrderController', function($rootScope,$scope, $cookieStore,
		$HttpService, $location) {
	$scope.searchParams = {};
	$scope.currentPage = 1;
	$scope.goOrderDetail = function(batch) {
		var params={
				batchNo:batch.number
		};
		var postValue={
				url:'../order/orderPage',
				params:params,
				rolling : true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$scope.orderList=res.data.resultSet;
				if($scope.orderList.length>0){
					$location.path("batchDetail/" + batch.number);
				}else{
					$rootScope.showToast("暂无订单信息！", 2000);
				}
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
			console.log(res);
		});
	};

	// 初始化加载
	$scope.batchInit = function() { 
		$scope.getBatchStatus();// 状态
		$scope.batchNav();
	};

	// 状态
	$scope.getBatchStatus = function() {
		var params = {
			type : "batchStatus"
		};
		var postValue = {
			url : '../batch/get_enums',
			params : params,
			rolling : true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				$scope.batchStatus = res.data.resultSet;
			} else {
				$rootScope.showToast(res.data.resultComment,2000);

			}
		});
	};

	// 搜索和查询
	$scope.batchBtn = function() {
		var params = {
			currentPage : 1,
			pageSize : 5
		};
		var startTime = $('#start_time').val();
		var endTime = $('#end_time').val();
		if (startTime != undefined && endTime != undefined) {
			var sDate = new Date((startTime).replace(/-/g, "/"));
			var eDate = new Date((endTime).replace(/-/g, "/"));
			if (sDate > eDate) {
				$rootScope.showToast("开始时间不能大于结束时间",2000);
				return;
			}
		}
		if (startTime) {
			params["startCreateDate"] = startTime;
		}
		if (endTime) {
			params["endCreateDate"] = endTime;
		}
		if ($scope.batchInfo) {
			params["searchContent"] = $scope.batchInfo;
		}
		if ($scope.batchStatu) {
			params["status"] = $scope.batchStatu;
		}
		if ($scope.minPrice!=undefined  || $scope.maxPrice!=undefined) {
			if (isNaN($scope.minPrice)
					|| isNaN($scope.maxPrice)||isNaN($scope.minPrice)>isNaN($scope.maxPrice)) {
				$rootScope.showToast("请输入正确的价格!", 2000);
				return;
			}else{
				if(parseInt($scope.minPrice)>parseInt($scope.maxPrice)){
					$rootScope.showToast("请输入正确的价格范围!", 2000);
					return;
				}
			}
		}
		if ($scope.minPrice) {
			params["startTotalPrice"] = $scope.minPrice;
		}
		if ($scope.maxPrice) {
			params["endTotalPrice"] = $scope.maxPrice;
		}

		$scope.searchParams = params;
		var postValue = {
			url : '../batch/query_batch_list',
			params : params,
			rolling : true

		};

		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				$scope.pageInfo = res.data.pageInfo;
				if ($scope.pageInfo != undefined) {
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.batchList = res.data.resultSet;
				if($scope.batchList.length>0){
					$scope.createPages();
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
				}
			}else if(res.data.resultCode=='1201'){
				$rootScope.showToast(res.data.resultComment,3000);
				window.location.href="./login.html";
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};

	// 取消充值
	$scope.batchNoPay = function(batch) {
		console.log(batch);
		//cancel_batch
		var params={
				
				batchNo:batch.number
		}
		console.log(params);
		var postValue = {
				url : '../batch/cancel_batch',
				params : params,
				rolling : true

			}

			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == 0) {
					batch.status=5;
				} else {
					$rootScope.showToast(res.data.resultComment,2000);
				}
			});

	};
	// 确认 充值
	$scope.batchPay = function(batch) {
		console.log(batch);
	    //页面跳转	
		$location.path("confirmOrder/"
				+ batch.number + "/payMain/batch");
	};

	/**
	 * ==========================================================工具方法
	 */
	// 转换状态
	$scope.getParesStatu = function(statu) {
		for ( var i = 0; i < $scope.batchStatus.length; i++) {
			if (statu == $scope.batchStatus[i].code) {
				return $scope.batchStatus[i].name;
			}

		}
	}

	$scope.batchNav = function() {
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(5).addClass("active");
	}

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
		params = $scope.searchParams;
		params["currentPage"] = index;
		$scope.currentPage = index;

		var postValue = {
			url : '../batch/query_batch_list',
			params : params,
			rolling : true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				$scope.pageInfo = res.data.pageInfo;
				if ($scope.pageInfo != undefined) {
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.batchList = res.data.resultSet;
				$scope.createPages();
			} else {
				$rootScope.showToast(res.data.resultComment,2000);

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
});
