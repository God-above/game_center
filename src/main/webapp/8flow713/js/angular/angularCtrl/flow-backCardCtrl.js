flowApp.controller('backCardController', function($rootScope, $routeParams,$scope,$cookieStore,$HttpService,$location) {
	var vm = $scope.vm = {};// 退卡
	vm.productNo = $routeParams.productNo || '';
	vm.productName = $routeParams.productName || '';
	vm.couponBatchNo = $routeParams.couponBatchNo || '';
	
	//确认 退卡
	$scope.confirmBack = function(){
		$scope.orders = [];
		for(var i = 0; i < vm.backInfo.backCardList.length; i++){
			var backOrder = vm.backInfo.backCardList[i];
			if(backOrder.backCount < 0){
				$rootScope.showToast("退卡数量必须大于0",2000);
				return;
			}
			
			if(!backOrder.backCount){
				continue;
			}
			console.log(vm.backInfo.backCardList[i]);
			console.log(vm.backInfo.backCardList[i].orderNo);
			var obj = {
			}
			obj["orderNo"] = backOrder.orderNo;
			obj["price"] =  backOrder.price;
			obj["canBackCount"] =  backOrder.canBackCount;
			obj["backCount"] =  backOrder.backCount;
			obj["backMoney"] =  backOrder.price * backOrder.backCount;
			obj["batchCode"] =  backOrder.batchCode;
//			$scope.orders[i].orderNo = backOrder.orderNo;
//			$scope.orders[i].price = backOrder.price;
//			$scope.orders[i].canBackCount = backOrder.canBackCount;
//			$scope.orders[i].backCount = backOrder.backCount;
//			$scope.orders[i].backMoney = backOrder.price * backOrder.backCount;
//			$scope.orders[i].batchCode = backOrder.batchCode;
			$scope.orders.push(obj);
		}
		
		if($scope.orders && $scope.orders.length == 0){
			$rootScope.showToast("请填写退卡数量",2000);
			return;
		}
		var params = {
			productNo : vm.productNo,
			productName : vm.productName,
			orders : $scope.orders,
			backMoney : vm.totalMoneyss
		};
		
		var postValue = {
				url : '../coupon/createBackCardBatchAndOrder',
				params : params,
				rolling : true
			};
			$HttpService.post(postValue).then(function(res) {
				if(res.data.resultCode == 1){
					var backBatchNo = res.data.resultBody;
					if(backBatchNo){
						//跳转  退卡详细 订单页
						$location.path("/confirmOrder/2/"+backBatchNo);
					}else{
						$rootScope.showToast(res.data.resultComment,2000);
					}
				}else{
					$rootScope.showToast("调用创建退卡批次和订单返回:"+res.data.resultComment,2000);
				}
			});
	};
	
	$scope.init = function(){
		var params = {
			productNo : vm.productNo,
			productName : vm.productName,
			couponBatchNo : vm.couponBatchNo
		}
		
		var postValue = {
				url : '../coupon/backCardQuery',
				params : params,
				rolling : true
			};
			$HttpService.post(postValue).then(function(res) {
				//console.log(res.data.resultBody);
				if(res.data.resultCode == 1){
					vm.backInfo = res.data.resultBody;
				}
			});
		
	}
	
	vm.changeCount = function(backCardOrder){
		if(backCardOrder){
			if(backCardOrder.canBackCount < backCardOrder.backCount ){
				$rootScope.showToast("退卡数量必须小于或等于可退数量",2000);
				return;
			}
			
			if(backCardOrder.backCount != undefined && backCardOrder.backCount<=0){
				$rootScope.showToast("请输入有效的退卡数量",2000);
				return;
			}
		}
		
		vm.totalCount = 0;
		vm.totalMoney = 0;
		for(var i = 0; i < vm.backInfo.backCardList.length; i++){
				var backOrder = vm.backInfo.backCardList[i];
				if(backOrder.backCount){
					vm.totalCount = backOrder.backCount + vm.totalCount; 
					vm.totalMoney = vm.totalMoney + backOrder.backCount * backOrder.price / 100;
				}
		}
		
	};
	
});
