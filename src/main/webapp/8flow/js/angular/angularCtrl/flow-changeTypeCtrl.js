flowApp.controller('changeTypeController', function($rootScope, $scope,
		$cookieStore, $HttpService, $location, $routeParams) {
	var typeId = "";//
	$scope.showType = "";
	var upTelvm = $scope.upTelvm = {};// 手机设置
	var upEmailvm = $scope.upEmailvm = {};// 邮箱设置
	var upPwdvm = $scope.upPwdvm = {};// 登录密码设置
	var upPayPwdvm = $scope.upPayPwdvm = {};// 找回密码设置
	var setPayPwdvm = $scope.setPayPwdvm = {};// 支付密码设置
	var unLoginvm = $scope.unLoginvm = {};// 未登陆忘记密码 验证
	var setEmailvm=$scope.setEmailvm={};//设置绑定邮箱
	$scope.userInfo = {};
	$scope.userInfo.email="sdf"; //初始化信息 避免闪烁
	$scope.userInfo.tel="111";
	$scope.userInfo.payPassword="222";
	$scope.init = function() {

		var type = $routeParams.type;
		unLoginvm.userName = $routeParams.un;

		$scope.getUserInit();
		if (type && type == 'findPwd') {// 登录后忘记密码
			$scope.showType = 'findPwd';
		} else if (type && type == 'tel') {// 修改手机
			$scope.showType = 'tel';
		} else if (type && type == 'email') {// 修改邮箱
			$scope.showType = 'email';
		} else if (type && type == 'payPwd') {// 忘记支付密码
			$scope.showType = 'payPwd';
		} else if (type && type == 'bindTel') {// 绑定手机
			$scope.showType = 'bindTel';
		} else if (type && type == 'bindEmail') {// 绑定邮箱
			
			var emailType=document.getQueryStringByName("type");
			if(emailType=='bind'){
				$scope.showType = 'setBindEmail';
			}else if(emailType=='change'){
				$scope.showType = 'upBindEmail';
			}else{
				$scope.showType = 'bindEmail';
			}
			//$scope.showType = 'bindEmail';
		} else if (type && type == 'telBypayPwd') {// 通过验证支付密码 修改手机号
			$scope.showType = 'telBypayPwd';
		} else if (type && type == 'emailBypayPwd') {// 通过验证支付密码 修改邮箱
			$scope.showType = 'emailBypayPwd';
		} else if (type && type == 'payPwdByfindPwd') {// 通过验证支付密码 找回登录密码
			$scope.showType = 'payPwdByfindPwd';
		} else if (type && type == 'emailByfindPwd') {// 通过邮箱 找回登录密码
			if ($routeParams.text) { // 未登陆 已设置邮箱
				$scope.userInfo.email = $routeParams.text;
				$scope.userInfo.userName=$routeParams.userName;
			}
			$scope.showType = 'emailByfindPwd';
		} else if (type && type == 'telByfindPwd') {// 通过手机 找回登录密码
			if ($routeParams.text) {// 未登陆 已绑定手机
				$scope.userInfo.tel = $routeParams.text;
				$scope.userInfo.userName=$routeParams.userName;
			}
			$scope.showType = 'telByfindPwd';
		} else if (type && type == 'setPayPwd') {// 设置支付密码
			$scope.showType = 'setPayPwd';
		} else if (type && type == 'emailBySetPayPwd') {// 通过邮箱 设置支付密码
			$scope.showType = 'emailBySetPayPwd';
		} else if (type && type == 'telBySetPayPwd') {// 通过手机 设置支付密码
			$scope.showType = 'telBySetPayPwd';

		} else if (type && type == 'findPayPwd') {// 忘记支付密码
			$scope.showType = 'findPayPwd';
		} else if (type && type == 'emailByfindPayPwd') {// 通过邮箱 找回支付密码
			$scope.showType = 'emailByfindPayPwd';
		} else if (type && type == 'telByfindPayPwd') {// 通过手机 找回支付密码
			$scope.showType = 'telByfindPayPwd';
		} else if (type && type == 'dt') {// 未登陆忘记密码
			$scope.showType = 'findPwd';
			$scope.userInfo.email = $routeParams.el;
			$scope.userInfo.tel = $routeParams.tl;
			$scope.userInfo.payPassword = $routeParams.pd;
		}else if(type && type=='unbindFail'){//解除绑定邮箱失败
			$scope.showType = 'unbindFail';
		}else if(type && type=='successMail'){//绑定邮箱成功
			var emailType=document.getQueryStringByName("type");
			if(emailType=='bind'){
				$scope.showType = 'bindEmailSuc';
			}else if(emailType=='change'){
				$scope.showType = 'upEmailSuc';
			}
			//$scope.showType = 'bindEmailSuc';
		}else if(type && type=='failMail'){//绑定邮箱失败
			$scope.showType = 'failEmail';
		}else if(type && type=='paySuccess'){//支付宝支付成功
			$scope.showType = 'paySucces';
		}else if(type && type=='payFail'){//支付宝支付失败
			$scope.showType = 'payFail';
		}
	};
	/*-------------------选择身份验证方式start-----------------------------*/

	// 选择验证方式
	$scope.changeStyle = function(id, text) {
		if (!text || text == '0' || text=='false') {
			return;
		}
		var type = $routeParams.type;
		typeId = id;
		for (var i = 1; i < 10; i++) {
			if (id == i) {
				$("#type" + i).addClass("borderColor");
			} else {
				$("#type" + i).removeClass("borderColor");
			}
		}
		if (type && type == 'email' && typeId == '4') {// 修改邮箱 通过支付密码验证修改邮箱
			typeId = '6';
		} else if (type && type == 'tel' && typeId == '4') {// 修改手机 通过支付密码验证修改手机

		} else if (type && type == 'findPwd' && typeId == '4') { // 登录后 忘记密码
			typeId = '7';
		} else if (type && type == 'findPwd' && typeId == '2') { // 登录后 忘记密码
			typeId = '8';
		} else if (type && type == 'findPwd' && typeId == '3') { // 登录后 忘记密码
			typeId = '9';
		} else if (type && type == 'findPayPwd' && typeId == '2') { // 忘记支付密码
			typeId = '10';
		} else if (type && type == 'findPayPwd' && typeId == '3') { // 忘记支付密码
			typeId = '11';
		} else if (type && type == 'dt' && typeId == '4') { // 未登陆 忘记密码 通过支付密码验证
			typeId = '12';
		} else if (type && type == 'dt' && typeId == '2') { // 未登陆 忘记密码 通过邮箱验证
			typeId = '13';
		} else if (type && type == 'dt' && typeId == '3') { // 未登陆 忘记密码 通过手机验证
			typeId = '14';
		} else if (type && type == 'setPayPwd' && typeId == '2') { // 设置支付密码
			typeId = '15';
		} else if (type && type == 'setPayPwd' && typeId == '3') { // 设置支付密码
			typeId = '16';
		}

	};

	// 选择验证方式 下一步
	$scope.next = function() {
		if (!typeId) {
			$rootScope.showToast("至少要选择一种验证方式", 2000);
			return;
		}
		parseType(typeId);
	};

	/*------------------------选择身份验证方式end-----------------------------------------*/

	/*------------------------设置身份验证方式start-----------------------------------------*/
	// 验证登录密码
	$scope.validMethod = function(text) {
		var type = $routeParams.type;
		if(type=='emailBypayPwd'){
			window.location="index.html#secondChangeType/emailBypayPwd?type=change";
			//$location.path("secondChangeType/emailBypayPwd?type=change");
		}else{
			$location.path("secondChangeType/" + type);
		}
	};
	// 下一步 绑定
	$scope.bindSet = function() {
		var type = $routeParams.type;
		$location.path("finishChangeType/" + type);

	};

	/*------------------------设置身份验证方式end-----------------------------------------*/
	/*--------------------------------更换绑定手机号  start-----------------*/
	//绑定邮箱 验证登录密码
	$scope.errorPwdMsg=false;
	upTelvm.setBindValidPwd=function(pwd){
		if (!pwd) {
			$scope.showPwdDiv=true;
			$scope.showPwdMsg="登录密码不能为空";
			return;
		} else{
			$scope.showPwdDiv=false;
			$scope.showPwdMsg="";
		}
		var postValue = {
				url : '../user/validaUserPwd',
				params:{
					userPwd:pwd
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if(res.data.resultCode=='0'){
					$scope.validMethod(); //跳转至下一步
				}else if(res.data.resultCode=='4904'){
					$scope.showPwdDiv=true;
					$scope.showPwdMsg="用户密码错误";
				}else{
					$rootScope.showToast(res.data.resultComment,2000);
				}
				
			});
	};
	// 获取手机验证码(旧手机号)
	upTelvm.getTelCode = function(tel) {
		if (!tel) {
			//console.log("手机号不能为空");
		} else {
			//console.log("发送验证码到" + tel);
		}
		var postValue = {
			url : '../user/sentUnbindPhoneSms', // 发送验证码到手机
			params : {
				tel : tel
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.showTelSpan=false;
				$scope.showTelMsg="";
				$("#upTelNext").attr("disabled",false);
				$scope.timeCountdown();
			}else if(res.data.resultCode == '4600'){
				$scope.countdown=60;
				$scope.showTelSpan=true;
				$scope.showTelMsg="距离上次发送时间不到一分钟，请稍后再试";
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
	// 发送验证码到新的手机号
	$scope.per="";
	upTelvm.getNewTelCode = function(tel) {
		if (!tel) {
			//console.log("手机号不能为空");
		} else {
			//console.log("新手机号 发送验证码到" + tel);
		}
		var postValue = {
			url : '../user/sentBindPhoneSms', // 发送验证码到手机
			params : {
				tel : tel
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.timeCountdown();
				$("#getCodeBtn").attr("disabled",false);
			}else if(res.data.resultCode == '4600'){
				$scope.timeCountdown();
				
			}else if (res.data.resultCode == '4915') {
				$rootScope.showToast(res.data.resultComment,2000);
				$("#getCodeBtn").attr("disabled",true);
			} else {
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
	// 没有收到验证码 重新发送
	upTelvm.reSendTel = function(tel) {
		upTelvm.getTelCode(tel);
	};
	// 下一步 验证手机验证码是否正确
	upTelvm.validMethod = function(tel, code) {
		if (!code) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="验证码不能为空";
			return;
		} else{
			$scope.showTelSpan=false;
			$scope.showTelMsg="";
		}
		var postValue = {
			url : '../user/verifyUnbindPhoneSms',
			params : {
				tel : tel,
				smsCode : code
			}
		};
		$HttpService.post(postValue).then(function(res) {
			// 验证成功 跳转到 绑定新手机号
			if (res.data.resultCode == '0') {
				$scope.validMethod(); // 跳转至下一步
			}else if(res.data.resultCode=='4601' ){
				$rootScope.showToast("校验码超时，请重新获取", 2000);
			}else if(res.data.resultCode=='4602'){
				$scope.showTelSpan=true;
				$scope.showTelMsg="校验码错误";
			}else {
				$rootScope.showToast(res.data.resultComment, 2000);
			}

		});
	};
	// 下一步 验证支付密码是否正确
	$scope.errorPayPwdMsg=false;
	upTelvm.validPayPwd = function(payPwd) {
		if (!payPwd) {
			$scope.errorPayPwdMsg=true;
			$scope.errorMsg="支付密码不能为空";
			return;
		} 
		var un=$routeParams.userName;
		var params={
				userPayPwd : payPwd	
		};
		if(un){
			params["username"]=un;
		}
		 var postValue = {
			url : '../user/validateUserPayPwd',
			params : params
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				// 验证成功 跳转到 绑定新手机号
				if($routeParams.userName){
					$location.path("findPwdTwo/"+$routeParams.type+"/"+$routeParams.userName+"/"+$routeParams.text);
				}else{
					$scope.validMethod();// 跳转至下一步
				}
			}else if (res.data.resultCode == '1'){
				$scope.errorPayPwdMsg=true;
				$scope.errorMsg="支付密码错误";
			} else {
				$rootScope.showToast(res.data.resultComment, 2000);
			}

		});
	};
	// 绑定手机
	upTelvm.bindSet = function(tel, code, type) {
		if (!code) {
			$scope.showCodeSpan=true;
			$scope.showCodeMsg="校验码不能为空";
			return;
		} 
		var postValue = {
			url : '../user/verifyBindPhoneSms',
			params : {
				tel : tel,
				smsCode : code
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				// 绑定成功
				$scope.bindSet(); // 绑定结果
			}else if(res.data.resultCode=='4601' ){
				$rootScope.showToast("校验码超时，请重新获取", 2000);
			}else if(res.data.resultCode=='4602'){
				$scope.showCodeSpan=true;
				$scope.showCodeMsg="校验码错误";
			} else {
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
	};

	/*--------------------------------更换绑定手机号  end--------------------*/
	/*----------------------------------设置绑定邮箱-------------------------*/
	
	//绑定邮箱 验证登录密码
	setEmailvm.setBindValidPwd=function(pwd){
		if (!pwd) {
			$scope.showPwdDiv=true;
			$scope.showPwdMsg="登录密码不能为空";
			return;
		} else{
			$scope.showPwdDiv=false;
			$scope.showPwdMsg="";
		}
		var postValue = {
				url : '../user/validaUserPwd',
				params:{
					userPwd:pwd
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if(res.data.resultCode=='0'){
					$scope.validMethod(); //跳转至下一步
				}else if(res.data.resultCode=='4904'){
					$scope.showPwdDiv=true;
					$scope.showPwdMsg="用户密码错误";
				}else{
					$rootScope.showToast(res.data.resultComment, 3000);
				}
				
			});
	};
	/*--------------------------------绑定邮箱  start----------------------*/
	setEmailvm.reSendEmail=function(email){
		var type=document.getQueryStringByName("type");
		var postValue = {
			url : '../user/sentBindMailEmail',
			params : {
				email : email,
				type: !!type ? type : 'bind'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$rootScope.showToast("重新发送邮件到" + email, 3000);
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	/*--------------------------------绑定邮箱  end----------------------*/
	/*--------------------------------更换绑定邮箱  start-----------------*/
	// 修改绑定邮箱 验证邮箱
	upEmailvm.validMethod = function(email) {
		var postValue = {
			url : '../user/sentUnbindEmail',
		};
		$HttpService.post(postValue).then(function(res) {
			if(res.data.resultCode=='0'){
				$("#myModal2").modal("show");//发送邮件 模态框
			}else{
				$rootScope.showToast(res.data.resultComment, 3000);
			}
			
		});
	};

	// 发送绑定邮件
	upEmailvm.bindSet = function(email) {
		var type=document.getQueryStringByName("type");
		var postValue = {
			url : '../user/sentBindMailEmail',
			params : {
				email : email,
				type: !!type ? type : 'bind'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$("#myModal2").modal("show");
				$scope.bindEmail=email;
			}else if(res.data.resultCode=='1002' || res.data.resultCode=='4906'){
				
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};

	/* 重新发送邮件 */
	upEmailvm.reSendEmail = function(email) {
		var postValue = {
				url : '../user/sentUnbindEmail',
				params : {
					email : email
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#reSendEmailBtn").attr("disabled",true);
					$rootScope.showToast("重新发送邮件到" + email, 3000);
				} else {
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	/*--------------------------------更换绑定手机号  end-----------------*/
	/*--------------------------------修改登录密码 start-----------------*/
	// 找回登录密码  验证短信
	upPwdvm.validMethod = function(tel, code) {
		if (!code) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="验证码不能为空";
			return;
		} else{
			$scope.showTelSpan=false;
			$scope.showTelMsg="";
		}
		var postValue = {
			url : '../user/verifyFindPassSms',
			params : {
				tel : tel,
				smsCode : code
			}
		};
		$HttpService.post(postValue).then(function(res) {
			// 验证成功 跳转到 绑定新手机号
			if (res.data.resultCode == '0') {
				if($routeParams.userName){
					$location.path("findPwdTwo/"+$routeParams.type+"/"+$routeParams.userName+"/"+$routeParams.text);
				}else{
					$scope.validMethod();// 跳转至下一步
				}
			}else if(res.data.resultCode=='4601' ){
				$rootScope.showToast("校验码超时，请重新获取", 2000);
			}else if(res.data.resultCode=='4602'){
				$scope.showTelSpan=true;
				$scope.showTelMsg="校验码错误";
			} else {
				$rootScope.showToast(res.data.resultComment, 2000);
			}

		});
	};
	// 忘记登录密码 通过手机号验证 获取验证码
	upPwdvm.getTelCode = function(userName) {
		var postValue = {
			url : '../user/sentFindPassSms',
			params : {
				username : userName
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.showTelSpan=false;
				$scope.showTelMsg="";
				$("#nextBtn").attr("disabled",false);
				$scope.timeCountdown();
			} else if (res.data.resultCode == '4600') { //距离上次发送时间不足1分钟
				$scope.countdown=60;
				$scope.showTelSpan=true;
				$scope.showTelMsg="距离上次发送时间不到一分钟，请稍后再试";
			} else if(res.data.resultCode=='4100'){
				$rootScope.showToast("发送失败, 请稍后重试", 3000);
			}else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	// 忘记登录密码 通过邮箱验证
	upPwdvm.validByEmail = function(email) {
		var postValue = {
			url : '../user/findPwdEmail',
			params : {
				email : email
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$("#myModal2").modal("show");
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	//忘记登录密码  重新发送邮件
	upPwdvm.reSendEmail=function(email){
		var postValue = {
				url : '../user/findPwdEmail',
				params : {
					email : email
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#reSendEmailBtn").attr("disabled",true);
					$rootScope.showToast("已发送邮件到"+email+",请及时查收", 2000);
				} else {
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	//重新设置登录密码   通过邮箱跳转
	upPwdvm.bindSet = function(pwd, type) {
		var p=document.getQueryStringByName("key");
		var email=document.getQueryStringByName("email");
		var postValue = {
			url : '../user/resetPassByEmail',
			params : {
				key : p, // 该参数会通过url传递
				email:email,
				newPassword : pwd
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				// 绑定成功
				$scope.bindSet(); // 绑定结果
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	upPwdvm.bindSetByTel=function(tel,pwd,type){
		var tel=$routeParams.text;
		var postValue = {
				url : '../user/resetPassword',
				params : {
					tel : tel!=undefined && tel!=null&& tel!='' ? tel:$scope.userInfo.tel, // 该参数会通过url传递
					password : pwd
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					// 绑定成功
					$scope.bindSet(); // 绑定结果
				} else {
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	/*--------------------------------修改登录密码 end-----------------*/
	/*-----------------------------------忘记支付密码 start------------------------*/
	// 设置支付密码
	setPayPwdvm.getTelCode = function() {
		var postValue = {
			url : '../user/sentSetPayPassSms'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.showTelSpan=false;
				$scope.showTelMsg="";
				$("#setPayPwdNext").attr("disabled",false);
				$scope.timeCountdown();
			}else if(res.data.resultCode == '4600'){
				$scope.countdown=60;
				$scope.showTelSpan=true;
				$scope.showTelMsg="距离上次发送时间不到一分钟，请稍后再试";
			}else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	//设置支付密码 验证邮箱
	setPayPwdvm.validByEmail=function(email){
		var postValue={
				url:'../user/sendSetPayPassEmail'
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$("#myModal2").modal("show");
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	//设置支付密码  重新发送邮件
	setPayPwdvm.reSendEmail=function(email){
		var postValue = {
				url : '../user/sendSetPayPassEmail',
				params : {
					email : email
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#reSendEmailBtn").attr("disabled",true);
					$rootScope.showToast("已发送邮件到"+email+",请及时查收", 2000);
				} else {
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	//设置支付密码  发送校验码到手机
	setPayPwdvm.validPayPwdByTel=function(tel,code){
		if (!code) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="验证码不能为空";
			return;
		} else{
			$scope.showTelSpan=false;
			$scope.showTelMsg="";
		}
		var postValue = {
			url : '../user/verifySetPayPassSms',
			params : {
				tel : tel,
				smsCode : code
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.validMethod();  //跳转至下一步
			}else if(res.data.resultCode == '4600'){
				$scope.countdown=60;
			}else if(res.data.resultCode=='4601' ){
				$rootScope.showToast("校验码超时，请重新获取", 2000);
			}else if(res.data.resultCode=='4602'){
				$scope.showTelSpan=true;
				$scope.showTelMsg="校验码错误";
			}  else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
		
	};
	//设置支付密码  通过验证邮箱
	setPayPwdvm.bindSetByEmail=function(payPwd){
		var email=document.getQueryStringByName("email");
		var key=document.getQueryStringByName("key");
		var postValue={
				url:'../user/setPayPassByEmail',
				params:{
					payPass:payPwd,
					email: email,		// 通过url的u参数获取
					key:key		// 通过url的p参数获取
				}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.bindSet(); // 绑定后跳转结果
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	//设置支付密码  通过验证手机号
	setPayPwdvm.bindSetByTel=function(payPwd){
		var postValue={
				url:'../user/resetPayPassword',
				params:{
					newPayPass:payPwd
				}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.bindSet(); // 绑定后跳转结果
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	// 忘记支付密码
	upPayPwdvm.bindSet = function(payPwd) {
		var key=document.getQueryStringByName("key");
		var email=document.getQueryStringByName("email");
		var postValue={
				url:'../user/resetPayPassByEmail',
				params:{
					newPayPass:payPwd,
					email: email,		// 通过url的email参数获取
					key:key		// 通过url的key参数获取
				}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.bindSet(); // 绑定后跳转结果
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	// 忘记支付密码 通过邮箱验证
	upPayPwdvm.validByEmail = function(email) {
		var postValue={
				url:'../user/sentFindPayPassEmail'
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$("#myModal2").modal("show");
			}else{
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});

	};
	//忘记支付密码  重新发送 验证邮箱
	upPayPwdvm.reSendEmail=function(email){
		var postValue={
				url:'../user/sentFindPayPassEmail'
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$("#reSendEmailBtn").attr("disabled",true);
				$rootScope.showToast("已发送邮件到"+email+",请及时查收", 2000);
			}else{
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	// 忘记支付密码 通过手机号验证
	upPayPwdvm.getTelCode = function(tel) {
		if (!tel) {
			//console.log("手机号不能为空");
		} else {
			//console.log("设置支付密码  通过手机号验证  发送验证码到" + tel);
		}
		
		var postValue = {
			url : '../user/sentFindPayPassSms' // 发送验证码到手机
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.showTelSpan=false;
				$scope.showTelMsg="";
				$("#findPayPwdNext").attr("disabled",false);
				$scope.timeCountdown();
			}else if(res.data.resultCode == '4600'){
				$scope.countdown=60;
				$scope.showTelSpan=true;
				$scope.showTelMsg="距离上次发送时间不到一分钟，请稍后再试";
			} else {
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	// 下一步 支付密码 通过手机号验证发送短信
	upPayPwdvm.validPayPwdByTel = function(tel, code) {
		if (!code) {
			$scope.showTelSpan=true;
			$scope.showTelMsg="验证码不能为空";
			return;
		} else{
			$scope.showTelSpan=false;
			$scope.showTelMsg="";
		}
		var postValue = {
			url : '../user/validateFindPayPassSms',
			params : {
				smsCode : code
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.validMethod(); // 跳转至下一步
			}else if(res.data.resultCode=='4601' ){
				$rootScope.showToast("校验码超时，请重新获取", 2000);
			}else if(res.data.resultCode=='4602'){
				$scope.showTelSpan=true;
				$scope.showTelMsg="校验码错误";
			}else{
				$rootScope.showToast(res.data.resultComment, 3000);
			}
		});
	};
	/*-----------------------------------忘记支付密码  end--------------------------------*/
	
	
	//重新绑定邮箱 或 绑定手机号 验证是否已存在
	$scope.checkOnlyName=function(type,text){
		var params={};
		if(type=='email' && text){
			params["email"]=text;
		}else if(type=='tel' && text){
			params["tel"]=text;
		}else{
			$scope.ExistUserName=false;
		}
		var postValue = {
				url : '../user/isTelOrEmailExist',
				params:params
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					$("#getCodeBtn").removeClass("reSetBtn");
					$("#getCodeBtn").attr("disabled",false);
					$scope.ExistUserName=false;
				}else if (res.data.resultCode == '4915') {
					$scope.ExistUserName=true;
					$("#getCodeBtn").addClass("reSetBtn");
					$("#getCodeBtn").attr("disabled",true);
				}  else {
					$rootScope.showToast(res.data.resultComment, 3000);
				}
			});
	};
	/* =========================================util==================================== */
	// 查询用户信息
	$scope.getUserInit = function() {
		// 查询用户信息
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
	// 根据选择的身份验证类型 跳转到不同的页面
	var parseType = function(type) {
		if (type && type == '1') {
		} else if (type && type == '2') {
			$location.path("setChangeType/email");
		} else if (type && type == '3') {
			$location.path("setChangeType/tel");
		} else if (type && type == '4') {// 通过支付密码验证修改手机
			$location.path("setChangeType/telBypayPwd");
		} else if (type && type == '5') {
			window.location='./upgrade.html';
		} else if (type && type == '6') { // 通过支付密码验证修改邮箱
			$location.path("setChangeType/emailBypayPwd");
		} else if (type && type == '7') { // 通过支付密码 找回登录密码
			$location.path("setChangeType/payPwdByfindPwd");
		} else if (type && type == '8') { // 通过邮箱 找回登录密码
			$location.path("setChangeType/emailByfindPwd");
		} else if (type && type == '9') { // 通过手机 找回登录密码
			$location.path("setChangeType/telByfindPwd");

		} else if (type && type == '10') { // 通过邮箱 找回支付密码
			$location.path("setChangeType/emailByfindPayPwd");
		} else if (type && type == '11') { // 通过手机 找回支付密码
			$location.path("setChangeType/telByfindPayPwd");
		} else if (type && type == '12') { // 通过支付密码 找回登录密码
			$location.path("findPwdOne/payPwdByfindPwd/"+$routeParams.un+"/"+$routeParams.tl);
		} else if (type && type == '13') { // 通过邮箱 找回登录密码
			$location.path("findPwdOne/emailByfindPwd/"+$routeParams.un+"/" + $routeParams.el);
		} else if (type && type == '14') { // 通过手机 找回登录密码
			$location.path("findPwdOne/telByfindPwd/"+$routeParams.un+"/" + $routeParams.tl);

		} else if (type && type == '15') { // 通过邮箱 设置支付密码
			$location.path("setChangeType/emailBySetPayPwd");
		} else if (type && type == '16') { // 通过手机 设置支付密码
			$location.path("setChangeType/telBySetPayPwd");
		}
	};
	/*-------------------------------文本框失去焦点事件--------------------------------*/
	//验证登录密码是否正确
	$scope.userPwdBlur=function(){
		$scope.errorPwdMsg=false;
	};
	//验证支付密码是否正确
	$scope.userPayPwdBlur=function(){
		$scope.errorPayPwdMsg=false;
		$scope.errorMsg="";
	};
	/*-----------------------------util-----------------------*/
	
	// 发送短信倒计时
	$scope.countdown = 60;
	$scope.timeCountdown = function() {
		var myTime = setInterval(function() {
			upTelvm.showCode = true;
			$scope.countdown--;
			if ($scope.countdown == 0) {
				upTelvm.showCode = false;
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

});
