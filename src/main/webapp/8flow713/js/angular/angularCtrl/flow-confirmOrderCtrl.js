flowApp.controller('confirmOrderController', function($rootScope, $scope,$HttpService,
		$cookieStore,$location,$routeParams,$route) {
//	$scope.payTypeList=[{price:'1000',typeName:'代金券 ',payType:'1'},{price:'300',typeName:'流量币 ',payType:'2'}];//代金券信息
//	$scope.batchBackList=[{batchNo:'1001',backCount:'10',backPrice:'100',handPrice:'1'},
//	                      {batchNo:'1002',backCount:'30',backPrice:'300',handPrice:'1'},
//	                      {batchNo:'1003',backCount:'0',backPrice:'0',handPrice:'0'}];
	
	$scope.price1=1000;
	$scope.price2=0;
	var singleCouponVm=$scope.singleCouponVm={};
	var batchCouponVm=$scope.batchCouponVm={};
	var backCouponVm=$scope.backCouponVm={};
	
	$scope.isChecked=false;

	// 0 ：单冲  1：批量购卡  2：退卡 
	$scope.init=function(){
		//$route.reload();
		var type=$routeParams.type;
		if(type && type=='0'){
			singleCouponVm.getOrderInit();
		}else if(type && type=='1'){
			batchCouponVm.initOrder();
		}else if(type && type=='2'){
			backCouponVm.initOrder();
		}else{
			
		}
	};
	
	//根据批量退卡批次号  回显订单信息 
	backCouponVm.initOrder = function(){
		var postValue={
				url:'../coupon/queryBackCardBatchAndOrder',
				params:{
					couponBatchNo :$routeParams.couponBatchNo,
					flag : '确认订单那'
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				var orderList = res.data.resultBody.orderList;
				if(orderList){
					backCouponVm.batch = orderList[0];
					backCouponVm.orderList = backCouponVm.batch.orderList; 
				}
				backCouponVm.showSingle=true;
			}else{
				console.log(res.data);
			}
		});
	}
	
	$scope.commitOrder = function(){
		var postValue={
				url:'../coupon/backCard',
				params:{
					couponBatchNo :$routeParams.couponBatchNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				$rootScope.showToast('退卡成功!', 3000);
			}else{
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	
	/*----------------------------手机单充---------------------------*/
	singleCouponVm.getOrderInit=function(){
		var postValue={
				url:'../order/getOrderInfo',
				params:{
					orderNo :$routeParams.couponBatchNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== '0'){
				singleCouponVm.orderInfo = res.data.resultBody;
				singleCouponVm.showSingle=true;
			}else{
				console.log(res.data);
			}
		});
	};
	
	/*------------------------批量购券------------------------------*/
	batchCouponVm.payInit = function(){
		var postValue={
				url:'../coupon/queryByCouponBatchNo',
				params:{
					couponBatchNo :$routeParams.couponBatchNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				$scope.batch = res.data.resultBody.batch;
			}else{
				console.log(res.data);
			}
		});
	};
	
	//初始化确认订单信息   批量购卡
	batchCouponVm.initOrder=function(){
		var postValue={
				url:'../coupon/queryByCouponBatchNo',
				params:{
					couponBatchNo :$routeParams.couponBatchNo
				}
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode== 1){
				batchCouponVm.batch = res.data.resultBody.batch;
				batchCouponVm.orderList=res.data.resultBody.orderList;
			}else{
				console.log(res.data);
			}
		});
	};
	
	/*-------------------------------------批次查询  start-------------------------------------*/
	//查询按钮
	$scope.btnSeach=function(){
		var params={
				currentPage:1,
				pageSizeCode:10
		};
		if($scope.searchContent){
			params["batchInfo"]=$scope.searchContent;
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
			params["startTime"]=startCreateTime;
			params["endTime"]=endCreateTime;
		}
		console.log(params);
	};
	
	/*-------------------------------------批次查询 end-------------------------------------*/

	/*-------------------------------------确认订单 start-------------------------------------*/
	//确认订单
	$scope.confirmOrder=function(){
		//跳转到支付页面
		$location.path("confirmPay/"+$routeParams.couponBatchNo);
	};
	
	//使用流量币 事件
	$scope.countCal=function(count){
		if(!isNaN(count)){
			$scope.price2=parseInt(count)*10;
		}else{
			$rootScope.showToast("请输入正确的数量",3000);
			$scope.userCount="";
		}
	};
	
	//解析应付金额
	$scope.parsePrice=function(price1,price2,totalPrice){
		if($scope.isCheckd){
			//console.log($scope.userCount);
		}
		var payPrice=parseInt(totalPrice)-parseInt(price1)-parseInt(price2);
		return payPrice;
	};
	
	/*-------------------------------------确认订单end-------------------------------------*/
	
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
		//查询账户余额
		var postValue2={
				url:'../user/getBalance'
		};
		$HttpService.post(postValue2).then(function(res){
			if(res.data.resultCode=='0'){
					$scope.userInfo.balance=res.data.resultBody.balance;
					if($scope.userInfo.balance>$scope.batch.totalPrice){
						$("#inlineCheckbox2").attr("disabled", false);
					}
			}else{
				console.log(res.data);
			}
		});
	};
	/*-------------------------------------查询用户信息end-------------------------------------*/
});

