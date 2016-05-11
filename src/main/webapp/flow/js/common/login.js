var loginApp = angular.module('loginApp', [ 'ngCookies', '$HttpService' ]);

loginApp.controller('loginCtrl', function($scope, $http, $cookieStore,
		$HttpService) {

	$scope.username_hint = "邮箱地址不能为空！";
	$scope.username_hint_null = "邮箱地址格式不正确！";
	$scope.password_hint = "密码不能为空！";
	$scope.yzm_hint = "验证码不能为空！ ";
	$('#userPwd').type = 'password';
	if($cookieStore.get('loginUserremark')){
		if($cookieStore.get('loginUserremark')=="true"){
				$scope.username = $cookieStore.get('loginUser');
				$scope.password = $cookieStore.get('loginUserpawd');

		}
	}	

	
	$scope.loginIn = function() {
		var type=document.getQueryStringByName("type");
		var postValue = {
			url : '../login',
			params : {
				loginName : $scope.username,
				loginPswd : $scope.password,
				validateCode : $scope.validateCode,
				urlType:type!=undefined && type!=null&& type!='' ? type:''
			},
			rolling : true
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				var b = new Base64();  
				$scope.user=res.data.resultBody;
					var userName = b.encode($scope.user.userName); 
					$cookieStore.put("user",userName);
				if($scope.reber==true){
					$cookieStore.put("loginUser", $scope.username);
					$cookieStore.put("loginUserpawd", $scope.password);
					$cookieStore.put("loginUserremark","true");
				}else if($scope.reber==false||$scope.reber==undefined){
					$cookieStore.put("loginUser", $scope.username);
					$cookieStore.put("loginUserpawd", $scope.password);
					$cookieStore.put("loginUserremark","false");
				}
				if($scope.user.urlType=='1'){
					window.location = "./index.html#/resultMsgEmail/success_"+$scope.user.email;
				}else{
					window.location = "./index.html#/singleRecharge";
				}
				
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
