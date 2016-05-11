flowApp.controller('indexController', function ($rootScope,$scope,$cookieStore,$HttpService,$location) {
	$rootScope.hideToast();
	
	$scope.init=function(){
		var isLogin=$cookieStore.get("isLogin");
		$scope.getUserInfo();
		if(isLogin && isLogin=='true'){
			$scope.userName = $cookieStore.get("username");
		}else{
			$scope.userName = "未登陆用户";  
		}
	};
	//获取用户信息
	$scope.getUserInfo=function(){
		var postValue = {
			url : '../user/getUserInfo'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == "0") {
				//用户内容放入.vm.userInfo
				$scope.userInfo = res.data.resultBody;
				$scope.userName=$scope.userInfo.userName;
			} else {
				$rootScope.showToast("获取用户信息失败",2000);
				window.location='./login.html'
			}

		});
	}
	//退出登录
	$scope.layout=function(){
		var postValue={
				url:'../logout'
			};
			$HttpService.post(postValue).then(function(res) {
				window.location="./login.html";

			});
	};
	
});
