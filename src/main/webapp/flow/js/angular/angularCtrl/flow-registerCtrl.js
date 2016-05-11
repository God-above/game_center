var testApp2 = angular.module('testApp2', ['ngCookies', 'easypiechart', '$HttpService' ]);
testApp2.controller('testControllers', function($http, $scope, $rootScope,$cookieStore,
		$HttpService) {
	$scope.init = function() {
		$scope.serAgr=true;
	};
	// 注册用户
	$scope.regUser = function() {
		$scope.user_form.$setDirty();
		var postValue = {
			url : '../user/register',
			params : {
				userCode : $scope.user.code,
				nickName : $scope.user.name,
				password : $scope.rePwd,
				userType : parseInt(1),
				companyName : $scope.user.comName,
				companyAddress : $scope.user.address,
				contacts : $scope.user.contacts,
				payPassword : $scope.user.payPwd,
				tel : $scope.user.userTel,
				userName : $scope.user.email,
				remark : $scope.user.remark,
				validateCode:$scope.validateCode
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '4902') {
				var b = new Base64();  
				console.log(res.data);
				$scope.user=res.data.resultBody;
				var userName = b.encode(res.data.resultBody.userName); 
				$cookieStore.put("user",userName);
				alert("注册成功");
				window.location = "./index.html#/singleRecharge";
			} else {
				alert(res.data.resultComment);
			}
		});
	};
	//验证用户名的唯一性
	$scope.checkUserName=function(){
		if(!$scope.user || !$scope.user.email){
			$scope.ExistUserName=false;
			return;
		}
		var postValue = {
				url : '../user/checkUserName',
				params : {
					userName : $scope.user.email
				}
			};
			$HttpService.post(postValue).then(function(res) {
				console.log(res.data);
				if (res.data.resultCode == '4900') {
					$scope.ExistUserName=true;
				} else {
					$scope.ExistUserName=false;
				}
			});
	};

	// 找回密码
	$scope.findPwd = function() {
		var postValue = {
			url : '../user/findPwdEmail',
			params : {
				email : $scope.user.email
			}
		};
		$HttpService.post(postValue).then(function(res) {
			console.log(res.data);
			if (res.data.resultCode == '0') {
				alert("请注意及时查收邮件，重置密码");
				// window.location="./login.html";
			} else {
				alert(res.data.resultComment);
			}
		});
	};
	
	//重置密码
	$scope.resetPwd=function(){
		var p=getQueryString("p");
		var params={
				password:$scope.rePwd,
				p:p
		};
		var postValue={
				url:'../user/findAndResetPwd',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				alert("设置密码成功");
				window.location="./login.html";
			}
			console.log(res.data);
		});
	};
});

/*
 * 密码重复验证
 */
testApp2
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
testApp2.directive('ngFocus', [ function() {
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
//获取路由参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}