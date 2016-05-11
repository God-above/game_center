flowApp.controller('batchOrderDetailController', function ($rootScope,$scope,$HttpService,$routeParams) {
	$scope.searchParams={};
	$scope.currentPage = 1;
	var vm = $scope.vm = {};
	var vmList = $scope.vmList = {};

	//初始化订单明细
	$scope.batchDetailInit=function(){
		$scope.getOrderStatus();//订单状态
		$scope.btnSearch();//默认查询
		$scope.batchDetailNav();//导航
	};
	
	
	
	//搜索查询
	$scope.btnSearch=function(){
		$scope.currentPage = 1;
		var startCreateTime = $('#start_time').val();
		var endCreateTime = $('#end_time').val();
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
		var params={
				currentPage:1,
				pageSize:10,
				batchNo:$routeParams.batchNo
		}
		
		if($scope.searchInfo){
			params["searchInfo"]=$scope.searchInfo;
		}
		if($scope.status){
			params["status"]=$scope.status;
		}
		if(startCreateTime){
			params["beginTime"]=startCreateTime;
		}
		if(endCreateTime){
			params["endTime"]=endCreateTime;
		}
		$scope.searchParams=params;
		var postValue={
				url:'../order/orderPage',
				params:params,
				rolling : true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$scope.pageInfo=res.data.pageInfo;
				$scope.orderList=res.data.resultSet;
				if($scope.orderList.length>0){
					if($scope.pageInfo!=undefined){
						$scope.totalPage = $scope.pageInfo.totalPage;
						$scope.createPages();
					}
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
				}
				
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
			console.log(res);
		});
		
	};
	
	
	
	/**
	 * ==========================================================工具方法
	 */
	$scope.getOrderStatus=function(){
		
		var postValue={
				url:'../order/getEnums',
				params:{
					name:'orderStatusCode'
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.status=='200'){
				console.log(res.data);
				$scope.statusList=res.data.resultBody;
			}else{
				console.log(res.data);
			}
		});
	}
	//批次订单导航
	$scope.batchDetailNav = function() {
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(5).addClass("active");
	}
	//过滤状态
	$scope.parseStatus=function(status){
		for(var i=0;i<$scope.statusList.length;i++){
			if($scope.statusList[i].code==status){
				return $scope.statusList[i].description;
			}
		}
	};
	
	//分页跳转
	$scope.switchPagePrize=function(index){
		if ($scope.currentPage == index) {
			if(index==1){
				$rootScope.showToast("已经是首页", 2000);
				return;
			}
			if(index==$scope.totalPage){
				$rootScope.showToast("已经是末页", 2000);
				return;
			}
			return;
		}
		if(index==undefined||index > $scope.totalPage){
			$rootScope.showToast("请输入正确的页码", 2000);
			return;
		}
		if (!index) {
			$scope.currentPage = 1;
		} else {
			$scope.currentPage = index;
		}
		params=$scope.searchParams;
		params["currentPage"]=index;
		$scope.currentPage = index;
		var postValue={
				url:'../order/orderPage',
				params:params,
				rolling:true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.status=='200'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.orderList=res.data.resultSet;
				$scope.createPages();
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
			
		});
	};
	
	
	
	//创建分页	
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
