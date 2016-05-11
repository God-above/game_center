flowApp.controller('confirmPayController', function($rootScope, $scope,$HttpService,
		$cookieStore,$location,$routeParams) {

	var selectType="";
	$scope.hisOrderList="";
	$scope.balance="";
	//$scope.resultType="";

	// 0 ：单冲  1：批量购卡  2：退卡 
	$scope.init=function(){
		
		var type=$routeParams.type;
		$scope.resultType=$routeParams.resultType;
		if(type && type=='0'){
			$scope.getOrderInit();
			getStatusEnums();
		}else if(type && type=='1'){
			$scope.getBatchOrder();
		}else if(type && type=='2'){
			//console.log("退卡");
		}else{
			
		}
		$scope.getUserInit();
	};
	
	/*----------------------------手机单充---------------------------*/
	$scope.getOrderInit=function(){
		var postValue={
				url:'../order/getOrderInfo',
				params:{
					orderNo :$routeParams.couponBatchNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== '0'){
				$scope.getBalance();
				$scope.orderInfo = res.data.resultBody;
				$scope.orderPrice=$scope.orderInfo.totalPrice;
				$scope.searchHistory();
				if($scope.orderInfo.status!='10' && $scope.orderInfo.status!='12'){
					$("#sucSpan").show();
				}else{
					$("#failSpan").show();
				}
			}else{
				console.log(res.data);
			}
		});
	};
	
	/*------------------------批量购券------------------------------*/
	
	//初始化确认订单信息
	$scope.getBatchOrder=function(){
		
		var postValue={
				url:'../coupon/queryByCouponBatchNo',
				params:{
					couponBatchNo :$routeParams.couponBatchNo
				}
		};
		getCouponStatusEnums();
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				$scope.getBalance();
				$scope.batch = res.data.resultBody.batch;
				$scope.orderPrice=$scope.batch.totalPrice;
				$scope.orderList=res.data.resultBody.orderList;
				if($scope.batch.status=='2' || $scope.batch.status=='1' ){//支付中
					$scope.searchHistory();
				}
				if($scope.batch.status!='2' && $scope.batch.status!='3'){
					$("#failSpan").show();
				}else{
					$("#sucSpan").show();
				}
			}else{
				console.log(res.data);
			}
		});
	};
	
	/*-------------------------------------批次查询  start-------------------------------------*/
	
	
	/*-------------------------------------批次查询 end-------------------------------------*/


	/*-------------------------------------确认支付 start----------------------------------------*/

	//选择支付方式
	var payInfo = [];// 选择的支付类型
	$scope.changePayType = function(id,balance,totalPrice,payPwd) {
		if(id=='2'){ //支付宝支付
			$scope.okPic2=true;//显示勾选框
			$scope.okPic1=false;//显示勾选框
			selectType='2';
			payInfo = [ {
				payType : 10,
				amount : totalPrice
			} ];
		}else if(id=='1' && payPwd!='false'){  //余额支付
			if(balance>totalPrice){
				$scope.okPic1=true;//显示勾选框
				$scope.okPic2=false;//显示勾选框
				selectType='1';
				payInfo = [ {
					payType : 2,
					amount : totalPrice
				} ];
			}
		}else if(id=='1'){
			if(!payPwd  || payPwd=='false' ){
				$rootScope.showToast("您还未设置支付密码！",2000);
			}
		}
	};
	//验证支付方式
	$scope.open=function(){
		if(!selectType){
			$rootScope.showToast("至少选择一种支付方式！",2000);
			return;
		}else if (selectType=='1'){
			$("#myModal").modal("show");
		}else if(selectType=='2'){
			$scope.confirmOrder();
			$("#myModal3").modal("show");
		}
	};
	//确认支付  验证支付密码输入是否正确
	$scope.okPay=function(payPwd){
	
		$scope.showAlert = false;//隐藏错误信息
		if (!payPwd) {
			$rootScope.showToast("请输入支付密码", 2000);
			return;
		}
		//验证支付密码是否正确
		var postValue = {
				url : '../user/verifyPayPassword',
				params:{
					payPassword:payPwd
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#myModal").modal("hide");
					$scope.confirmOrder();
					//支付密码验证成功   扣除金额
				}else if(res.data.resultCode=='4908'){//验证支付密码错误
					$scope.payPwd = "";
					$scope.showAlert = true;//显示错误信息
					$scope.inputCount = res.data.resultBody;
					
				} else if(res.data.resultCode=='6032' || res.data.resultCode=='1201'){
					$rootScope.showToast(
							"连续输入密码超过限制，请重新登录",
							2000);
					window.location = "./login.html";
				}else{
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	// 确认支付
	$scope.confirmOrder = function(orderNo, type) {
		var type=$routeParams.type;
		var orderNo=$routeParams.couponBatchNo;
		//console.log(payInfo);
		var params = {
			payInfo : angular.fromJson(payInfo)
		};
		if (type && type == '0') {
			params["orderNo"] = orderNo;
		} else if (type && type == '1') {
			params["couponBatchNo"] = orderNo;
		}
		var postValue = {
			url : '../payment/multiple_pay',
			params : params
		};
		$HttpService.post(postValue).then(
				function(res) {
					if (res.data.resultCode == 0) {
						$('#myModal').modal("hide");
						$scope.payResultBtn();//跳转到支付结果
					} else if (res.data.resultCode == 2) {
						$scope.payResultBtn();//跳转到支付结果

						$('#myModal').modal("hide");
					} else if (res.data.resultCode == '6030') {
						var resUrl = res.data.resultBody;
						$('#myModal3').modal("show");
						
						window.open(resUrl);
					}else if (res.data.resultCode == '4002') {
						$scope.payResultBtn();//跳转到支付结果
					} else {
						$rootScope.showToast(
								res.data.resultComment, 2000);
					}

				});
	};
	
	//关闭 未支付的订单 批次订单
	$scope.closeOrder = function(batchNo){
		if(confirm("确认取消该订单吗？")){
			var orderNoArray = [];
			if($scope.orderList){
				for(var i = 0; i < $scope.orderList.length; i++){
					if($scope.orderList[i].status == 10){
						orderNoArray[i] = $scope.orderList[i].orderNo;
					}
				}
			}
		
			var postValue = {
				url : '../order/cancelCouponOrder',
				params : {couponBatchNo : batchNo,orderNoArray : orderNoArray}
			};
			
			$HttpService.post(postValue).then(function(res) {
					if (res.data.resultCode == 1) {
						$rootScope.showToast("已取消该订单", 2000);
					}else{
						$rootScope.showToast(res.data.resultComment, 2000);
					}
					console.log(res.data);
			});
		}
		
	};
	
	//支付遇到问题
	$scope.payQusBtn=function(){
		$('#myModal3').modal("hide");
		$scope.init();
	};
	//支付完成
	$scope.payResultBtn=function(){
		var orderNo = $routeParams.couponBatchNo;
		var type = $routeParams.type;

		$location.path("payResult/default/" + type + "/" + orderNo);
	};

	/*-----------------------------------确认支付 end-------------------------------*/
	/*---------------------------------------获取所有的支付订单 start----------------*/
	
	$scope.searchHistory = function() {
		var type = $routeParams.type;
		var orderNo=$routeParams.couponBatchNo;

		var params = {};
		if (type && type == '0') {
			params["orderNo"] = orderNo;
		} else if (type && type == '1') {
			params["couponBatchNo"] = orderNo;
		}
		var postValue = {
			url : '../payment/get_payment_list',
			params : params
		};
		//getStatusEnums();
		$HttpService
				.post(postValue)
				.then(
						function(res) {
							if (res.data.resultCode == '0') {
								$scope.hisOrderList = res.data.resultSet;
								
							} else {
								$rootScope.showToast(
										res.data.resultComment,
										2000);
							}
						});
	};
	//继续支付
	$scope.continuePayPwd=function(){
		var type = $routeParams.type;
		var orderNo=$routeParams.couponBatchNo;
		var payNoInfo = [];
		for (var i = 0; i < $scope.hisOrderList.length; i++) {
			if ($scope.hisOrderList[i].status == '1') {
				var payNo = $scope.hisOrderList[i].paymentNo;
				payNoInfo.push(payNo);
			}
		}
		var params = {
			paymentNoSet : angular.fromJson(payNoInfo)
		};
		if (type && type == '0') {
			params["orderNo"] = orderNo;
		} else if (type && type == '1') {
			params["couponBatchNo"] = orderNo;
		}
		var postValue = {
			url : '../payment/continue_pay',
			params : params
		};
		$HttpService.post(postValue).then(
				function(res) {
					if (res.data.resultCode == 0) {
						$rootScope.showToast(
								res.data.resultComment, 2000);
						$('#myModal').modal("hide");
					} else if (res.data.resultCode == '6030') {
						var resUrl = res.data.resultBody;
						$('#myModal3').modal("show");
						window.open(resUrl);
					} else {
						$rootScope.showToast(
								res.data.resultComment, 2000);
					}
				});
	};
	/*---------------------------------------获取未支付的支付订单 end----------------*/
	
	
	/*------------------------------------支付结果 start--------------------------------*/
	$scope.initResult=function(){
		
	};
	
	/*-------------------------------------支付结果end--------------------------*/
	/*-------------------------------------查询用户信息start-------------------------------------*/
	// 查询用户信息
	$scope.getUserInit = function() {
		// 查询用户信息
		var postValue = {
			url : '../user/getUserInfo'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.userInfo = res.data.resultBody;
			} else {
				console.log(res.data);
			}
		});
		
	};
	$scope.getBalance=function(){
		//查询账户余额
		var postValue2={
				url:'../user/getBalance'
		};
		$HttpService.post(postValue2).then(function(res){
			if(res.data.resultCode=='0'){
					$scope.balance=res.data.resultBody.balance;
						if($scope.balance>$scope.orderPrice){
							$("#type3").hide();
						}else{
							$("#type3").show();
						}
			}else{
				console.log(res.data);
			}
		});
	};
	//返回订单
	$scope.returnOrder=function(){
		$location.path("order");
	};
	//继续完成
	$scope.conturnPayBtn=function(){
		var orderNo = $routeParams.couponBatchNo;
		var type = $routeParams.type;

		$location.path("confirmPay/" + type + "/" + orderNo);
	};
	/*-------------------------------------查询用户信息end-------------------------------------*/
	
	// 获取单订单状态列表
	var getStatusEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'orderStatusCode'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.status == '200') {
				$scope.statusList = res.data.resultBody;
			} else {
				console.log(res.data);
			}
		});
	};
	//获取
	var getCouponStatusEnums=function(){
		var postValue = {
				url : '../order/getEnums',
				params : {
					name : 'couponBatchStatus'
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.status == '200') {
					$scope.couponStatusList = res.data.resultBody;
				} else {
					console.log(res.data);
				}
			});
	};
	// 解析单订单列表中的状态
	$scope.parseStatus = function(status) {
		if($scope.statusList && $scope.statusList.length>0){
			for (var i = 0; i < $scope.statusList.length; i++) {
				if ($scope.statusList[i].code == status) {
					return $scope.statusList[i].description;
				}
			}
		}
	};
	// 解析批次订单列表中的状态
	$scope.parseCouponStatus = function(status) {
		if($scope.couponStatusList && $scope.couponStatusList.length>0){
			for (var i = 0; i < $scope.couponStatusList.length; i++) {
				if ($scope.couponStatusList[i].code == status) {
					return $scope.couponStatusList[i].description;
				}
			}
		}
	};
});

