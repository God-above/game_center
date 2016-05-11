/**
 * 批次注入方法
 * 
 */
flowApp.controller('coouponBatchDetailCtrl', function($rootScope,$scope,$routeParams,$HttpService) {
	
	var vm = $scope.vm = {};

	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.rememberFJ = ""; // 记录分页的条件
	
	$scope.orderNo = $routeParams.orderNo;
	// 初始化加载
	vm.batchDetailInit = function() {
		//导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(2,3);
		vm.getEnums();
		vm.getCouponDetail($scope.orderNo);
		//vm.getBatchList($scope.orderNo);
	};
	
	
	//批次详情
	vm.getCouponDetail=function(batchNo){
		var postValue = {
				url : '../admin/getCouponOrder',
				params : {
					orderNo : batchNo
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					vm.couponDetail=res.data.resultBody.order;
					vm.paymentList=res.data.resultBody.paymentList;
				}
			});
		
	}
	
	/*
	 * 获取订单状态
	 */
	vm.getEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'orderStatusCode'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.orderStatus = res.data.resultBody;
			}
		});
	}
	/*
	 * 根据枚举过滤状态
	 */
	vm.getStatusStr = function(statu) {
		for ( var i = 0; i < vm.orderStatus.length; i++) {
			if (statu == vm.orderStatus[i].code) {
				return vm.orderStatus[i].description;
			}

		}
	};
	/* ======解析支付类型 */
	$scope.parsePayType = function(type) {
		if (type && type == 2) {
			return "余额";
		} else if (type && type == 10) {
			return "支付宝";
		}

	};
	
});
