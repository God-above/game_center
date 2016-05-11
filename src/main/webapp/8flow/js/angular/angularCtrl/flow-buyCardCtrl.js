flowApp.controller('buyCardController', function($rootScope, $scope,
		$cookieStore,$HttpService,$location,$route) {
	var vm = $scope.vm = {};//除购物车外函数方法集合
	var pm = $scope.pm = {};// 记录单一商品信息
	var cart= $scope.cart = {}; //购物车中需要的函数方法集合
	vm.tabContent = 1;
	vm.buyCarList = new Array();
	$scope.currentPage=1;
	$scope.pageSize=10;// 储存本地购物车
	$scope.count = 1;// 初始化数量
	$scope.totalPrice = "0";// 初始化总价
	$scope.allPrice = "0";// 最后计算总价
	$scope.sValue = "0";// 记录商品单价
	$scope.sName = "";// 记录商品名称
	$scope.mproList=[];//混合包商品
	vm.ydProList="";
	vm.dxProList="";
	vm.ltProList="";
	$scope.selectedRow1,$scope.selectedRow2,$scope.selectedRow3=undefined;
	
	// 默认首次进入加载的方法，加载商品信息
	vm.buyCarInit = function() {
		
		//console.log(vm.productList)
	}
	vm.showTab = function(count) {
		vm.tabContent=count;
		$scope.selectedRow=undefined;
		
		//$scope.count=1;
		pm.sValue = "";// 单价
		pm.sName = "";// 全称
		pm.sId = "";// 商品ID
		pm.totalPrice = "";// 商品总价格
		isp = 0;
		vm.productList=undefined;
		if(count==2){
			if(!!!vm.ydProList){
				vm.getProductList(1);
			}
			if(!!!vm.dxProList){
				vm.getProductList(2);
			}
			if(!!!vm.ltProList){
				vm.getProductList(3);
			}
		}
		
	};
	vm.getProductList=function(type){
		var postValue = {
				url : '../product/queryParByIsp',
				params : {
					isp : type
				},
				rolling : true
			};
			$HttpService.post(postValue).then(function(res) {
				if(res.data.resultCode == 1){
					if(type==1){
						vm.ydProList=res.data.resultBody;
					}else if(type==2){
						vm.dxProList=res.data.resultBody;
					}else if(type==3){
						vm.ltProList=res.data.resultBody;
					}
				}
			});
	};
	// 更换运营商替换商品
	vm.getOperator = function(str,type) {
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
	
	vm.getValue = function(pro,obj,type) {
		
		pm.sName = pro.productName;// 全称
		pm.sValue = pro.price;// 单价
		pm.totalPrice = pro.price * $scope.count / 100;// 商品总价格
		
		if(type=='yd' || type=='lt' || type=='dx'){
			if(type=='yd'){
				$scope.selectedRow1=obj;
			}else if(type=='lt'){
				$scope.selectedRow2=obj;
			}else if(type=='dx'){
				$scope.selectedRow3=obj;
			}
			vm.getPrice();
			getProName();
		}else{
			$scope.selectedRow = obj;
			pm.sId = pro.productNo;// 商品ID
		}
	}
	
	var price1="";
	var price2="";
	var price3="";
	
	var productId1="";
	var productId2="";
	var productId3="";
	
	var proname1="";
	var proname2="";
	var proname3="";
	
	//商品名称  商品id
	var getProName=function(){
		
		proname1= $scope.selectedRow1!=undefined ? vm.ydProList[$scope.selectedRow1].productName: '';
		proname2= $scope.selectedRow2!=undefined ? vm.ltProList[$scope.selectedRow2].productName: '';
		proname3= $scope.selectedRow3!=undefined ? vm.dxProList[$scope.selectedRow3].productName: '';
		
		productId1= $scope.selectedRow1!=undefined ? vm.ydProList[$scope.selectedRow1].productNo: '';
		productId2= $scope.selectedRow2!=undefined ? vm.ltProList[$scope.selectedRow2].productNo: '';
		productId3= $scope.selectedRow3!=undefined ? vm.dxProList[$scope.selectedRow3].productNo: '';
		
		pm.sName =proname1+","+proname2+","+ proname3 ;
		pm.sId=productId1+","+productId2+","+ productId3 ;
	};
	//最高价格
	vm.getPrice=function(){
		price1= $scope.selectedRow1!=undefined ? vm.ydProList[$scope.selectedRow1].price : "";
		price2= $scope.selectedRow2!=undefined ? vm.ltProList[$scope.selectedRow2].price : "";
		price3= $scope.selectedRow3!=undefined ? vm.dxProList[$scope.selectedRow3].price : "";
		var max=Math.max(price1,price2,price3);
		pm.sValue=max;
		return max;
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
		//console.log("tab========"+vm.tabContent);
		var params = {};
		
		if(vm.tabContent==2){
			var newList=pm.sName.split(",");
			var proNames="";
			for(var i=0;i<newList.length;i++){
				if(!!newList[i]){
					proNames+=newList[i]+",";
				}
			}

			if(proNames.lastIndexOf(",")==proNames.length-1){
				pm.sName=proNames.substring(0, proNames.length-1);
			}else{
				pm.sName=proNames;
			}
			if(pm.sName.split(",").length==1){
				$rootScope.showToast("至少选择两个商品！",2000);
				return;
			}
			//console.log(pm.sName);
			
			var pIdList=pm.sId.split(",");
			var pIdStrs="";
			for(var i=0;i<pIdList.length;i++){
				if(!!pIdList[i]){
					pIdStrs+=pIdList[i]+",";
				}
			}
			if(pIdStrs.lastIndexOf(",")==pIdStrs.length-1){
				pm.sId=pIdStrs.substring(0, pIdStrs.length-1);
			}else{
				pm.sId=pIdStrs;
			}
		}
		
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
					$scope.move();
					return;
				}
			}
			params['count'] = $scope.count;
			params['totalPrice'] = pm.sValue * $scope.count / 100;
			vm.buyCarList.push(params);
			move();
			$scope.move();
		} else {
			params['totalPrice'] = pm.sValue * $scope.count / 100;
			vm.buyCarList.push(params);
			move();
			$scope.move();
		}
		$scope.selectedRow1=undefined;
		$scope.selectedRow2=undefined;
		$scope.selectedRow3=undefined;
		proname1, proname2, proname3=undefined;
		productId1,productId2,productId3=undefined;
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
		$scope.move();
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
	};
	
	$scope.move=function(){
		pm.sName = "";// 全称
		pm.sId = "";// 商品ID
		$scope.selectedRow1=undefined;
		$scope.selectedRow2=undefined;
		$scope.selectedRow3=undefined;
		proname1, proname2, proname3=undefined;
		productId1,productId2,productId3=undefined;
		pm.sValue="0";
	
		$(".face_value2 li").removeClass("selected");
	}

});

function move() {

}
