/*
 * 
 * 申明MODELE需要加载的依赖注入条件
 * 
 */
var flowApp = angular.module('flowApp',['tm.pagination','ngRoute','ngCookies','$HttpService']);//注入插件服务
var SUCCESS = 1;
var FAILURE = -1;
var FAILURE_NETWORK = -2;
/*
 * 通用方法入口
 * 
 * 
 */
flowApp.run(function($rootScope,$http,$timeout){
	$rootScope.DIALOG_SHOW = false; //全局提示框
	$rootScope.DIALOG_TITLE = "";
	$rootScope.DIALOG_TEXT = "";
	$rootScope.DIALOG_TOAST = "";
	
	$rootScope.save_type="";
	$rootScope.update_status = "";
	$rootScope.update_no = "";
	
	// 全局toast 提示框
	$rootScope.DIALOG_TOAST = false;
	$rootScope.DIALOG_TOAST_TITLE = "";
	// 显示 全局提示框
	$rootScope.showToast = function(text, time) {
		$("#toastTT").show();
		$rootScope.DIALOG_TOAST = true;
		$rootScope.DIALOG_TOAST_TITLE = text;
		$timeout($rootScope.hideToast, time);
	};
	// 隐藏全局提示框
	$rootScope.hideToast = function() {
		$("#toastTT").hide();
		$rootScope.DIALOG_TOAST = false;
		$rootScope.DIALOG_TOAST_TITLE = "";
	};
	// 全局显示提示框
	$rootScope.showDialog = function(title, text) {
		$("#drag").show();
		$rootScope.DIALOG_SHOW = true;
		$rootScope.DIALOG_TITLE = title;
		$rootScope.DIALOG_TEXT = text;
	};
	// 全局隐藏提示框
	$rootScope.hideDialog = function() {
		$("#drag").hide();
		$rootScope.DIALOG_SHOW = false;
	};
	
	// 全局的提示框关闭
	$rootScope.escDelete = function() {
		$rootScope.hideDialog();
	};
	
	
	//提示框确认按钮
	$rootScope.confirmDel=function(){
		if ($rootScope.save_type != null
				&& $rootScope.save_type == "productReason") {// 商品禁用原因
			if($rootScope.update_status && $rootScope.update_status=='1'){
				$rootScope.updateProStatus($rootScope.update_no,$rootScope.update_status);
			}else{
				$rootScope.showProReason();
			}
		}else if($rootScope.save_type != null
				&& $rootScope.save_type == "userReason") {// 用户禁用原因
			if($rootScope.update_status && $rootScope.update_status=='1'){
				$rootScope.updateUserStatus($rootScope.update_no,$rootScope.update_status);
			}else{
				$rootScope.showUserReason();
			}
		}
	};
	
	//处理样式
	$rootScope.getSign=function(size,count){
		window.scrollTo(0, 0);
		// 导航打开位置
		for ( var i = 0; i <= 30; i++) {
			$(".custom-nav li").eq(i).removeClass("nav-active");
			$(".custom-nav li").eq(i).removeClass("menuBag");
		}
		$(".custom-nav li").eq(size).addClass("nav-active");
		$(".custom-nav li").eq(count).addClass("menuBag");
		
	};
	
});

/*
 *  这里方法是给ajax增加一个拦截器,过滤超时和500的错误,页面还未开发
 */
flowApp.config(function ($httpProvider) {
	  $httpProvider.interceptors.push(['$rootScope', '$q', '$location', '$timeout',
	    function ($rootScope, $q, $location, $timeout) {
	      return {
	        'request': function (config) {
	          config.headers['X-Requested-With'] = 'XMLHttpRequest';
	          return config || $q.when(config);
	        },
	        'requestError': function (rejection) {
	          return rejection;
	        },
	        'response': function (response) {
	          return response || $q.when(response);
	        },
	        'responseError': function (response) {
	          CommonPerson.Base.LoadingPic.FullScreenHide();// 加载条显示
	          console.log(response);
	          if (response.status === 401 || response.status === 403) {
	            abp.notify.error("会话超时，请重新登录！");
	            $timeout(function () { window.location = "/Login"; }, 3000);
	            return false;
	          }
	          else if (response.status === 500) {
	            $location.path('/error');
	            return false;
	          }else if(response.status === 404){
	        	$location.path('/error');
	        	return false;
	          }
	          return $q.reject(response);
	        }
	      };
	    }]);
	});
/*
 * 路由控制器
 * 
 * 
 */
flowApp.config(function($routeProvider,$locationProvider) {
			$routeProvider.when('/index', {// 仪盘表
						templateUrl : 'tpls/ng-order.html',
						controller : 'batchOrderController'
					}).when('/batch', {// 批次
						templateUrl : 'tpls/ng-batch.html',
						controller : 'batchOrderController'
					}).when('/batchDetail/:batchCode', {// 批次详情
						templateUrl : 'tpls/ng-batchDetail.html',
						controller : 'batchDetailController'
					}).when('/single', {// 单订单
						templateUrl : 'tpls/ng-singleOrder.html',
						controller : 'singleOrderController'
					}).when('/backCard', {// 退款订单
						templateUrl : 'tpls/ng-backCard.html',
						controller : 'backCardController'
					}).when('/goods',{//商品管理
						templateUrl : 'tpls/ng-goods.html',
						controller : 'goodsController'
					}).when('/goodsEdit/:goodsNo',{//编辑商品
						templateUrl : 'tpls/ng-goodsEdit.html',
						controller : 'goodsController'
					}).when('/user',{//用户管理
						templateUrl : 'tpls/ng-user.html',
						controller : 'userController'
					}).when('/userAdd',{//添加用户
						templateUrl : 'tpls/ng-userAdd.html',
						controller : 'userController'
					}).when('/addRecharge/:userNo',{//用户充值
						templateUrl : 'tpls/ng-addRecharge.html',
						controller : 'userRechargeCtrl'
					}).when('/userRecord/:userCode',{//用户充值记录
						templateUrl : 'tpls/ng-userRecord.html',
						controller : 'userRechargeCtrl'
					}).when('/error',{//错误页面404
						templateUrl : 'tpls/ng-error.html'
					}).when('/coupon',{//劵管理
						templateUrl : 'tpls/ng-coupon.html',
						controller : 'couponController'
					}).when('/couponDetail/:couponNo', {// 劵详情
						templateUrl : 'tpls/ng-coupontDetail.html',
						controller : 'couponController'
					}).when('/userRep',{//前台注册用户
						templateUrl : 'tpls/ng-userRep.html',
						controller : 'userController'
					}).when('/userAssetFlow',{//用户流水表
						templateUrl : 'tpls/ng-userAssetFlow.html',
						controller : 'userFlowController'
					}).when('/couponBatch',{//流量卡订单
						templateUrl : 'tpls/ng-couponBatch.html',
						controller : 'couponBatchOrderCtrl'
					}).when('/couponBatchDetail/:orderNo', {// 流量卡详情
						templateUrl : 'tpls/ng-coupontBatchDetail.html',
						controller : 'coouponBatchDetailCtrl'
					}).when('/couponRecord', {// 兑换记录
						templateUrl : 'tpls/ng-couponRecord.html',
						controller : 'couponRecordCtrl'
					}).otherwise({ // 默认路径访问
						templateUrl : 'tpls/ng-error.html'
					})
});
//分页指令
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