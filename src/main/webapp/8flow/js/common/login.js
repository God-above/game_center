var loginApp = angular.module('loginApp', [ 'ngCookies', '$HttpService' ]);

loginApp
		.controller(
				'loginCtrl',
				function($scope, $http, $cookieStore, $HttpService) {
					$scope.showCode = false;
					$scope.showError = false;
					$scope.yzm_hint = "验证码不能为空！ ";					
					$scope.userType = 1 ;//默认为1 个人用户
					
					$scope.username='';
					$scope.userPwd='';
					$scope.reber=false;
					/*----------------检测用户是否记住密码 start------------------*/
					$scope.per={
							username:'',
							userPwd:'',
					};
					var loginName=$cookieStore.get('un');
					var remPwd=$cookieStore.get('loginUserremark');
					var ut=$cookieStore.get('ut');
					if(remPwd == "true"){
						var b = new Base64();
						if(ut=='2'){
							$scope.username=$cookieStore.get('un');
							$scope.userPwd=b.decode($cookieStore.get('pd'));
							$scope.userReber=true;
						}else{
							$scope.per.username = $cookieStore.get('un');
							$scope.per.userPwd = b.decode($cookieStore.get('pd'));
							$scope.reber=true;
						}
						
					};
					/*----------------检测用户是否记住密码 end------------------*/
					$scope.loginIn = function() {
						
						var params={};
						if($scope.userType=='1'){
							params["username"]=$scope.per.username;
						}else if($scope.userType=='2'){
							params["username"]=$scope.username;
						}
						if(!params.username){
							$scope.showDiv();
							$scope.errMsg = "用户名不能为空";
							return;
						}
						if($scope.userType && $scope.userType=='2'){//企业登录
							if(!$scope.userPwd){
								$scope.showDiv();
								$scope.errMsg = "请输入登陆密码";
								return;
							}
						}else {//个人登录
							if(!$scope.per.userPwd){
								$scope.showDiv();
								$scope.errMsg = "请输入登陆密码";
								return;
							}
						}
						var postValue = {
							url : '../isVerifyCodeRequired',
							params : params,
							rolling : true
						};
						console.log(postValue);
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '2') {
								if (res.data.resultBody) {
									$('.showCode').show();
									$scope.showCode = true;
								} else {
									userLogin();
								}
							} else if (res.data.resultCode == '4901') {
								$scope.showDiv();
								$scope.errMsg = res.data.resultComment;
							}
							console.log(res.data);
						});
					};
					var userLogin = function(type) {
						var type = document.getQueryStringByName("type");
						var params = {
							userType : $scope.userType,
							urlType : type != undefined && type != null
									&& type != '' ? type : ''
						};
						if (type && type == 'sucCode') {
							params["validateCode"] = $scope.validateCode ;
						}
						if($scope.userType && $scope.userType=='2'){//企业登录
							params["loginName"]=$scope.username;
							params["loginPswd"]=$scope.userPwd;
						}else {//个人登录
							params["loginName"]=$scope.per.username;
							params["loginPswd"]=$scope.per.userPwd;
						}
						if(!params.loginName){
							$scope.showDiv();
							$scope.errMsg = "请输入账户名";
							return;
						}
						if(!params.loginPswd){
							$scope.showDiv();
							$scope.errMsg = "请输入登陆密码";
							return;
						}
						var postValue = {
							url : '../login',
							params : params,
							rolling : true
						};
						console.log(params);
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											if (res.data.resultCode == 0) {
												var b = new Base64();
												$scope.user = res.data.resultBody;
												$cookieStore.put("username",$scope.user.userName);
												$cookieStore.put("isLogin",'true');
												if($scope.userType=='2'){
													var pwd = b.encode($scope.userPwd);
													$cookieStore.put("un",$scope.username);
													$cookieStore.put("pd",pwd);
													$cookieStore.put("ut","2");
													if($scope.userReber==true){
														$cookieStore.put("loginUserremark","true");
													}else{
														$cookieStore.put("loginUserremark","false");
													}
												}else{
													var pwd = b.encode($scope.per.userPwd);
													$cookieStore.put("un",$scope.per.username);
													$cookieStore.put("pd",pwd);
													$cookieStore.put("ut","1");
													if($scope.reber==true){
														$cookieStore.put("loginUserremark","true");
													}else{
														$cookieStore.put("loginUserremark","false");
													}
												}
												if ($scope.user.urlType == '1') {
													window.location = "./index.html#/resultMsgEmail/success_"
															+ $scope.user.email;
												} else {
													window.location = "./index.html#/user";
												}

											}else if(res.data.resultCode=='1204'){
												$scope.showDiv();
												$scope.errMsg = res.data.resultComment;
											} else {
												alert(res.data.resultComment);

											}
										});
					};
					//显示错误提示
					$scope.showDiv=function(){
						$(".errorAlert").show();
					};
				});

// 表单校验 失去焦点时显示错误信息
loginApp.directive('ngFocus', [ function() {
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
	var result = location.search.match(new RegExp(
			"[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
};
