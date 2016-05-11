flowApp.controller('accountController', function ($rootScope,$scope,$cookieStore,$HttpService,$location,$routeParams) {
	$scope.userInfo = {};
	$scope.userInfo.email="sdf"; //初始化信息 避免闪烁
	$scope.userInfo.tel="111";
	$scope.userInfo.payPassword="222";
	$scope.showType="";
	$scope.init=function(){
		$scope.getUserInit();
	};
	/*--------------------------------账户设置-----------------------------*/
	// 查询用户信息
	$scope.getUserInit = function() {
		var postValue = {
			url : '../user/getUserInfo'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.userInfo = res.data.resultBody;
			} else {
				console.log(res.data);
			}
		});
	};
	
	
	/*----------------------------------------------重置登录密码-----------------*/
	//保存
	$scope.eidtUser=function(){
		$scope.payError=false;
		var postValue = {
			url : '../user/resetPwd',
			params : {
				password : $scope.userPassword,
				newpassword : $scope.newPassword
			},
			rolling : false
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				var b = new Base64();
				$cookieStore.put("pd","");
				$rootScope.showToast("登录密码修改成功,请重新登录！",2000);
				setTimeout(function(){
					window.location.href="login.html";
				}, 3000);
				
			}else if(res.data.resultCode=='4904'){
				$scope.payError=true;
			}  else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
	/*=========================================支付密码=================*/
	//修改支付密码
	$scope.updatePayPwd=function(){
		$scope.payError=false;
		var postValue = {
				url : '../user/resetPayPwdByOrigin',
				params : {
					oldPayPwd : $scope.userPayPwd,
					newPayPwd:$scope.newRePassword
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$location.path("returnFail/setPayPass");
					//$rootScope.showToast("支付密码修改成功！",2000);
				}else if(res.data.resultCode=='4908'){
					$scope.payError=true;
				} else {
					$rootScope.showToast(res.data.resultComment,2000);
				}
			});
	};
	$scope.hideError=function(){
		$scope.payError=false;
	};
	
	//解析用户类型
	$scope.parseType=function(type){
		if(type && type=='1'){
			return "个人用户";
		}else if(type && type=='2'){
			return "企业用户";
		}else if(type && type=='3'){
			return "管理员";
		}
	};
	
});
