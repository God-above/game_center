/**
 * 用户流水
 * 
 */
flowApp.controller('userFlowController', function($scope, $rootScope,
		$HttpService,$timeout) {

	var vm = $scope.vm = {};

	$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.rememberFJ = ""; // 记录分页的条件

	// 初始化加载
	vm.init = function() {
		// 导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(10, 13);
		vm.getEnums();
		vm.getUserType();
		vm.getUserFlowType();
	};
	
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	console.log($scope.rememberFJ);
            	vm.orderBtn($scope.paginationConf.currentPage);
            }
        };
	
	/**
     * 查询用户流水列表
     *
     * 非必填参数:
     * searchInfo           - 搜索内容(String), 流水号/商品订单号/支付订单号/退款批次号/用户编号
     * status               - 状态(int)
     * type                 - 类型(int)
     * flowAssetType        - 资金类型(int)
     * startAmount          - 最小金额(int), 以分为单位
     * endAmount            - 最大金额(int), 以分为单位
     * startCreateTime     	- 创建时间起始值(String)
     * endCreateTime       	- 创建时间结束值(String)
     * currentPage          - 当前页(int), 默认为1
     * pageSize             - 每页数据条数(int), 默认为10
     *
     * @return
     */
	/*
	 * 查询结果
	 */
	vm.orderBtn = function(index,type) {
		if(type && type=='btn'){
			index=1;
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
			params["startCreateTime"] = startTime;
		}
		if (endTime) {
			params["endCreateTime"] = endTime;
		}
		if ($scope.searchInfo) {
			params['searchInfo'] = $scope.searchInfo;

		}
		if ($scope.status) {
			params['status'] = $scope.status;

		}
		if ($scope.flowType) {
			params['flowAssetType'] = $scope.flowType;

		}
		if ($scope.userType) {
			params['type'] = $scope.userType;
		}
		
//		if ($scope.sortType) {
//			params['sortType'] = $scope.sortType;
//
//		}
		if ($scope.beginPrice) {
			params['startAmount'] = $scope.beginPrice;

		}
		if ($scope.endPrice) {
			params['endAmount'] = $scope.endPrice;

		}
		$scope.rememberFJ = params;
		var postValue = {
			url : '../admin/getAssetFlowList',
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
	 * 获取用户资金状态
	 */
	vm.getEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'assetFlowStatus'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.orderStatus = res.data.resultBody;
			}
		});
	}
	//用户资金类型
	vm.getUserType=function(){
		var postValue = {
				url : '../order/getEnums',
				params : {
					name : 'assetType'
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					vm.userTypeList = res.data.resultBody;
				}
			});
	};
	//资金流水类型
	vm.getUserFlowType=function(){
		var postValue = {
				url : '../order/getEnums',
				params : {
					name : 'assetFlowType'
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					vm.flowTypeList = res.data.resultBody;
				}
			});
	};
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
	vm.getTypeStr = function(type) {
		if(vm.userTypeList){
			for ( var i = 0; i < vm.userTypeList.length; i++) {
				if (type == vm.userTypeList[i].code) {
					return vm.userTypeList[i].description;
				}

			}
		}
		
	};
	vm.getFlowTypeStr = function(flowType) {
		if(vm.flowTypeList){
			for ( var i = 0; i < vm.flowTypeList.length; i++) {
				if (flowType == vm.flowTypeList[i].code) {
					return vm.flowTypeList[i].description;
				}

			}
		}
		
	};
});
