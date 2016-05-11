flowApp.controller('buyCardController', function($rootScope, $scope,
		$cookieStore,$HttpService,$location,$route) {
	var vm = $scope.vm = {};//除购物车外函数方法集合
	var pm = $scope.pm = {};// 记录单一商品信息
	var cart= $scope.cart = {}; //购物车中需要的函数方法集合
	vm.buyCarList = new Array();
	$scope.currentPage=1;
	$scope.pageSize=10
	
	;// 储存本地购物车
	$scope.count = 1;// 初始化数量
	$scope.totalPrice = "0";// 初始化总价
	$scope.allPrice = "0";// 最后计算总价
	$scope.sValue = "0";// 记录商品单价
	$scope.sName = "";// 记录商品名称
	// 默认首次进入加载的方法，加载商品信息
	vm.buyCarInit = function() {
		//console.log(vm.productList)
	}

	// 更换运营商替换商品
	vm.getOperator = function(str) {
		var isp = 0; 
		pm={};
		$scope.selectedRow=undefined;
		if (str == "yd") {
			isp = 1;
			$('#yd').css("border-color","#2797cf");
			$('#lt').css("border-color","#E7E7E7");
			$('#dx').css("border-color","#E7E7E7");
		} else if (str == "lt") {
			isp = 3;
			pm={};
			$('#lt').css("border-color","#2797cf");
			$('#yd').css("border-color","#E7E7E7");
			$('#dx').css("border-color","#E7E7E7");
		} else if (str == "dx") {
			isp = 2;
			$('#dx').css("border-color","#2797cf");
			$('#lt').css("border-color","#E7E7E7");
			$('#yd').css("border-color","#E7E7E7");
		}
		
		var postValue = {
				url : '../product/queryParByIsp',
				params : {
					isp : isp
				},
				rolling : true
			};
			$HttpService.post(postValue).then(function(res) {
				//console.log(res.data);
				if(res.data.resultCode == 1){
					vm.productList = res.data.resultBody;
				}
			});
	}

	// 选择商品获取价格和名称以及总价,用于显示在选择表
	vm.getValue = function(pro,obj) {
		//console.log(pro);
		$scope.selectedRow = obj;
		pm.sValue = pro.price;// 单价
		pm.sName = pro.productName;// 全称
		pm.sId = pro.productNo;// 商品ID
		pm.totalPrice = pro.price * $scope.count / 100;// 商品总价格
	}

	// 过略特殊字符
	vm.inValue = function() {
		//
		var pattern = /^([0-9]+)$/;
		if (pattern.test($scope.count)) {
			$scope.totalPrice = pm.sValue * $scope.count / 100;
		} else {
			$scope.count = $scope.count.replace(/\D/g, '');
			$scope.totalPrice = pm.sValue * $scope.count / 100;
		}
	}
	// 购物车中输入框验证
	$scope.inValue=function(obj){
		var pattern = /^([0-9]+)$/;
		if (pattern.test(obj.count)) {
		} else {
			obj.count = obj.count.replace(/\D/g, '');
		}
	}
	
	// 添加商品
	vm.addList = function() {
		var params = {};
		if (pm.sName) {
			params['name'] = pm.sName;
		} else {
			$rootScope.showToast("请选择商品！",2000);
			return;
		}
		if ($scope.count) {
			params['count'] = $scope.count;
		} else {
			$rootScope.showToast("请选择商品数量！",2000);
			return;
		}
		if(vm.buyCarList.length>=10){
			$rootScope.showToast("每次最多能选择10个商品！",2000);
			return;
		}
		params['price'] = pm.sValue;
		params['productId'] = pm.sId;
		if (vm.buyCarList.length > 0) {
			for ( var i = 0; i < vm.buyCarList.length; i++) {
				if (pm.sId == vm.buyCarList[i].productId) {
					vm.buyCarList[i].count = parseInt(vm.buyCarList[i].count)
							+ parseInt($scope.count);
					vm.buyCarList[i].totalPrice = pm.sValue
							* vm.buyCarList[i].count / 100;
					move();
					return;
				}
			}
			params['count'] = $scope.count;
			params['totalPrice'] = pm.sValue * $scope.count / 100;
			vm.buyCarList.push(params);
			move();
		} else {
			params['totalPrice'] = pm.sValue * $scope.count / 100;
			vm.buyCarList.push(params);
			move();
		}
	}
	
	
	// 单一商品计算总价
	vm.totalSingle = function() {
		var total = 0;
		if(pm.sValue){
			total = pm.sValue * $scope.count / 100;
			return total;
		}else{
			return total;
		}
		

	}
	// 购物车单一商品总价计算
	$scope.b_totalPrice = function(obj) {
		var total = 0;
		total = obj.price * obj.count / 100
		return total;
	}

	
	// 计算购物车里总价
	$scope.totalCart = function() {
		var total = 0;
		for ( var i = 0; i < vm.buyCarList.length; i++) {
			total = total + vm.buyCarList[i].price * vm.buyCarList[i].count
					/ 100
		};
		return total;
	}

	// 购物车单一商品数量减少
	vm.minCount = function(obj) {
		if(obj.count > 1 ){
			obj.count = obj.count - 1;
		}else{		
		}
	}
	// 购物车单一商品数量增加
	vm.addCount = function(obj) {
		obj.count = parseInt(obj.count) + 1;
	}
	
	// 删除
	vm.del = function(obj) {
		for ( var i = 0; i < vm.buyCarList.length; i++) {
			if (obj.name == vm.buyCarList[i].name) {
				vm.buyCarList.splice(i, 1);
			}
		};
	}
	// 结算
	vm.orderBuy = function() {
		// $scope.totalCart() 总价
		// vm.buyCarList 购买list
		
		if(vm.buyCarList.length > 10){
			$rootScope.showToast("每次最多能选择10个商品", 3000);
			return;
		}
		
		if (vm.buyCarList.length > 0) {
			
			var postValue = {
					url : '../coupon/createBuyCouponOrder',
					params : {
						orders : vm.buyCarList
					},
					rolling : true
				};
				$HttpService.post(postValue).then(function(res) {
					if(res.data.resultCode == 1){
						var couponBatchNo = res.data.resultBody.number;
						$location.path('confirmOrder/1/'+couponBatchNo);
						//console.log(couponBatchNo);
					}else{
						$rootScope.showToast(res.data.resultComment, 3000);
					}
		});
		  console.log(vm.buyCarList);
		} else {
			// 数据不全时候不做处理
		}	
	}

});

function move() {

}
