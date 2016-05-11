var loginApp = angular.module('loginApp', ['ngRoute','ngCookies', '$HttpService' ]);

loginApp.run(function($rootScope, $timeout){
	
	$rootScope.DIALOG_TOAST = "";
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
});
loginApp.controller('loginCtrl', function($rootScope,$scope, $http, $cookieStore,
		$HttpService) {
	
	$scope.login = function() {
		if($scope.userName==undefined||$scope.userName==null){
			$rootScope.showToast("登录账号不能为空", 2000);
			return;
		}
		if($scope.userPwds==undefined||$scope.userPwds==null){
			$rootScope.showToast("密码不能为空", 2000);
			return;
		}
		if($scope.validateCode==undefined||$scope.validateCode==null){
			$rootScope.showToast("验证码不能为空", 2000);
			return;
		}
		var postValue = {
			url : '../adminLogin',
			params : {
				loginName : $scope.userName,
				loginPswd : $scope.userPwds,
				validateCode  : $scope.validateCode
			},
			rolling : true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
//				var b = new Base64();  
				$scope.user=res.data.resultBody;
				$cookieStore.put("user",$scope.user.nickName);
				window.location = "../supervisor/index.html#/couponBatch";
				
			}else if(res.data.resultCode=='2004'){
				alert("该用户没有管理权限！",3000);
				console.log(res.data);
			} else {
				alert(res.data.resultComment);

			}
		});
	};
	
});
document.getQueryStringByName = function(name) {
	var result = location.search.match(new RegExp(
			"[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
};
