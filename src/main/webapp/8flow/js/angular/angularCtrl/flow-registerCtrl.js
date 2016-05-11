userApp.controller('regUserControllers', function($http, $scope, $rootScope,$cookieStore,
		$HttpService,$location) {
	var userType=1;//初始化用户类型  为个人注册
	$rootScope.hideToast();
	var userVm=$scope.userVm={};//企业注册
	var perUserVm=$scope.perUserVm={};//个人注册
	$scope.init = function() {
		//$rootScope.showToast("测试",2000);
		
		var el=document.getQueryStringByName("email");
		var tl=document.getQueryStringByName("tl");
		if(el || tl){
			$scope.two=true;
		}else{
			user_form.$valid=true;
			user_form4.$valid=true;
			$scope.perSerAgr=true;
			$scope.serAgr=true;
			$scope.one=true;
			$scope.pic1=true;
			$scope.step1=true;
		}
		
		//$("#myModal").modal("show");
	};
	/*---------------------------------------个人注册 start-------------------*/
	
	$scope.showTab=function(type){
		if(type=='0'){
			$scope.tel_showMsg="";
			$scope.code_showMsg="";
			angular.element(document.getElementsByName("perTel")).val("");
			angular.element(document.getElementsByName("perValidateCode")).val("");
			$scope.per=null;
		}else if(type=='1'){
			$scope.email_showMsg="";
			$scope.code_showMsg="";
			angular.element(document.getElementsByName("email")).val("");
			angular.element(document.getElementsByName("validateCode")).val("");
		}
	};
	//发送注册短信   验证手机号是否已注册
	perUserVm.perOpenSecond=function(text,code){
		if(!text){
			$scope.tel_showMsg="请输入手机号码";
			return;
		}
		if(code){
			if(code.length!=4){
				$scope.code_showMsg="验证码不正确，请重新输入！";
				return;
			}
		}else{
			$scope.code_showMsg="请输入验证码";
			return;
		}
		var postValue = {
				url : '../user/sentRegisterSms',
				params : {
					tel:text,
					validateCode:code
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#myModal").modal("show"); //手机校验码
					$scope.timeCountdown();
				} else if(res.data.resultCode == '4914') { //手机号已存在
						$scope.tel_showMsg="该手机号已被注册！";
				} else if(res.data.resultCode == '4600') { //距离上次发送时间不足1分钟
						$scope.countdown=60;
						userType=='1';//个人用户
						$("#myModal").modal("show"); //手机校验码
				}else if(res.data.resultCode == '1203') { //验证码错误
					$scope.code_showMsg="验证码错误！";
				} else {
					$rootScope.showToast(res.data.resultComment,2000);
					console.log(res.data);
				}
			});
	};
	//文本框失去焦点事件
	$scope.checkUserName=function(text,type){
		var telUrl=/^0{0,1}(13[0-9]|15[3-9]|15[0-2]|18[0-9]|177)[0-9]{8}$/ 
		var emailUrl=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		$scope.ExistUserName=false;	//隐藏提示信息
		if(type=='email'){
			if(!text){
				$scope.email_showMsg="请输入邮箱地址";
				return;
			}else if(!emailUrl.test(text)){
				$scope.email_showMsg="邮箱地址格式不正确，请重新输入";
				return;
			}else{
				$scope.email_showMsg="";
			}
		}else{
			if(!text){
				$scope.tel_showMsg="请输入手机号码";
				return;
			}else if(!telUrl.test(text)){
				$scope.tel_showMsg="手机号码格式不正确，请重新输入";
				return;
			}else{
				$scope.tel_showMsg="";
			}
		}
	};
	
	$scope.codeBlur=function(code){
		$scope.code_showMsg="";
	};
	$scope.checkTelCode=function(telCode){
		if(!telCode){
			$scope.showTelCode=true;
			$scope.errorMsg="校验码不能为空！";
			return;
		}else if(telCode && telCode.length!=6){
			$scope.showTelCode=true;
			$scope.errorMsg="校验码是六位数字！";
		}
	};
	
	//重新获取验证码
	perUserVm.reSendMsg=function(tel){
		$scope.validateCode="";
		var postValue = {
				url : '../user/sentRegisterSms',  //重新发送短信验证码
				params : {
					tel:tel
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$rootScope.showToast("重新发送短信到"+tel,3000);
					$scope.timeCountdown();//重新发送短信的时间
				} else if (res.data.resultCode == '4914') { //手机号已存在
					$scope.tel_showMsg="该手机号已被注册！";
				} else if (res.data.resultCode == '4600') { //距离上次发送时间不足1分钟
					$scope.tel_showMsg="该手机号已被注册！";
				} else {
					console.log(res.data);
				}
			});
	};
	//验证手机校验码  成功后 设置用户名
	perUserVm.setValiCode=function(tel,code){
		if(!code){
			$scope.showTelCode=true;
			$scope.errorMsg="校验码不能为空！";
			//$rootScope.showToast("校验码不能为空！",3000);
			return;
		}else if(code && code.length!=6){
			$scope.showTelCode=true;
			$scope.errorMsg="校验码是六位数字！";
			return;
		}
		var postValue = {
				url : '../user/verifyRegisterSms',  //验证手机校验码是否正确
				params : {
					tel:tel,
					smsCode:code
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					//校验码正确   设置用户名  密码
					$("#myModal").modal("hide");
					window.location = "./register.html#/regTwo?tl="+tel;
				}else if(res.data.resultCode=='4602'){
					$scope.showTelCode=true;
					$scope.errorMsg="校验码错误！";
				} else {
					$rootScope.showToast(res.data.resultMsg,3000);
				}
			});
	};
	/*==================================个人注册 end==============================*/
	
	/*重新发送邮件*/
	$scope.reSendEmail=function(email){
		var postValue = {
				url : '../user/sentRegisterEmail',
				params : {
					email:email
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$rootScope.showToast("重新发送邮件到"+email,3000);
				}else {
					$rootScope.showToast(res.data.resultComment,2000);
					console.log(res.data);
				}
			});
		
	};
	

	/*设置用户名 确定*/
	$scope.regPerUser=function(){
		var tel=document.getQueryStringByName("tl");
		var email=document.getQueryStringByName("email");
		var params={
			tel : $scope.per.tel,
			userName : $scope.per.userName,	//个人用户使用手机号作为用户名
			password : $scope.per.perRePwd//登录密码
		};
		if(email){
			params["email"]=email;
			params["userType"]=2;
		}else if(tel){
			params["tel"]=tel;
			params["userType"]=1;
		}
		var postValue = {
				url : '../user/register',
				params : params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$scope.two=false;
					$scope.three=true;
					$scope.pic1=false;
					$scope.user_showDiv=false;
					$scope.user_showMsg="";
				}else if(res.data.resultCode=='4915'){
					$scope.user_showDiv=true;
					$scope.user_showMsg="用户已存在";
				} else {
					$rootScope.showToast(res.data.resultComment,3000);
				}
			});
		
	};
	$scope.userNameBlur=function(){
		$scope.user_showDiv=false;
		$scope.user_showMsg="";
	};
	/*------------------------------------------------企业注册----------*/
	//验证邮箱唯一性  企业注册 下一步
	userVm.openSecond=function(email,code){
		if(!email){
			$scope.email_showMsg="请输入邮箱地址";
			return;
		}
		if(code){
			if(code.length!=4){
				$scope.code_showMsg="验证码不正确，请重新输入！";
				return;
			}
		}else{
			$scope.code_showMsg="请输入验证码";
			return;
		}
		var postValue = {
				url : '../user/sentRegisterEmail',
				params : {
					email:email,
					validateCode:code
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					userType=='2';//企业用户
					$("#myModal2").modal("show");//邮箱校验
				} else if(res.data.resultCode == '4906') {//邮箱已存在
						$scope.ExistUserName=true;	//显示提示信息
						$scope.email_showMsg="该邮箱已被注册！";
				}else if(res.data.resultCode == '1203') { //验证码错误
					$scope.code_showMsg="验证码错误！";
				}  else {
					$rootScope.showToast(res.data.resultComment,2000);
					console.log(res.data);
				}
			});
	};

	$scope.setAccount=function(){
		
	};
	
	
	/*-------------------------------------------------------------忘记密码*/
	$scope.findCodeBlur=function(){
		$scope.showCodeDiv=false;
		$scope.code_showMsg="";
	};
	// 根据用户名查找已绑定信息
	$scope.findPwd = function(text,code) {
		if(code){
			if(code.length!=4){
				$scope.showCodeDiv=true;
				$scope.code_showMsg="验证码不正确，请重新输入！";
				return;
			}
		}else{
			$scope.showCodeDiv=true;
			$scope.code_showMsg="请输入验证码";
			return;
		}
		var postValue = {
				url : '../user/getBindInfo',
				params : {
					username:text,
					validateCode:code
				}
			};
			$HttpService.post(postValue).then(function(res) {
				var resultCode = res.data.resultCode;
				var resultBody=res.data.resultBody;
                if(resultCode == '0'){
                	$cookieStore.put("isLogin",'false');
                	window.location = "./index.html#/findPwdChangeType/dt/"+text+"/"+$scope.changeState(resultBody.email)+"/"+$scope.changeState(resultBody.tel)+"/"+$scope.changeState(resultBody.payPass);
				}else if(resultCode=='1203'){
					$scope.showCodeDiv=true;
					$scope.code_showMsg="验证码不正确，请重新输入！";
				} else {
					$rootScope.showToast(res.data.resultComment,2000);
				}
				console.log(res.data);
			});
	};
	//重新发送
	$scope.reSend=function(userName){
		
		var postValue = {
				url : '../user/sentRegisterEmail',
				params : {
					email:userName
				}
			};
		$HttpService.post(postValue).then(function(res) {
			var resultCode = res.data.resultCode;
			var resultBody=res.data.resultBody;
            if(resultCode == '0'){
            	$rootScope.showToast("重新发送邮件到"+userName,3000);
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
			console.log(res.data);
		});
	};
	//更换邮箱
	$scope.changeEmail=function(){
		$("#myModal2").modal("hide");
		user_form4.$valid=true;
		$scope.user.email="";
		$scope.validateCode="";
		
	};
	
	/*=========================================util====================================*/

	//发送短信倒计时
	$scope.countdown = 60;
	$scope.timeCountdown=function(){
		var myTime = setInterval(function() {
			$scope.timeDown=true;
			$scope.countdown--;
			if($scope.countdown==0){
				$scope.timeDown=false;
				$scope.countdown = 60;
				clearInterval(myTime);
			}
			$scope.$digest(); // 通知视图模型的变化
		}, 1000); // 倒计时10-0秒，但算上0的话就是11s
	};


	// 根据邮箱类型登录
	$scope.openEmailUrl = function(email) {
		$("#myModal2").modal("hide");
		
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
	
	
	$scope.changeState=function(obj){
		if(obj!=undefined && obj!=null && obj!='' && obj!='false'){//已设置
			if(obj==true){
				return 1;
			}
			return obj;
		}else{//未设置
			return 0;
		}
	};
});
