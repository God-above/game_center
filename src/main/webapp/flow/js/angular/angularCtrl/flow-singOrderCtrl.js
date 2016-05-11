flowApp.controller('singleOrderController', function ($rootScope,$scope,$HttpService,$location) {
	var vm = $scope.vm = {};
	var vmList = $scope.vmList = {};
	$scope.searchParams={};  //记录搜索条件
	$scope.currentPage = 1;
	/*------------------------------------------------单订单查询 start-------------------*/	
	//初始化单订单查询 
	$scope.initSingleOrder=function(){
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(3).addClass("active");
		getStatusEnums();
	};
	// 获取状态列表
	var getStatusEnums=function(){
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
	//搜索查询
	$scope.btnSearch=function(type){
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
				pageSize:10
		};
		
		if($scope.keyword){
			params["searchInfo"]=$scope.keyword;
		}
		if($scope.accountType){
			params["accountType"]=$scope.accountType;
		}
		if($scope.productType){
			params["productType"]=$scope.productType;
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
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.orderList=res.data.resultSet;
				if($scope.orderList.length>0){
					$scope.createPages();
				}else{
					if(type && type=='1'){
						$rootScope.showToast("无符合当前搜索条件的结果！", 2000);
					}
				}
				
			}else if(res.data.resultCode=='1201'){
				$rootScope.showToast(res.data.resultComment,2000);
				window.location.href="./login.html";
			} else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
			console.log(res);
		});
		
	};
	//解析列表中的状态
	$scope.parseStatus=function(status){
		for(var i=0;i<$scope.statusList.length;i++){
			if($scope.statusList[i].code==status){
				return $scope.statusList[i].description;
			}
		}
	};
	/*------------------------------------------------单订单查询end-------------------*/
	/*------------------------------------------------创建订单start-------------------*/
	$scope.init = function(){
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(1).addClass("active");
		$scope.lookCode=true;
		getStatusEnums();
		$('#productName').attr('disabled','disabled');//初始化商品不可选

	};
	//单订单充值
	$scope.addRecharge=function(){
		if($scope.rechargeAccount==undefined || $scope.rechargeAccount==null || $scope.rechargeAccount==null){
			return;
		}
		//count:   数量（int）
		var postValue={
				url:'../order/createOrder',
				params:{
					rechargeAccount:$scope.rechargeAccount,
					productNo:$scope.product.productNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode==0){
				$scope.orderInfo=res.data.resultBody;
				$rootScope.showToast("创建订单成功！", 2000);
				$location.path("confirmOrder/"+$scope.orderInfo.orderNo+"/single/single");
			}else if(res.data.resultCode=='1201'){
				$rootScope.showToast(res.data.resultComment,2000);
				window.location.href="./login.html";
			} else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
	};

	
	//监听手机号事件
	$scope.getProductByAccount=function(){
		if($scope.rechargeAccount==undefined || $scope.rechargeAccount==null || $scope.rechargeAccount=='' || $scope.rechargeAccount.length!=11){
			$scope.productList="";
			$('#productName').attr('disabled','disabled');
			return;
		}
		
		$scope.product="";
		$('#productName').removeAttr('disabled');
		var postValue={
				url:'../order/productQualification',
				params:{
					rechargeAccount:$scope.rechargeAccount,
					type:parseInt(1),
					status:parseInt(1)
				}
		};
		$HttpService.post(postValue).then(function(res){
			console.log(res);
			if(res.data.resultCode==0){
				$scope.productList=res.data.resultBody;
			}else if(res.data.resultCode=='1201'){
				$rootScope.showToast(res.data.resultComment,2000);
				window.location.href="./login.html";
			} else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
	};
	
	//选中商品事件  显示商品价格
	$scope.changeProduct=function(product){
		if (product != null) {
			$scope.price = product.price;
		} else {
			$scope.price = "0.00";
		}
	};
	/*------------------------------------------------创建订单end-------------------*/
	
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
			}else if(res.data.resultCode=='1201'){
				$rootScope.showToast(res.data.resultComment,2000);
				window.location.href="./login.html";
			} else{
				$rootScope.showToast(res.data.resultComment);
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
	
	//查看账户余额
	$scope.getEncryptCode=function(){
		$scope.getCode=true;
		$scope.lookCode=false;
		$scope.hideCode=true;
	};
	//隐藏采购信息
	$scope.hide=function(){
		$scope.getCode=false;
		$scope.lookCode=true;
		$scope.hideCode=false;
	};

});

