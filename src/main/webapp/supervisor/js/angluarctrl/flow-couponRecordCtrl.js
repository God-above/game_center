/**
 * 兑换记录方法
 * 
 */
flowApp.controller('couponRecordCtrl', function($scope,$rootScope,$location,$HttpService) {
	
	var vm = $scope.vm = {};
	
	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型	
	$scope.pageSizeCode = 10;// 每页展示多少条数
	
	// 初始化加载
	vm.init = function() {
		window.scrollTo(0, 0);
		//导航样式,防刷新
		$rootScope.getSign(8,3);
		vm.getEnums();
		
	};
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	vm.couponRecordBtn($scope.paginationConf.currentPage);
            }
        };
	
	vm.getEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'consumeRecordStatus'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.couponStatus = res.data.resultBody;
				angular.identity();
			}
		});
	}
	
	/*
	 * 根据枚举过滤状态
	 */
	vm.getStatusStr = function(statu) {
		for ( var i = 0; i < vm.couponStatus.length; i++) {
			if (statu == vm.couponStatus[i].code) {
				return vm.couponStatus[i].name;
			}

		}
	};

	vm.couponRecordBtn =function(index,type){
		/**
		 * ---------------流量卡批次兑换明细查询 --------------------
		 * exchangeBatchNo : '兑换批次号'
		 * couponNo : "流量卡号
		 * consumeStartDate : 消费开始时间
		 * consumeEndDate : 消费结束时间
		 * status : '状态'
		 * currentPage : 1
		 * pageSize : 5
		 * @return
		 */
		if(type && type=='btn'){
			$scope.currentPage=1;
			$scope.paginationConf.currentPage=1;
		}
		var params={
				currentPage:index,
				pageSize:$scope.pageSizeCode
		};
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
			params["consumeStartDate"] = startTime;
		}
		if (endTime) {
			params["consumeEndDate"] = endTime;
		}
		//exchangeBatchNo 兑换批次号
		if ($scope.exchangeBatchNo) {
			params['exchangeBatchNo'] = $scope.exchangeBatchNo;

		}
		if ($scope.couponNo) {
			params['couponNo'] = $scope.couponNo;

		}
		if ($scope.status) {
			params['status'] = $scope.status;

		}
		
		var postValue={
				url:'../coupon/queryCouponRecordDetail',
				params:params,
				rolling:true
		};
		$scope.rememberFJ=params;
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode=='1'){
				vm.couponRecordList=res.data.resultBody;
				if(vm.couponRecordList && vm.couponRecordList.length>0){
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！",2000);
				}
			}else{
				console.log(res.data);
			}
		});
	};
	
	/*-----------------------------------------修改兑换记录状态--------------------------------*/
	vm.editStatus=function(coupon){
		$("#editModal").modal("show");
		vm.editStatus.orderStatus ="";
		vm.editStatus.remark ="";
		vm.editStatus.updateOrderStatus = function() {
			if (vm.editStatus.orderStatus) {
				if (vm.editStatus.orderStatus == 4) {
					var params = {
						recordNo : coupon.recordNo,
						targetStatus : parseInt(vm.editStatus.orderStatus)
					}
					var postValue = {
						url : '../admin/updateCouponOrderByHand',
						params : params
					};
					$HttpService.post(postValue).then(function(res) {
						if (res.data.resultCode == '0') {
							$("#editModal").modal("hide");
							coupon.status = vm.editStatus.orderStatus;
							coupon.statusText="消费成功";
							$rootScope.showToast("处理成功", 2000);
						}
					});
				} else {
					if (vm.editStatus.remark) {
						var params = {
							recordNo : coupon.recordNo,
							targetStatus : parseInt(vm.editStatus.orderStatus),
							remark : vm.editStatus.remark
						}
						var postValue = {
							url : '../admin/updateCouponOrderByHand',
							params : params
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								$("#editModal").modal("hide");
								coupon.status = vm.editStatus.orderStatus;
								coupon.statusText="消费失败";
								coupon.remark =vm.editStatus.remark;
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
	};
});
