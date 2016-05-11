var flowApp = angular.module('flowApp',['ngRoute','ngCookies','$HttpService','ui.bootstrap']);//注入插件服务
var SUCCESS = 1;
var FAILURE = -1;
var FAILURE_NETWORK = -2;

flowApp.run(function($rootScope,$http,$timeout){
	// 全局toast 提示框
	$rootScope.DIALOG_TOAST = false;
	$rootScope.DIALOG_TOAST_TITLE = "";
	// 显示 全局提示框
	$rootScope.showToast = function(text, time) {
		$rootScope.DIALOG_TOAST = true;
		$rootScope.DIALOG_TOAST_TITLE = text;
		$timeout($rootScope.hideToast, time);
	};
	// 隐藏全局提示框
	$rootScope.hideToast = function() {
		$rootScope.DIALOG_TOAST = false;
		$rootScope.DIALOG_TOAST_TITLE = "";
	};
	/**
	 *  上传  文件
	 *  jsonData = [
	 *  	[{ key : '', value : ''}]
	 *  
	 *  ]
	 */
	$rootScope.upload = function($jsonData,$url,$callback){
		console.log('upload'+$jsonData.length);
		var data;
		var formData = new FormData();
		for(var i = 0; i < $jsonData.length; i++){
			console.log($jsonData.length);
			if(angular.isArray($jsonData[i])){
				for(var j = 0; j < $jsonData[i].length; j++){
					console.log('key:'+$jsonData[i][j].key+'-value:'+$jsonData[i][j].value);
					formData.append($jsonData[i][j].key,$jsonData[i][j].value);
				}
			}
		}
		
		var xhr = new XMLHttpRequest();

		xhr.open("post", $url, true);

		xhr.onload = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				data =  eval("(" + xhr.responseText + ")");
				$callback(data);
			}
		};
		
		xhr.send(formData);
		
	};
});

flowApp.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/index',{
		templateUrl : 'tlps/ng-index.html'    //首页
	}).when('/singleRecharge',{
		templateUrl : 'tlps/ng-singleRecharge.html', 		//单个充值
		controller : 'singleOrderController'
	}).when('/singleOrder',{
		templateUrl : 'tlps/ng-singleOrder.html', 			//单订单管理
		controller:'singleOrderController'
	}).when('/editUser',{
		templateUrl : 'tlps/ng-editUser.html', 				//用户密码修改
		controller:'editUserController'
	}).when('/batchRecharge',{								
		templateUrl : 'tlps/ng-batchRecharge.html',			//批次充值
		controller : 'batchRecharegeController'
	}).when('/batch',{
		templateUrl : 'tlps/ng-batchOrder.html',			//批次订单查询
		controller : 'batchOrderController'
	}).when('/batchDetail/:batchNo',{
		templateUrl : 'tlps/ng-batchOrderDetail.html',		//批次明细查询
		controller : 'batchOrderDetailController'
	}).when('/confirmOrder/:orderNo/:type/:status',{
		templateUrl : 'tlps/ng-orderConfirm.html',  //确认订单
		controller:'orderController'
	}).when('/orderDetail/:orderNo/:type',{
		templateUrl : 'tlps/ng-orderDetail.html',  //订单详情
		controller:'orderController'
	}).when('/coupon',{
		templateUrl : 'tlps/ng-coupon.html',  //优惠券
		controller:'couponController'
	}).when('/couponRecharge/:tickNo/:pwd',{
		templateUrl : 'tlps/ng-couponRecharge.html',  //优惠券充值
		controller:'couponController'
	}).when('/couponBuy',{
		templateUrl : 'tlps/ng-couponBuy.html',  //购券
		controller:'couponController'
	}).when('/setPayType/:type',{
		templateUrl : 'tlps/ng-setPayType.html',  //设置支付方式
		controller:'setController'
	}).when('/resultMsgEmail/:msg',{
		templateUrl : 'tlps/ng-failEmail.html',  //邮箱验证失败
		controller:'setController'
	}).when('/bindEmail',{
		templateUrl : 'tlps/ng-bindEmail.html',  //绑定邮箱
		controller:'setController'
	}).when('/userSet',{
		templateUrl : 'tlps/ng-setting.html',  //用户设置
		controller:'setController'
	}).when('/setPayPwd/:userCode/:encryptCode',{
		templateUrl : 'tlps/ng-setPayPwd.html',  //设置支付密码
		controller:'setController'
	}).otherwise({
		templateUrl : 'tlps/ng-error.html'
	});
});


//左侧菜单
flowApp.directive('commonMenu', function() {
    return {
    	templateUrl: 'tlps/menu/common-menu.html',
        replace: true,
        restrict: 'EA'
    };
});

//分页
flowApp.directive('expander',function(){
	return {
		restrict:'EA',
		replace:true,
		transclude:true,
		$scope:{title:'=expanderTitle'},
		template:'	<ul class="pagination">\
			<li ng-show="currentPage > 1">\
			<a ng-click="switchPagePrize(1)" class="gopage">首页</a></li>\
			<li ng-show="currentPage ==1 || currentPage < 1">\
				<span class="nopage">首页</span>\
			</li>\
			<li><a ng-click="switchPagePrize(currentPage-1)"\
				class="gopage" ng-show="currentPage > 1">上一页</a></li>\
			<li><span ng-show="currentPage ==1 || currentPage < 1"\class="nopage">上一页</span>\</li>\
			<li ng-class="{\'active\':page.value==currentPage}" style=""\
				ng-repeat="page in pages" class="gopage"><a\
				ng-click="switchPagePrize(page.value)">{{page.value}}</a></li>\
			<li><a ng-click="switchPagePrize(currentPage+1)"\
				class="gopage" ng-show="currentPage < totalPage">下一页</a></li>\
			<li><span ng-show="currentPage==totalPage" class="nopage">下一页</span></li>\
			<li><a ng-click="switchPagePrize(totalPage)" class="gopage"\
				ng-show="currentPage < totalPage">末页</a></li>\
			<li><span ng-show="currentPage==totalPage" class="nopage">末页</span></li>\
			<li style="float: left;">&nbsp;共&nbsp;{{totalPage}}&nbsp;页&nbsp;到\
				<input type="number" ng-model="pageNumber" model-format=int\
				value="1" min="1" max={{totalPage}}>&nbsp;页\
				<button class="btn btn-xs  btn-primary" style="position: relative"\
					ng-click="switchPagePrize(pageNumber)">确定</button>\
			</li>\
		</ul>',
		link:function(scpoe, element,attrs){
			
		}
	}
});
/*
 * 密码重复验证
 */
flowApp
		.directive(
				"repeat",
				[ function() {
					return {
						restrict : 'A',
						require : "ngModel",
						link : function(scope, element, attrs, ctrl) {
							if (ctrl) {
								var otherInput = element
										.inheritedData("$formController")[attrs.repeat];

								var repeatValidator = function(value) {
									var validity = value === otherInput.$viewValue;
									ctrl.$setValidity("repeat", validity);
									return validity ? value : undefined;
								};

								ctrl.$parsers.push(repeatValidator);
								ctrl.$formatters.push(repeatValidator);

								otherInput.$parsers.push(function(value) {
									ctrl.$setValidity("repeat",
											value === ctrl.$viewValue);
									return value;
								});
							}
						}
					};
				} ]);
//表单校验  失去焦点时显示错误信息
flowApp.directive('ngFocus', [ function() {
		var FOCUS_CLASS = "ng-focused";
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ctrl) {
				ctrl.$focused = false;
				element.bind('focus', function(evt) {
					element.addClass(FOCUS_CLASS);
					scope.$apply(function() {
						ctrl.$focused = true;
					});
				}).bind('blur', function(evt) {
					element.removeClass(FOCUS_CLASS);
					scope.$apply(function() {
						ctrl.$focused = false;
					});
				});
			}
		};
	} ]);