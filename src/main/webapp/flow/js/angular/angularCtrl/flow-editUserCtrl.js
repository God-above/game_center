flowApp.controller('editUserController', function($rootScope,$scope, $HttpService) {
	$scope.userInit = function() {
		for ( var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(9).addClass("active");
	};

	$scope.eidtUser = function() {
		if ($scope.newPassword != $scope.newRePassword) {
			$rootScope.showToast("两次密码输入不一致",2000);
			return false;
		}

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
				$rootScope.showToast("登录密码修改成功！",2000);
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
});