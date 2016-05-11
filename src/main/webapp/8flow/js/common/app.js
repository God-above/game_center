var flowApp = angular.module('flowApp',['tm.pagination','ngRoute','ngCookies','$HttpService','angularFileUpload']);//注入插件服务
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
		$('#drag').show();
		$timeout($rootScope.hideToast, time);
		
	};
	// 隐藏全局提示框
	$rootScope.hideToast = function() {
		$('#drag').hide();
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
	$routeProvider.when('/buyCard',{
		templateUrl : 'tlps/admin/ng-buyCard.html',    //购物卡
		controller:'buyCardController'
	}).when('/user',{
		templateUrl : 'tlps/admin/ng-userCenter.html',    //个人中心
		controller:'userCenterController'
	}).when('/cardManger',{
		templateUrl : 'tlps/admin/ng-cardManger.html',    //流量卡管理
		controller:'cardMangerController'
	}).when('/cardExchange',{
		templateUrl : 'tlps/admin/ng-cardExchange.html',    //流量卡兑换
		controller:'cardExchangeController'
	}).when('/sumeHistory',{
		templateUrl : 'tlps/admin/ng-getconsumehistory.html',    //兑换记录
		controller:'sumeHistoryController'
	}).when('/payRecord',{
		templateUrl : 'tlps/admin/ng-payRecord.html',    //流量卡消费记录
		controller:'payRecordController'
	}).when('/order',{
		templateUrl : 'tlps/admin/ng-order.html',    //订单
		controller:'orderController'
	}).when('/orderDetail/:orderId',{
		templateUrl : 'tlps/admin/ng-orderDetail.html',    //订单详情
		controller:'orderDetailController'
	}).when('/orderSingleDetail/:orderId',{
		templateUrl : 'tlps/admin/ng-orderSingleDetail.html',    //订单详情
		controller:'orderSingleDetailController'
	}).when('/backCard/:productNo/:productName/:couponBatchNo',{
		templateUrl : 'tlps/admin/ng-backCard.html',    //退卡
		controller:'backCardController'
	}).when('/backCard/:productNo/:productName',{
		templateUrl : 'tlps/admin/ng-backCard.html',    //退卡
		controller:'backCardController'
	}).when('/test',{
		templateUrl : 'tlps/admin/ng-test.html',    //退卡
		controller:'testController'
	}).when('/accountMag',{// 账户管理
		templateUrl : 'tlps/ng-accountMag.html',
		controller:'accountMagController'
	}).when('/accountSet',{//账户设置
		templateUrl : 'tlps/ng-accountSet.html',
		controller:'accountController'
	}).when('/editUser',{//重置登录密码
		templateUrl : 'tlps/ng-editUser.html',
		controller:'accountController'
	}).when('/editPayPwd',{
		templateUrl : 'tlps/ng-editPayPwd.html',  //重置支付密码
		controller:'accountController'
	}).when('/mobileUpload',{//手机号段筛选
		templateUrl : 'tlps/ng-mobileUpload.html',
		controller:'mobileController'
	}).when('/confirmOrder/:type/:couponBatchNo',{//确认订单
		templateUrl : 'tlps/ng-confirmOrder.html',
		controller:'confirmOrderController'
	}).when('/confirmPay/:type/:couponBatchNo',{//确认支付
		templateUrl : 'tlps/ng-confirmPay.html',
		controller:'confirmPayController'
	}).when('/confirmBack',{//确认退卡
		templateUrl : 'tlps/ng-confirmBack.html',
		controller:'confirmOrderController'
	}).when('/changeType/:type',{//选择验证方式
		templateUrl : 'tlps/ng-changeType.html',
		controller:'changeTypeController'
	}).when('/setChangeType/:type',{//根据选择的验证方式 进行验证  第一步
		templateUrl : 'tlps/ng-setChangeType.html',
		controller:'changeTypeController'
	}).when('/secondChangeType/:type',{//根据选择的验证方式 进行验证 第二步
		templateUrl : 'tlps/ng-setChangeType2.html',
		controller:'changeTypeController'
	}).when('/finishChangeType/:type',{//根据选择的验证方式 进行验证 第三步 完成
		templateUrl : 'tlps/ng-setChangeType3.html',
		controller:'changeTypeController'
	}).when('/findPwdChangeType/:type/:un/:el/:tl/:pd',{//登录页忘记密码  选择验证方式
		templateUrl : 'tlps/ng-changeType.html',
		controller:'changeTypeController'
	}).when('/findPwdOne/:type/:userName/:text',{//登录页忘记密码  第一步
		templateUrl : 'tlps/ng-setChangeType.html',
		controller:'changeTypeController'
	}).when('/findPwdTwo/:type/:userName/:text',{//登录页忘记密码  第二步
		templateUrl : 'tlps/ng-setChangeType2.html',
		controller:'changeTypeController'
	}).when('/payResult/:resultType/:type/:couponBatchNo',{//支付结果
		templateUrl : 'tlps/ng-payResult.html',
		controller:'confirmPayController'
	}).when('/returnFail/:type',{//通点击邮箱链接返回的失败页面
		templateUrl : 'tlps/ng-returnFail.html',
		controller:'returnFailController'
	}).otherwise({
		templateUrl : 'tlps/ng-error.html'
	});
});

//分页
//flowApp.directive('expander',function(){
//	return {
//		restrict:'EA',
//		replace:true,
//		transclude:true,
//		$scope:{title:'=expanderTitle'},
//		
//		template:'	<ul class="pagination">\
//			<li ng-show="currentPage > 1">\
//			<a ng-click="switchPagePrize(1)" class="gopage">首页</a></li>\
//			<li ng-show="currentPage ==1 || currentPage < 1">\
//				<span class="nopage">首页</span>\
//			</li>\
//			<li><a ng-click="switchPagePrize(currentPage-1)"\
//				class="gopage" ng-show="currentPage > 1">上一页</a></li>\
//			<li><span ng-show="currentPage ==1 || currentPage < 1"\class="nopage">上一页</span>\</li>\
//			<li ng-class="{\'active\':page.value==currentPage}" style=""\
//				ng-repeat="page in pages" class="gopage"><a\
//				ng-click="switchPagePrize(page.value)">{{page.value}}</a></li>\
//			<li><a ng-click="switchPagePrize(currentPage+1)"\
//				class="gopage" ng-show="currentPage < totalPage">下一页</a></li>\
//			<li><span ng-show="currentPage==totalPage" class="nopage">下一页</span></li>\
//			<li><a ng-click="switchPagePrize(totalPage)" class="gopage"\
//				ng-show="currentPage < totalPage">末页</a></li>\
//			<li><span ng-show="currentPage==totalPage" class="nopage">末页</span></li>\
//			<li style="float: left;margin-top: 2px;">&nbsp;共&nbsp;{{totalPage}}&nbsp;页&nbsp;到\
//				<input type="number" style="border:1px solid #ddd;height: 30px;" ng-model="pageNumber" model-format=int\
//				value="1" min="1" max={{totalPage}}>&nbsp;页\
//				<button class="btn btn-xs  btn-primary" style="position: relative;float:none;\
//				height:30px;width: 40px;" ng-click="switchPagePrize(pageNumber)">确定</button>\
//			</li>\
//		</ul>',
//		
//		link:function(scpoe, element,attrs){
//			
//		}
//	}
//});
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
document.getQueryStringByName = function(name) {
	var result = location.href.match(new RegExp(
			"[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
};
