flowApp.controller('couponController', function($rootScope,$scope, $cookieStore,
		$HttpService,$location,$routeParams) {

	$scope.initCoupconList = function() {
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(6).addClass("active");
	};

	$scope.initProduct = function() {
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(7).addClass("active");
		
		//获取商品列表
		var postValue={
				url:'../product/productList',
				params:{
					type:parseInt(2),
					status:parseInt(1)
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.status=='200'){
				$scope.productList=res.data.resultBody;
			}else{
				console.log(res.data);
			}
		});

	};

	/*
	 * 确认购买
	 */
	$scope.addCoupon=function(){
		var postValue={
				url:'../order/createOrder',
				params:{
					productNo:$scope.product.productNo,
					count:$scope.payCount
				}
		};
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode==0){
				$scope.orderInfo=res.data.resultBody;
				$rootScope.showToast(res.data.resultComment, 2000);
				$location.path("confirmOrder/"+$scope.orderInfo.orderNo+"/coupon/default");
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
	};
	
	
	//搜索查询
	$scope.btnSearch=function(){
		$scope.currentPage = 1;
//		var startCreateTime = $('#start_time').val();
//		var endCreateTime = $('#end_time').val();
//		if (startCreateTime != undefined
//				&& startCreateTime != ""
//				&& endCreateTime != undefined
//				&& endCreateTime != "") {
//			var sDate = new Date((startCreateTime).replace(
//					/-/g, "/"));
//			var eDate = new Date((endCreateTime).replace(/-/g,
//					"/"));
//			if (sDate > eDate) {
//				$rootScope.showToast("开始时间不能大于结束时间", 2000);
//				return;
//			}
//		}
		var params={
				currentPage:1,
				pageSize:10
		};
		
		if($scope.keyword){
			params["searchInfo"]=$scope.keyword;
		}
//		if($scope.accountType){
//			params["accountType"]=$scope.accountType;
//		}
//		if($scope.productType){
//			params["productType"]=$scope.productType;
//		}
//		if($scope.status){
//			params["status"]=$scope.status;
//		}
//		if(startCreateTime){
//			params["beginTime"]=startCreateTime;
//		}
//		if(endCreateTime){
//			params["endTime"]=endCreateTime;
//		}
		$scope.searchParams=params;
		var postValue={
				url:'../ticket/getTbTicketListByUserIdPage',
				params:params,
				rolling : true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.status=='200'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.productList=res.data.resultSet;
				$scope.createPages();
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
		
	};
	
	/*---------------------------------------------------------分页start------------------*/
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
				url:'../ticket/getTbTicketListByUserIdPage',
				params:params,
				rolling:true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.status=='200'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.productList=res.data.resultSet;
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
	/*---------------------------------------------------------页面跳转end------------------*/
	
	
	/*
	 * 显示总价
	 */
	$scope.showPrice = function(product,payCount) {
		if(product&&payCount){
			$scope.totalPrice=product.price*payCount;
		}else{
			$scope.totalPrice="---";
		}
	};
	
	//选中商品事件  显示商品价格
	$scope.changeProduct=function(product){
		if (product != null) {
			$scope.price = product.price;
		} else {
			$scope.price = "0.00";
		}
	};
	
	
	/*--------------------------------------------------优惠券充值------------------*/
	//初始化充值
	$scope.initRecharge=function(){
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(8).addClass("active");
		
		var tickNo=$routeParams.tickNo;
		var pwd=$routeParams.pwd;
		if(tickNo && tickNo!='default' && pwd && pwd!='default'){
			$scope.userPwd=pwd;
			$scope.userCode=tickNo;
		}
		
		
		
	};

	$scope.addRecharge=function(){
		var params={
				 ticketNo:$scope.userCode ,  //券号
				 password : $scope.userPwd,  //密码
				 receiver:$scope.rechargeAccount //    充值账号
		};
		var postValue={
				url:'../ticket/useTicket',
				params:params,
				rolling : true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$rootScope.showToast(res.data.resultComment, 2000);
				$location.path('coupon');
				console.log(res.data);
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
	};


});
