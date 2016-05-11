/**
 * 批次注入方法
 * 
 */
flowApp.controller('couponBatchOrderCtrl', function($scope,$rootScope,$location,$HttpService) {
	
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
	
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	vm.batchBtn($scope.paginationConf.currentPage);
            }
        };
	/*---------------------------------------------------------*/
	vm.getEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'couponBatchStatusAndBatchOrderStatus'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				vm.orderStatus = res.data.resultBody;
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
	/**
     * 查询流量卡订单
     *
     * 非必填参数:
     * searchInfo           - 搜索内容(String), 订单号/商品编号/商品名称/充值账号
     * status               - 状态(int)
     * beginTime     	    - 开始时间(String)
     * endTime       	    - 结束时间(String)
     * currentPage          - 当前页(int), 默认为1
     * pageSize             - 每页数据条数(int), 默认为10
     *
     * @return
     */
	vm.batchBtn =function(index,type){
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
			params["beginTime"] = startTime;
		}
		if (endTime) {
			params["endTime"] = endTime;
		}
		if ($scope.searchContent) {
			params['searchInfo'] = $scope.searchContent;

		}
		if ($scope.status) {
			params['status'] = $scope.status;

		}
		
		var postValue={
				url:'../admin/getCouponOrderList',
				params:params,
				rolling:true
		};
		$scope.rememberFJ=params;
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode=='0'){
				vm.batchList=res.data.resultSet;
				if(vm.batchList.length>0){
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
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
});
