flowApp.controller('orderDetailController', function($rootScope, $scope,
		$cookieStore,$HttpService,$routeParams) {
	var vm = $scope.vm = {};// 订单详情
	vm.payMentState;
	vm.init=function(){
		vm.getOrderEnum('paymentStatus',1);//获取支付枚举
		vm.getOrder();
		vm.payOrder();
		
	}; 
	
	//获取订单状态
	vm.getOrderEnum	=function(val,tp){
		var params ={
				name:val				
		}
		var postValue = {
				url : '../order/getEnums',
				params:params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					if(tp==0){
						vm.orderState = res.data.resultBody;
					}else if(tp==1){
						vm.payMentState	= res.data.resultBody;	
					}else if(tp==2){
						vm.assetFlowState	= res.data.resultBody;				
					}else if(tp==3){
						vm.assetFlowType	= res.data.resultBody;				
					}
				} 
			});
	};
	
	vm.getOrder=function(){
		
		var params = {
				couponBatchNo : $routeParams.orderId,
				rolling :true
		}
		var postValue = {
			url : '../coupon/queryCouponBatchAndOrders',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == 1) {
					vm.batchOrder= res.data.resultBody.orderList;
					
				}
		});
	}
	vm.rechangepayMent=function(obj){
		if(vm.payMentState != undefined){
		for(var i=0 ;i < vm.payMentState.length;i++){
			if(vm.payMentState[i].code ==	obj){
				return vm.payMentState[i].description;
			}
			
		}
		}
	}
	
	vm.payOrder=function(){
		
		var params = {
				couponBatchNo : $routeParams.orderId
		}
		var postValue = {
			url : '../coupon/queryCouponBatchAndOrdersDetail',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
					//console.log(res.data);
				if (res.data.resultCode == 0) {
					vm.payOrderList= res.data.resultBody;
					vm.paymentInfo=res.data.paymentList;//支付订单
				}
		});
	}
	
	//关闭 未支付的订单
	$scope.closeOrder = function(batch,orderArray){
		var couponBatchNo = batch.orderId;
	//	console.log(couponBatchNo+'---'+orderArray.length);
		if(confirm("确认取消该订单吗？")){
			var orderNoArray = [];
			if(orderArray){
				for(var i = 0; i < orderArray.length; i++){
					if(orderArray[i].status == 10){
						orderNoArray[i] = orderArray[i].orderNo;
					}
				}
			}
		
			var postValue = {
				url : '../order/cancelCouponOrder',
				params : {couponBatchNo : couponBatchNo,orderNoArray : orderNoArray}
			};
			
			$HttpService.post(postValue).then(function(res) {
					if (res.data.resultCode == 1) {
						for(var i = 0; i < orderArray.length; i++){
							if(orderArray[i].status == 10){
								orderArray[i].statusText = '已取消';
								orderArray[i].status = 60;
								batch.status = 6;
								batch.statusText = '已取消';
							}
						}
					}else{
						$rootScope.showToast(res.data.resultComment, 3000);
					}
			});
		}
		
	};
});
