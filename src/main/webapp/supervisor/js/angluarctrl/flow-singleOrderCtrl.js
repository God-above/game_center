/**
 * 批次注入方法
 * 
 */
flowApp.controller('singleOrderController', function($scope, $rootScope,
		$HttpService,$timeout) {

	var vm = $scope.vm = {};

	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.rememberFJ = ""; // 记录分页的条件

	// 初始化加载
	vm.orderInit = function() {
		// 导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(2, 4);
		vm.getEnums();
	};
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	vm.orderBtn($scope.paginationConf.currentPage);
            }
        };
	/*
	 * 获取订单状态
	 */
	vm.getEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'directOrderStatus'
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
		if(vm.orderStatus){
			for ( var i = 0; i < vm.orderStatus.length; i++) {
				if (statu == vm.orderStatus[i].code) {
					return vm.orderStatus[i].description;
				}
			}
		}
		
	};
	
	/*
	 * 查询结果
	 */
	vm.orderBtn = function(index,type) {
		if(type && type=='btn'){
			$scope.currentPage=1;
			$scope.paginationConf.currentPage=1;
		}
		var params = {
			currentPage : index,
			pageSize : $scope.pageSizeCode
		};
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
			url : '../admin/getDirectOrderList',
			params : params,
			rolling:true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.orderList = res.data.resultSet;
				if (vm.orderList.length > 0) {
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				} else {
					$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
				}
			} else {
				console.log(res.data);
			}
		});
	};
	
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
						targetStatus : parseInt(vm.editStatus.orderStatus)
					}
					var postValue = {
						url : '../admin/updateDirectOrderByHand',
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
							targetStatus : parseInt(vm.editStatus.orderStatus),
							remark : vm.editStatus.remark
						}
						var postValue = {
							url : '../admin/updateDirectOrderByHand',
							params : params
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								$("#editModal").modal("hide");
								order.status = vm.editStatus.orderStatus;
								order.remark =vm.editStatus.remark;
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

});
