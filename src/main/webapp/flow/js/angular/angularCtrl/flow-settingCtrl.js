flowApp.controller('setController', function($rootScope,$scope, $cookieStore,
		$HttpService, $routeParams, $location) {
	$scope.userName = $cookieStore.get("user");
	if ($scope.userName) {
		var b = new Base64();
		$scope.userName = b.decode($scope.userName);
	} else {
		$scope.userName = "未登陆用户";
	}

	// 用户 设置 初始化
	$scope.init = function() {
		$scope.initMenu();
		$scope.getUserInit();
		var type = $routeParams.type;
		if (type && type == 'payPwd') {
			$("#changePayType").hide();
			$("#setPayPwd").show();
			$("#payResult").hide();
			$("#resetPayPwd").hide();
		} else if (type && type == 'repayPwd') {
			$("#changePayType").hide();
			$("#setPayPwd").hide();
			$("#payResult").hide();
			$("#resetPayPwd").show();
		} else if (type && type == 3) {
			$("#changePayType").hide();
			$("#setPayPwd").hide();
			$("#payResult").show();
		} else if (type && type == 'bindEmail') {
			$("#changePayType").show();
			$("#setPayPwd").hide();
			$("#resetPayPwd").hide();
			$("#payResult").hide();
		}
	};
	

	// 重置支付密码
	$scope.resetPayPwd = function(pwd) {
		var params = {
			payPassword : pwd,
			oldPayPassword:$scope.oldPayPwd
		};
		// var type = $routeParams.type;
		// if (type && type == 'repayPwd'){
		// params["oldPayPassword"]=$scope.oldPayPwd;
		// }
		console.log(params);
		var postValue = {
			url : '../user/setPayPassword',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == 0) {
				$rootScope.showToast("支付密码重新设置成功！",2000);
				$location.path("userSet");
			}else if(res.data.resultCode == '4908'){
				$rootScope.showToast("原密码输入错误！",2000);
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
			console.log(res);
		});
	};
	/*
	 * 设置支付密码 如果未设置邮箱就跳转到设置邮箱 如果已设置邮箱 未设置支付密码 先发送邮件验证邮箱 修改支付密码 直接修改
	 */
	$scope.checkPayPwd = function(email, pwd) {
		if (email && pwd) {
			$location.path("setPayType/repayPwd");
		} else if (email) {
			
			//$("#setBtn").attr('disabled','disabled');
			if (!pwd) { // 如果已设置邮箱 未设置支付密码 先发送邮件验证邮箱
				var postValue = {
					url : '../user/sendSetPayPassEmail',
					rolling:true
				};
				$HttpService.post(postValue).then(function(res) {
					if (res.data.resultCode == '0') {
						$('#myModalPwd').modal('show'); 
						//$rootScope.showToast("已发送邮件到"+email+"，请注意查收 及时认证",3000);
					} else {
						$rootScope.showToast(res.data.resultComment,2000);
					}
					console.log(res);
				});
				
			} else {
				console.log(email + "====" + pwd);
			}
		} else if (!email) {
			$('#myModal').modal('show');
			//$location.path("setPayType/bindEmail");
		}

	};

	// 保存支付密码
	$scope.savePayPwd = function(pwd) {
		var userCode = $routeParams.userCode;
		var encryptCode = $routeParams.encryptCode;
		var postValue = {
			url : '../user/setPayPassFromEmail',
			params : {
				payPassword : pwd,
				userCode : userCode,
				encryptCode : encryptCode
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$rootScope.showToast("支付密码重新设置成功！",2000);
				$location.path("userSet");
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
			console.log(res.data);
		});
	};
	
	//初始化修改邮箱  清空文本框值
	$scope.initUpdateEmail=function(){
		$scope.initMenu();
		$scope.email="";
		$scope.userPwd="";
		setTimeout(function(){
			$("input[name=userEmail]").val("");
			$("input[name=userPwd]").val("");
			$("#firstBtn").attr("disabled", true);
		}, 50);
	};

	// 查看用户是否已绑定邮箱
	$scope.getUserInit = function() {
		$scope.initMenu();
		// 查询用户信息
		var postValue = {
			url : '../user/getUserInfo'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.userInfo = res.data.resultBody;
				console.log($scope.userInfo);
			} else {
				console.log(res.data);
			}
		});
		//查询账户余额
		var postValue2={
				url:'../user/getBalance'
		};
		$HttpService.post(postValue2).then(function(res){
			if(res.data.resultCode=='0'){
					$scope.price=res.data.resultBody.balance;
				
			}else{
				console.log(res.data);
			}
		});
	};
	// 绑定邮箱
	$scope.bindEmail = function() {
		if(!$scope.email ||!$scope.userPwd){
			return;
		}
		// 查询账户余额
		var postValue = {
			url : '../user/sendResetEmail',
			params : {
				email : $scope.email,
				password : $scope.userPwd
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$('#myModal').modal("show");
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};

	//绑定邮箱结果
	$scope.initResult=function(){
		var mailMsg=$routeParams.msg;
		if(mailMsg && mailMsg=='failEmail'){
			$scope.msg="邮箱绑定失败";
		}else if(mailMsg && mailMsg.indexOf('@')!=-1){
			var email=mailMsg.split("success_");
			$scope.msg="绑定邮箱"+email[1]+"成功";
			//$rootScope.showToast("绑定邮箱"+email[1]+"成功",2000);
		}else if(mailMsg && mailMsg=='success_nologin'){
			window.location.href="./login.html?type=1";
		}
	};
	// 没有收到邮件 重新输入邮箱
	$scope.reSendEmail = function() {
		$('#myModal').modal("hide");
		$("#firstBtn").attr('disabled',false);
		
	};
	
	//设置支付密码    重新发送邮件
	$scope.rePwdEmail = function() {
		$('#myModalPwd').modal("hide");
		$("#setBtn").attr('disabled',false);
	};
	

	// 显示modal 模态框
	$scope.openSecond = function() {
		
		if ($scope.email) {
			var postValue = {
				url : '../user/sentBindMailEmail',
				params : {
					email : $scope.email
				},
				rolling:true
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$('#myModal').modal("show");
					$("#firstBtn").attr('disabled','disabled');
				} else {
					$rootScope.showToast(res.data.resultComment,2000);
				}
				console.log(res);
			});

		} else {
			return;
		}
		// $("#changePayType").hide();
		// $("#setPayPwd").show();
	};
	// 根据邮箱类型登录
	$scope.openEmailUrl = function(email) {
		var hash = {
			'qq.com' : 'http://mail.qq.com',
			'gmail.com' : 'http://mail.google.com',
			'sina.com' : 'http://mail.sina.com.cn',
			'163.com' : 'http://mail.163.com',
			'126.com' : 'http://mail.126.com',
			'yeah.net' : 'http://www.yeah.net/',
			'sohu.com' : 'http://mail.sohu.com/',
			'tom.com' : 'http://mail.tom.com/',
			'sogou.com' : 'http://mail.sogou.com/',
			'139.com' : 'http://mail.10086.cn/',
			'hotmail.com' : 'http://www.hotmail.com',
			'live.com' : 'http://login.live.com/',
			'live.cn' : 'http://login.live.cn/',
			'live.com.cn' : 'http://login.live.com.cn',
			'189.com' : 'http://webmail16.189.cn/webmail/',
			'yahoo.com.cn' : 'http://mail.cn.yahoo.com/',
			'yahoo.cn' : 'http://mail.cn.yahoo.com/',
			'eyou.com' : 'http://www.eyou.com/',
			'21cn.com' : 'http://mail.21cn.com/',
			'188.com' : 'http://www.188.com/',
			'foxmail.coom' : 'http://www.foxmail.com',
			'singulax.com' : 'http://exmail.qq.com/login'
		};
		var url = email.split('@')[1];
		for ( var j in hash) {
			if (url == j) {
				window.open(hash[url]);
				break;
			}
		}
		;
	};

	// 初始化menu 样式
	$scope.initMenu = function() {
		for (var i = 0; i <= 15; i++) {
			$("#text li").eq(i).removeClass("active");
		}
		$("#text li").eq(9).addClass("active");
	};

});
