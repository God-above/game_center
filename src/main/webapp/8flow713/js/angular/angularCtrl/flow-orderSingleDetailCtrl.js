flowApp.controller('orderSingleDetailController', function($rootScope, $scope,
		$cookieStore,$HttpService,$routeParams) {
	var vm = $scope.vm = {};// 订单详情
	vm.orderState;
	vm.payMentState;
	vm.assetFlowState;
	vm.assetFlowType;
	
	vm.init=function(){
		vm.getOrderEnum('orderStatusCode',0);//获取订单枚举类
		vm.getOrderEnum('paymentStatus',1);//获取支付枚举
		vm.getOrderEnum('assetFlowStatus',2);//获取退款枚举
		vm.getOrderEnum('assetFlowType',3);//获取支付枚举
		vm.getOrder();
	}
	
	
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
	
	
	

	
	//获取订单数据 	
	vm.getOrder	=function(){
		var params ={
				orderNo:$routeParams.orderId				
		}
		var postValue = {
				url : '../order/getOrderDetail',
				params:params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					var dataList = res.data.resultBody;
					vm.orderInfo=dataList.order;//订单详情
					vm.paymentInfo=dataList.paymentList;//支付订单
					//console.log(vm.paymentInfo);
					vm.refundInfo=dataList.refundFlowList;//退款订单
					//console.log(vm.refundInfo);
				}
			});
		
	};
	
	
	vm.rechangeOrder=function(obj){
		if(vm.orderState != undefined){
			for(var i=0 ;i < vm.orderState.length;i++){
				if(vm.orderState[i].code ==	obj){			
					return vm.orderState[i].description;
				}
				
			}	
		}
		
		
	}
	vm.canelOrder=function(order){
		if(confirm("确认取消当前订单吗？")){
			var postValue = {
					url : '../order/cancelDirectOrder',
					params : {orderNo:order.orderNo}
				};
				
				$HttpService.post(postValue).then(function(res) {
						if (res.data.resultCode == 0) {
							order.statusStr = "已取消";
							order.status = 60;
						}else{
							$rootScope.showToast(res.data.resultComment, 3000);
						}
				});
			
		}
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
	
	vm.rechangerefund=function(obj){
		if(vm.assetFlowState != undefined){
		for(var i=0 ;i < vm.assetFlowState.length;i++){
			if(vm.assetFlowState[i].code ==	obj){
				return vm.assetFlowState[i].description;
			}
			
		}
		}
	}
	
	vm.rechangeFlowType=function(obj){
		if(vm.assetFlowType != undefined){
		for(var i=0 ;i < vm.assetFlowType.length;i++){
			if(vm.assetFlowType[i].code ==	obj){
				return vm.assetFlowType[i].description;
			}
			
		}
		}
	}
});
