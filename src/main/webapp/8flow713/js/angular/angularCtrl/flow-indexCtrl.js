flowApp.controller('indexController', function ($rootScope,$scope,$cookieStore,$HttpService,$location) {
	$rootScope.hideToast();
	
	$scope.init=function(){
		var isLogin=$cookieStore.get("isLogin");
		if(isLogin && isLogin=='true'){
			$scope.userName = $cookieStore.get("username");
		}else{
			$scope.userName = "未登陆用户";  
		}
	};

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
