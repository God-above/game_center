flowApp.controller('accountMagController', function($rootScope, $scope,
		$cookieStore,$location,$HttpService) {
	$scope.currentPage=1;
	$scope.pageSize=10;
	
	$scope.historyParams;
	$scope.init=function(){
		//获取用户信息
		$scope.getUserInfo();
		//获取流水表
		$scope.btnSeach();
		//查询账户余额
		$scope.getUserBalance();
	};
	
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	$scope.btnSeach($scope.paginationConf.currentPage);
            }
     };
	/*-------------------------------------批次查询  start-------------------------------------*/
	//查询按钮
	$scope.btnSeach=function(index){
		var params={
				currentPage:index,
				pageSize:10
		};
		if($scope.searchContent){ 
			params["searchContent"]=$scope.searchContent;
		}
		var startCreateTime = $('#o_start_time').val();
		var endCreateTime = $('#o_end_time').val();
		if (startCreateTime != undefined
				&& startCreateTime != ""
				&& endCreateTime != undefined
				&& endCreateTime != "") {
			var sDate = new Date((startCreateTime).replace(
					/-/g, "/"));
			var eDate = new Date((endCreateTime).replace(/-/g,
					"/"));
			if (sDate > eDate) {
				$rootScope.showToast("开始时间不能大于结束时间", 2000);
				return;
			}
		}
		if(startCreateTime || endCreateTime){
			params["startCreateTime"]=startCreateTime+" 00:00:00";
			params["endCreateTime"]=endCreateTime+" 23:59:59";
		}
		var postValue={
				url:'../order/getAssetFlowList',
				params:params
		};
		$scope.historyParams=postValue;
		$scope.currentPage = 1; 
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.orderList = res.data.resultSet;
				$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
			} else {
				console.log(res.data);
			}
		});
	};
	//$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.btnSeach($scope.historyParams));
	/*-------------------------------------批次查询 end-------------------------------------*/
	
	//获取用户信息
	$scope.getUserInfo=function(){
		
		var postValue = {
			url : '../user/getUserInfo'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == "0") {
				//用户内容放入.vm.userInfo
				$scope.userInfo = res.data.resultBody;
			} else {
				$rootScope.showToast("获取用户信息失败",2000);
				window.location='./login.html';
			}

		});
	};

	
	//查询账户余额
	$scope.getUserBalance=function(){
		var postValue2={
				url:'../user/getBalance'
		};
		$HttpService.post(postValue2).then(function(res){
			if(res.data.resultCode=='0'){
					$scope.userInfo.balance=res.data.resultBody.balance;

			}else{
				console.log(res.data);
			}
		});
	};
});

