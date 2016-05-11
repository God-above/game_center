flowApp.controller('cardMangerController', function($rootScope, $scope,
		$cookieStore,cardMangerData,$location,$HttpService) {
	var vm = $scope.vm = {};// 流量卡方法集合
	var om = $scope.om = {};// tab1参数
	var tm = $scope.tm = {};// tab2参数
	var tatalParams={};//总览
	var detailParams={};//明细
	vm.tabContent = 0; // 初始化tab
	$scope.currentPage=1;
	$scope.pageSize=10;
	//状态信息数据
	vm.list = cardMangerData.list;
	//模拟查询结果数据
//	vm.orderlist = cardList.list;
	
	vm.itemCountext;
	
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	if(vm.tabContent==1){
            		var params = vm.getParamsDetail();
        			params["currentPage"] = $scope.paginationConf.currentPage;
        			vm.getOrderDeial(params);
            	}else{
            		var params = vm.getParams();
        			params["currentPage"] = $scope.paginationConf.currentPage;
        			vm.getOrder(params);
            	}
            	
            }
     };


	// 调用接口获取用户信息以及用户流量卡记录
	vm.getUserCard = function() {
		var postValue={
				url:'../coupon/queryOrderAndMarge',
				params:{
					currentPage : $scope.currentPage ,
					pageSize :$scope.pageSize
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				vm.orderlist = res.data.resultBody.orderList;
				
				$scope.paginationConf.totalItems=res.data.resultBody.pageInfo.totalCount;
			}else{
				vm.orderlist = []
			}
		});
	};
	
	// tab切换
	vm.showTab = function(count,flag) {
		//切换TAB
		vm.tabContent=count;//展示内容
		$scope.currentPage = 1;
		for(var i =0;i < vm.list.length;i++){
			vm.list[i].display = undefined;
		}//清除数组
		//清除选中效果
		vm.itemCountext = undefined;
		
		if(flag){
			return;
		}
		
		if(count == '1'){
			$scope.paginationConf.currentPage = 1;
			$scope.currentPage = 1;
			
			tm.serchContent="";
			$("#tm_startTime").val("");
			$("#tm_endTime").val("");
			
			vm.getOrderDeial(vm.getParamsDetail());
		}else{
			$scope.paginationConf.currentPage = 1;
			om.serchContent="";
			$("#om_startTime").val("");
			$("#om_endTime").val("");
			vm.getOrder(vm.getParams());
		};
	};

	
	// tab切换
	vm.getItem = function(item, id,index) {
		$scope.itemIndex = id;
		$scope.currentPage = 1;
		//第一次点击
		if(item.display == undefined){
			//第一次点击
			for(var i =0;i < vm.list.length;i++){
				if(item.name==vm.list[i].name){
					vm.list[i].display = 0;
				}else{
					vm.list[i].display = undefined;
				}
			}
			
			
			vm.itemCountext = item.count;
		}else if(item.display == 0){
			//顺序修改下
			for(var i =0;i < vm.list.length;i++){
				if(item.name==vm.list[i].name){
					vm.list[i].display = 1;
				}else{
					vm.list[i].display = undefined;
					
				}
				
			}
			vm.itemCountext = item.count;
		}else if(item.display == 1){
			//顺序修改上

			for(var i =0;i < vm.list.length;i++){
				if(item.name==vm.list[i].name){
					vm.list[i].display = 0;
				}else{
					vm.list[i].display = undefined;
				}
				
			}
			vm.itemCountext = item.count;
		}
		
	//	console.log(item);
		if("1" == index){
			vm.getOrder(vm.getParams());
		}
		
		if("2" == index){
			vm.getOrderDeial(vm.getParamsDetail());
		}
		
	};

	vm.getParams = function(){

		var params = {
				searchInfo : om.serchContent,
				currentPage : $scope.currentPage ,
				pageSize :$scope.pageSize
			};

			var startTime =angular.element("#om_startTime").val();
			var endTime = angular.element("#om_endTime").val();
			
			if(startTime){
				params["buyStartDate"] = startTime;
			}
			
			if(endTime){
				params["buyEndDate"] = endTime;
			}
			
			if($scope.itemIndex >= 0 || $scope.itemIndex <= 5){
				var sortItem = vm.list[$scope.itemIndex];
				//1: 综合排序   2:订购数量  3:订购金额  4:消费数量  5:消费金额
				if(sortItem.value == 'zonghe'){
					params["sortType"] = 1;
				}else if(sortItem.value == 'dinggoucount'){
					params["sortType"] = 2;
				}else if(sortItem.value == 'dinggouprice'){
					params["sortType"] = 3;
				}else if(sortItem.value == 'xiaofeicount'){
					params["sortType"] = 4;
				}else if(sortItem.value == 'xiaofeiprice'){
					params["sortType"] = 5;
				}
				
				if(sortItem.display == 0){
					params["sortMethod"] = 'ASC';
				}else if(sortItem.display == 1){
					params["sortMethod"] = 'DESC';
				}
			}
			
			return params;
	};
	
	vm.getParamsDetail = function(){
			var params = {
				searchInfo : tm.serchContent,
				currentPage : $scope.currentPage,
				pageSize : $scope.pageSize
			};

			var startTime =angular.element("#tm_startTime").val();
			var endTime = angular.element("#tm_endTime").val();
			
			if(startTime){
				params["buyStartDate"] = startTime;
			}
			
			if(endTime){
				params["buyEndDate"] = endTime;
			}
			
			if($scope.itemIndex >= 0 || $scope.itemIndex <= 5){
				var sortItem = vm.list[$scope.itemIndex];
				//1: 综合排序   2:订购数量  3:订购金额  4:消费数量  5:消费金额
				if(sortItem.value == 'zonghe'){
					params["sortType"] = 1;
				}else if(sortItem.value == 'dinggoucount'){
					params["sortType"] = 2;
				}else if(sortItem.value == 'dinggouprice'){
					params["sortType"] = 3;
				}else if(sortItem.value == 'xiaofeicount'){
					params["sortType"] = 4;
				}else if(sortItem.value == 'xiaofeiprice'){
					params["sortType"] = 5;
				}
				
				if(sortItem.display == 0){
					params["sortMethod"] = 'ASC';
				}else if(sortItem.display == 1){
					params["sortMethod"] = 'DESC';
				}
			}
			
			return params;
	};
	
	vm.btnSeach = function(type) {
		//总览查询
		//时间
		//搜索内容
		//排序方式
		$scope.paginationConf.currentPage = 1;
		if (type == 'total') {
			var params = vm.getParams();
			params["currentPage"]=1;
			vm.getOrder(params);
		}
		//明细查询
		//时间
		//搜索内容
		//排序方式
		if (type == 'detail') {
			var params = vm.getParamsDetail();
			params["currentPage"]=1;
			vm.getOrderDeial(params);
		}
	};
	
	vm.getOrderDeial = function(params){
		var postValue={
				url:'../coupon/queryOrder',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode == 1){
				vm.orderDetailList = res.data.resultBody;
				$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
			}else{
				vm.orderDetailList = [];
			}
		});
	};
	//用户调用接口
	vm.getOrder =function(params){
		var postValue={
				url:'../coupon/queryOrderAndMarge',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				vm.orderlist = res.data.resultBody.orderList;
				$scope.paginationConf.totalItems=res.data.resultBody.pageInfo.totalCount;
			}else{
				console.log(res.data); 
			}
		});
		
	}
	
	// 下载卡密记录
	vm.downCard = function(order) {

	};
	// 下载消费记录
	vm.downhistory = function(order) {

	};
	
	// 查看批次
	vm.getBatch = function(order) {
		vm.showTab('1',true);
		
		var params ={
				productNo:order.productNo
		};
		
		vm.getOrderDeial(params);
	};

	// 退卡
	vm.backtoCard = function(order) {
		$location.path('backCard/'+order.productNo+'/'+order.productName);
	};
	
	
	// 创建分页和页码

//	$scope.pages = [];
//	$scope.createPages = function() {
//		$scope.pages=[];
//		// 以当前页为中心，向两边扩展
//		var start = $scope.currentPage - 2;
//		var end = $scope.currentPage + 2;
//		// 起点小于1
//		if (start < 1 && $scope.totalPage >= 5) {
//			start = 1;
//			end = 5;
//		}
//		
//		if(start < 1 && $scope.totalPage < 5){
//			start = 1;
//			end = $scope.totalPage;
//		}
//		
//		// 终点大于总页
//		if (end > $scope.totalPage && $scope.totalPage > 5) {
//			end = $scope.totalPage;
//			start = $scope.totalPage - 4;
//		}
//		
//		if (end > $scope.totalPage && $scope.totalPage <= 5) {
//			end = $scope.totalPage;
//			start = 1;
//		}
//		
//		for (start; start <= end; start++) {
//			var j = {
//				value : start,
//				name : start
//			};
//			$scope.pages.push(j);
//		}
//	};
//	
//	
//	// 跳转页面
//	$scope.switchPagePrize = function(index) {
//		if ($scope.currentPage == index) {
//			if (index == 1) {
//				$rootScope.showToast("已经是首页", 2000);
//				return;
//			}
//			if (index == $scope.totalPage) {
//				$rootScope.showToast("已经是末页", 2000);
//				return;
//			}
//		}
//		if (index == undefined || index > $scope.totalPage) {
//			$rootScope.showToast("请输入正确的页码", 2000);
//			return;
//		}
//		if (!index) {
//			$scope.currentPage = 1;
//		} else {
//			$scope.currentPage = index;
//		}
//		
//		//总览列表
//		if(vm.tabContent == 0){
//			var params = vm.getParams();
//			params["currentPage"] = $scope.currentPage;
//			params["pageSize"] = $scope.pageSize;
//			vm.getOrder(params);
//		}else{		//明细列表
//			var params = vm.getParamsDetail();
//			params["currentPage"] = $scope.currentPage;
//			params["pageSize"] = $scope.pageSize;
//			vm.getOrderDeial(params);
//		}
//	};
});
