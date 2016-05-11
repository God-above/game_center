flowApp.controller('sumeHistoryDetailController', function($rootScope, $scope,$routeParams,$HttpService) {
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	//初始化方法
	$scope.init = function(){
		
		var params = {
			exchangeBatchNo : $routeParams.exchangeBatchNo,
			currentPage : $scope.currentPage,
			pageSize : $scope.pageSize
		};
		
		$scope.getSumeHistory(params);
	};
	
	$scope.getSumeHistory = function(params){
		var postValue={
				url:'../coupon/queryCouponRecordDetail',
				params:params
		}; 
		$HttpService.post(postValue).then(function(res){
			
			if(res.data.resultCode== 1){
				$scope.histroyDetailList = res.data.resultBody;
				if(!$scope.histroyDetailList){
					$scope.histroyDetailList = [];
				}
				
				if (res.data.pageInfo != undefined) {
					$scope.totalPage = res.data.pageInfo.totalPage;
				}
				
				$scope.historyParams = params;
				$scope.createPages();
			}else{
				$scope.histroyDetailList = [];
			}
		});
	};
	
	$scope.updateStatus = function(sumehistory,index){
		
		var params = {
			
				recordNo : sumehistory.recordNo,
				targetStatus : 5  //5:消费失败    4:消费成功
		};
			
			var postValue={
					url:'../admin/updateCouponOrderByHand',
					params:params
			};
			$HttpService.post(postValue).then(function(res){
				if(res.data.resultCode== 1){
						
				}else{
					
				}
			});
	};
	
	$scope.btnSeach = function(){
		var params = {
			currentPage : $scope.currentPage,
			pageSize : $scope.pageSize
		};
		
		if($scope.couponCode){
			params["couponNo"] = $scope.couponCode;
		}
		
		
		$scope.getSumeHistory(params);
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
		
		var params = $scope.historyParams;
		params["currentPage"] = index;
		
		$scope.getSumeHistory(params);
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
