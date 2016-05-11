/**
 * 批次注入方法
 * 
 */
flowApp.controller('backCardController', function($scope, $rootScope,
		$HttpService, $filter) {

	var vm = $scope.vm = {};
	vm.orderList = [];
	$scope.checkBoxBtn = false;

	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.rememberFJ = ""; // 记录分页的条件
	// 初始化加载
	vm.refundInit = function() {
		// 导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(2, 5);
		vm.getEnums();
		
	};
	/*
	 * 选中所有
	 */
	$scope.array = [];

	$scope.chkAll = function() {

		if ($scope.checkBoxBtn) {
			if($scope.array.length>0){
				$scope.array = [];
				for ( var i = 0; i < vm.orderList.length; i++) {
					$scope.array.push(vm.orderList[i].orderNo);
					vm.orderList[i].checked = true;
				}
				
			}else{
				for ( var i = 0; i < vm.orderList.length; i++) {
					$scope.array.push(vm.orderList[i].orderNo);
					vm.orderList[i].checked = true;
				}
				
			}
			

		} else {
			for ( var i = 0; i < $scope.array.length; i++) {
				for ( var y = 0; i < vm.orderList.length; y++) {
					if ($scope.array[i] == vm.orderList[y].orderNo) {
						$scope.array.splice(i, 1);
						vm.orderList[y].checked = false;
					}

				}

			}

		}

	};
	
	$scope.check = function(check, order) {

		if (check == false) {
			$scope.checkBoxBtn = false;
			for ( var i = 0; i < $scope.array.length; i++) {
				if ($scope.array[i] == order.orderNo) {
					$scope.array.splice(i, 1);
					// 防止删除一样的多个数组元素
					break;
				}
			}

		} else if (check == true) {

			$scope.array.push(order.orderNo);		
			var xy = 0;
			for ( var i = 0; i < $scope.array.length; i++) {
				for ( var y = 0; y < vm.orderList.length; y++) {
					if ($scope.array[i] == vm.orderList[y].orderNo) {
						xy++;
						vm.orderList[y].checked = true;
					}

				}
			}

			if (xy == vm.orderList.length) {
				$scope.checkBoxBtn = true;
			}

		}
	};
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	if($scope.rememberFJ){
            		vm.refundBtn($scope.paginationConf.currentPage);
            	}
            }
	};

	
	 /**
     * 查询退卡订单
     *
     * 非必填参数:
     * searchContent            - 搜索内容(String), 商品订单编号/用户编号/商品编号/退卡订单编号
     * startProCount            - 退卡数量起始值(int)
     * endProCount              - 退款数量结束值(int)
     * startBackMoney           - 退款金额起始值(int)
     * endBackMoney             - 退款金额结束值(int)
     * startCreateTime          - 创建时间起始值(int)
     * endCreateTime            - 创建时间结束值(int)
     * currentPage              - 当前页(int), 默认为1
     * pageSize                 - 每页数据条数(int), 默认为10
     *
     * @return
     */
	vm.refundBtn = function(index,type) {
		if(type && type=='btn'){
			$scope.currentPage=1;
			$scope.paginationConf.currentPage=1;
		}
		var params = {
			currentPage : index,
			pageSize : $scope.pageSizeCode,
			status : 40
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
			params["startCreateTime"] = startTime;
		}
		if (endTime) {
			params["endCreateTime"] = endTime;
		}
		if ($scope.searchInfo) {
			params['searchContent'] = $scope.searchInfo;

		}
		if ($scope.userInfo) {
			params['userInfo'] = $scope.userInfo;

		}
		if ($scope.sortType) {
			params['sortType'] = $scope.sortType;

		}
		if ($scope.beginPrice) {
			params['startBackMoney'] = $scope.beginPrice;

		}
		if ($scope.endPrice) {
			params['endBackMoney'] = $scope.endPrice;

		}

		$scope.rememberFJ = params;
		var postValue = {
			url : '../admin/getBackCardOrderList',
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
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
	
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
		};

	};
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
	};

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
});
