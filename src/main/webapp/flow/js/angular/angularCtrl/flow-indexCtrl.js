flowApp.controller('indexController', function ($rootScope,$scope,$cookieStore,$HttpService,$location) {
	$scope.price="余额获取中...";
	$scope.userName = $cookieStore.get("user");
	if($scope.userName){
		var b = new Base64();  
		$scope.userName = b.decode($scope.userName);  
	}else{
		$scope.userName = "未登陆用户";  
	}

	//查询账户余额
	var postValue={
			url:'../user/getBalance'
	};
	$HttpService.post(postValue).then(function(res){
		if(res.data.resultCode=='0'){
			$scope.userInfo=res.data.resultBody;
			if($scope.userInfo){
				$scope.price=$scope.userInfo.balance;
			}
			
		}else{
			console.log(res.data);
		}
	});
	//退出登录
	$scope.layout=function(){
		var postValue={
				url:'../logout'
			};
			$HttpService.post(postValue).then(function(res) {
				$cookieStore.remove("user");
				window.location="./login.html";

			});
	};
});
