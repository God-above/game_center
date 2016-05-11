/**
 * 批次注入方法
 * 
 */
flowApp.controller('batchDetailController', function($rootScope,$scope,$routeParams,$HttpService) {
	
	var vm = $scope.vm = {};

	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.rememberFJ = ""; // 记录分页的条件
	
	$scope.batchNo = $routeParams.batchCode;
	// 初始化加载
	vm.batchDetailInit = function() {
		//导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(2,3);
		vm.getEnums();
		vm.getBatchDetail($scope.batchNo);
		vm.getBatchList($scope.batchNo);
	};
	
	
	
	vm.getBatchDetail=function(batchNo){
		var postValue = {
				url : '../batch/query_batch',
				params : {
					batchNo : batchNo
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					vm.batchDetail=res.data.resultBody;
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
	
	
	vm.getBatchList=function(batchNo){
		var params = {
				currentPage : 1,
				pageSize : $scope.pageSizeCode,
				batchNo : batchNo
			};
			$scope.rememberFJ = params;
			var postValue = {
				url : '../order/orderPage',
				params : params,
				rolling:true
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$scope.pageInfo = res.data.pageInfo;
					if ($scope.pageInfo != undefined) {
						$scope.totalPage = $scope.pageInfo.totalPage;
					}
					vm.orderList = res.data.resultSet;
					if (vm.orderList.length > 0) {
						$scope.createPages();
					} else {
						$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
					}
				} else {
					console.log(res.data);
				}
			});
	}
	
	vm.orderBtn=function(){
		var params = $scope.rememberFJ;
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
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
		if ($scope.searchInfo) {
			params['searchInfo'] = $scope.searchInfo;

		}
		if ($scope.status) {
			params['status'] = $scope.status;

		}
		if ($scope.sortType) {
			params['sortType'] = $scope.sortType;

		}
		if ($scope.beginPrice) {
			params['beginPrice'] = $scope.beginPrice;

		}
		if ($scope.endPrice) {
			params['endPrice'] = $scope.endPrice;

		}
		$scope.rememberFJ = params;
		var postValue = {
			url : '../order/orderPage',
			params : params,
			rolling:true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.pageInfo = res.data.pageInfo;
				if ($scope.pageInfo != undefined) {
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				vm.orderList = res.data.resultSet;
				if (vm.orderList.length > 0) {
					$scope.createPages();
				} else {
					$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
				}
			} else {
				console.log(res.data);
			}
		});
	}
	/*
	 * 修改状态 
	 * 
	 */
	vm.editStatus = function(order) {
		$("#editModal").modal("show");
		vm.editStatus.orderStatus ="";
		vm.editStatus.remark ="";
		vm.editStatus.updateOrderStatus = function() {
			if (vm.editStatus.orderStatus) {
				if (vm.editStatus.orderStatus == 50) {
					var params = {
						orderNo : order.orderNo,
						status : parseInt(vm.editStatus.orderStatus)
					}
					var postValue = {
						url : '../order/updateOrderStatus',
						params : params
					};
					$HttpService.post(postValue).then(function(res) {
						if (res.data.resultCode == '0') {
							$("#editModal").modal("hide");
							order.status = vm.editStatus.orderStatus;
							$rootScope.showToast("处理成功", 2000);

						}
					});
				} else {
					if (vm.editStatus.remark) {
						var params = {
							orderNo : order.orderNo,
							status : parseInt(vm.editStatus.orderStatus),
							remark : vm.editStatus.remark
						}
						var postValue = {
							url : '../order/updateOrderStatus',
							params : params
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								$("#editModal").modal("hide");
								order.status = vm.editStatus.orderStatus;
								$rootScope.showToast("处理成功", 2000);
							}
						});

					} else {
						$rootScope.showToast("更改失败状态必须输入原因", 2000);
					}

				}
			}else{
				
				$rootScope.showToast("请选择要修改的状态", 2000);
			}
		};
	}
	/*
	 * 退款
	 */
	vm.refund = function(order) {
		console.log(order)
		$scope.disableAlert = true;
		$scope.disableAlert_title = "确认信息";
		$scope.disableAlert_text = "确定要退款吗?";

		vm.refund.esc = function() {
			$scope.disableAlert = false;

		}

		vm.refund.confirm = function() {
			var params = {
				orderNoList : order.orderNo
			}
			var postValue = {
				url : '../order/orderRefund',
				params : params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '4') {
					console.log(res.data);
					$scope.disableAlert = false;
					order.status = 41;
					$rootScope.showToast("处理成功", 2000);

				}
			});
		}

	}
	
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
		params = $scope.rememberFJ;
		params["currentPage"] = index;
		$scope.currentPage = index;
		var postValue = {
			url : '../order/orderPage',
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
				vm.orderList = res.data.resultSet;
				$scope.createPages();
			}  else {
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
