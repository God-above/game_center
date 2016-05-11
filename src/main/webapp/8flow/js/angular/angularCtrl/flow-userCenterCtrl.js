flowApp.controller('userCenterController', function($rootScope, $scope,
		$cookieStore, $location, $HttpService) {
	var vm = $scope.vm = {};// 用户函数方法集合
	vm.phonePay = $scope.phonePay = {};// 充值
	vm.totalPrice = 0;
	vm.tabContent = 0;
	vm.userInfo;
	vm.historyParams;
	$scope.currentPage=1;
	$scope.pageSize=10;
	// 页面初始化进行加载的方法
	vm.getUser = function() {
		vm.getUserInfo();// 获取用户信息
		// vm.getOrder(params);//默认获取订单信息
		
		vm.showTab(0);
	}
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	if (vm.historyParams) {
					 vm.historyParams.params.currentPage=$scope.paginationConf.currentPage;
					if (vm.tabContent == 2) {
						vm.getBackOrder(vm.historyParams);
					} else {
						vm.getOrder(vm.historyParams);
					}
				} else {
					$scope.paginationConf.currentPage = 1;
					vm.showTab(0);
				}
            }
     };

	// 获取用户信息
	vm.getUserInfo = function() {
		var params = {}
		var postValue = {
			url : '../user/getUserInfo',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == "0") {
				// 用户内容放入.vm.userInfo
				vm.userInfo = res.data.resultBody;
				vm.getUserBlance();

			} else {
				$rootScope.showToast("获取用户信息失败", 3000);
				window.location = './login.html'
			}

		});
	}
	// 获取用户余额
	vm.getUserBlance = function() {
		var params = {}
		var postValue = {
			url : '../user/getBalance',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == "0") {
				// 用户内容放入.vm.userInfo
				vm.userInfo.balance = res.data.resultBody.balance;

			} else {
				$rootScope.showToast("获取用户信息失败", 3000);
			}

		});
	}

	// 用户跳转
	vm.goTel = function(obj) {
		if (obj == undefined) {
			$location.path("setChangeType/bindTel");
		} else {
			$location.path("changeType/tel");
		}
	};
	// 用户跳转
	vm.goMail = function(obj) {
		if (obj == undefined) {
			$location.path("setChangeType/bindEmail");
		} else {
			$location.path("changeType/email");
		}
	};
	
	vm.gofor=function(obj,type){
		if(type==0){
			window.open('./index.html#orderSingleDetail/'+obj);	
		}else if(type==1){
			window.open('./index.html#orderDetail/'+obj);
			
		}
			
	}
	// 点击商品获取价格和修改样式
	vm.getValue = function(pro, obj) {
		vm.totalPrice = pro.price / 100;
		$scope.selectedRow = obj;
		vm.phonePayDetail = pro;
		$scope.showTelSpan=false;
		$scope.showTelMsg="";
	};

	// 手机充值接口
	vm.phonePay = function() {
		if (vm.productList == undefined) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="请输入手机号码";
	    	return;
		}else if (vm.phonePayDetail == undefined) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="请选择商品";
			return;
		}else{
			$scope.showTelSpan=false;
			$scope.showTelMsg="";
		}
		var params = {
			rechargeAccount : $scope.phoneNum,
			productNo : vm.phonePayDetail.productNo,
			count : 1
		}
		var postValue = {
			url : '../order/createOrder',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == "0") {
				var blackBg = document.getElementById("blackBg");
				blackBg && document.body.removeChild(blackBg);
				var orderId = res.data.resultBody.orderNo;
				// 带着ID跳转
				$location.path('confirmOrder/0/' + orderId)
			}

		});

	}

	// 手机号码输入验证获取相应商品
	vm.yPhone = function(obj) {
		$scope.showTelSpan=false;
		$scope.showTelMsg="";
		var myreg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
		// 验证手机规则成功返回对应商品list
		if (myreg.test(obj) && obj.length == 11) {
			var params = {
				phoneNum : obj
			}
			var postValue = {
				url : '../product/queryParByIsp',
				params : params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == "1") {
					vm.productList = res.data.resultBody;

				}

			});
		} else {
			$scope.showTelSpan=true;
			$scope.showTelMsg="请输入合法的手机号码";
			vm.productList = undefined;
			vm.totalPrice=0;;
		}

	}

	// 跳转方法 page是路由地址,params是参数 参数可以默认为0
	vm.skip = function(page, params) {
		if (params == "0") {
			$location.path(page);
		} else {
			$location.path(page);
		}
	}
	// 显示tab内容
	vm.showTab = function(count) {
		$scope.currentPage=1;
		$scope.paginationConf.currentPage=1;
		// 获取tabMain 调用不同的订单
		var beginTime=getBeforeDate(7)+" 00:00:00";
		var endTime=getNowFormatDate();
		
		vm.tabContent=count;
		if (count == 0) {
			// 流量卡订单
			var params = {
				currentPage : $scope.currentPage,
				pageSize : $scope.pageSize,
				buyStartDate:beginTime,
				buyEndDate:endTime,
				rolling : true
			}
			var postValue = {
				url : '../coupon/queryCouponBatchAndOrders',
				params : params
			};
			console.log(params);
			vm.getOrder(postValue);

		} else if (count == 1) {
			// 手机直充订单
			var params = {
				beginTime:beginTime,
				endtime:endTime,
				currentPage : 1,
				pageSize : 10
			}
			var postValue = {
				url : '../order/orderPage',
				params : params
			};
			console.log(params);
			vm.getOrder(postValue);

		} else if (count == 2) {
			// 退卡订单

		}
	}

	// 默认获取订单信息 流量卡订单
	vm.getOrder = function(params) {
		console.log(params);
		$HttpService.post(params).then(function(res) {
			if(vm.tabContent==1){
				if (res.data.resultCode == "0") {
					$scope.singleOrder = res.data.resultSet;
					vm.historyParams = params;
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				}
			}else if(vm.tabContent==0){
				if (res.data.resultCode == "1") {
					vm.historyParams = params;
					vm.batchOrder= res.data.resultBody.orderList;
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				}else{
					vm.batchOrder = [];
				}
		   }
		});

	};

	vm.state = function(obj) {
		if (obj) {
			if(obj	==	10){
				delete vm.historyParams.params['status'];
				vm.historyParams.params['statusArr'] = [10,12];
			}else{
				delete vm.historyParams.params['statusArr'];
				vm.historyParams.params['status'] = obj;
				
			}
			
		}
		vm.getOrder(vm.historyParams);
	};
	

	//流量卡   状态
	vm.cardState = function(index) {
		$scope.currentPage=1;
		vm.historyParams = null;
		var params = {
			currentPage : $scope.currentPage,
			pageSize : $scope.pageSize,
			rolling : true
		};
		
		params["state"] = index;
		
		var postValue = {
			url : '../coupon/queryCouponBatchAndOrders',
			params : params
		};
		//console.log(postValue);
		vm.getOrder(postValue);
	};
	
	
	
	
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
	
	
	//关闭 未支付的订单
	$scope.closeOrder = function(batch,orderArray){
		var couponBatchNo = batch.orderId;
		//console.log(couponBatchNo+'---'+orderArray.length);
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
								batch.status = 60;
								batch.statusText = '已取消';
							}
						}
					}else{
						$rootScope.showToast(res.data.resultComment, 3000);
					}
			});
		}
	};
	
	//立即退款
	$scope.rowPay = function(orderArray){
		//console.log('立即退款,批次编号:'+orderArray[0].orderNo);
		if(confirm("确认为该订单执行退款操作吗？")){
			var orderNoArray = [];
			if(orderArray){
				for(var i = 0; i < orderArray.length; i++){
					if(orderArray[i].status == 32){
						orderNoArray[i] = orderArray[i].orderNo;
					}
				}
			}
			
			for(var i = 0; i < orderNoArray.length; i++){
					var postValue = {
						url : '../coupon/refundCouponOrder',
						params : {orderNo : orderNoArray[i]}
					};
					
					$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == 0) {
								for(var i = 0; i < orderArray.length; i++){
									if(orderArray[i].status == 32){
										orderArray[i].statusText = '处理失败,已退款';
										orderArray[i].status = 41;
									}
								}
							}else{
								console.log(postValue.params.orderNo+'-退款失败！--'+res.data.resultMsg);
							}
					});
			}
		}
	};
	
	//已付款  但生成卡密失败   重新生成
	$scope.reCreate = function(orderArray){
		if(confirm("确认为该订单重新生成券记录吗？")){
			var orderNoArray = [];
			if(orderArray){
				for(var i = 0; i < orderArray.length; i++){
					if(orderArray[i].status == 32){
						orderNoArray[i] = orderArray[i].orderNo;
					}
				}
			}
			for(var i = 0; i < orderNoArray.length; i++){
				var postValue = {
						url : '../coupon/refundCreateCoupon',
						params : {orderNo : orderNoArray[i]}
					};
					
					$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == 1) {
								for(var i = 0; i < orderArray.length; i++){
									if(orderArray[i].status == 32){
										orderArray[i].statusText = '重新生成中';
										orderArray[i].status = 30;
									}
								}
							}else{
								console.log(postValue.params.orderNo+'-重新生成失败！--'+res.data.resultComment);
							}
					});
			}
		}
		
	};
	//关闭充值
	$scope.popupClose=function(){
		$scope.phoneNum="";
		vm.productList=undefined;
		$scope.showTelSpan=false;
		vm.totalPrice="";
	}
});

function getBeforeDate(n){
	var s;
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
            if(mon>1) {
               mon=mon-1;
            }
           else {
             year = year-1;
             mon = 12;
             }
           }
          d.setDate(d.getDate()-n);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();
     s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
     return s;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}