flowApp.controller('cardExchangeController', function($rootScope, $scope,
		$cookieStore,$HttpService,$timeout) {
	var vm = $scope.vm = {};// 流量卡兑换
	$scope.upload_params = []; // 每次上传的数据
	$scope.upload_param = []; // 单一上传某一个文件时
	$scope.fileIndex = -1;
	var bacthNo;
	var total =document.getElementById("total");
	var successCount =document.getElementById("successCount");
	var faildCount =document.getElementById("faildCount");
	
	vm.init=function(){
		angular.element('#showLoading').hide();
		//初始化
		$scope.successCount=0;
		$scope.faildCount=0;
		//初始化上传
		$scope.upload_params = [];
		$scope.upload_param = [];
		
		$scope.nfArray = [];
		for ( var i = 0; i < 1; i++) {
			$scope.nfArray.push({});
		}
		
		$scope.confirmBtn = false;
	}
	//上传文件
	$scope.clickFile = function(index) {
		if($scope.cardName){
			$scope.uploadError=false;
			$scope.uploadErrorMsg="";
		}else{
			$scope.uploadError=true;
			$scope.uploadErrorMsg="请输入上传文件命名";
			return;
		}
		$scope.fileIndex = index;
		angular.element('input[type=file]')[index].click();
	};
	
	
	$scope.showToast = function(text,time){
		angular.element('#drag').show();
		angular.element('#drag').html(text);
		angular.element('#drag').removeClass("ng-hide");
		$timeout($scope.hideToast,time);
	};

	$scope.hideToast = function(){
		angular.element('#drag').hide();
		angular.element('#drag').html('');
	};
	
	$scope.selectFile = function(obj) {
		$scope.upload_param.push({
			key : 'exchangeBatchName',
			value : $scope.cardName
		});
		var fileName = obj.files[0].name;
		if (/.{1,}\.xls$/.test(fileName) == false && /.{1,}\.xlsx$/.test(fileName) == false) {
			$scope.showToast("上传的文件必须是   .xls格式",2000);
			return;
		}
		
		angular.element('#showLoading').show();
		
		$scope.upload_param.push({
				key : 'file',
				value : obj.files[0]
			});
	
		$scope.upload_params[$scope.fileIndex] = $scope.upload_param;
		$rootScope.upload($scope.upload_params,'../coupon/uploadConvertExcel',function(data) {
				angular.element('#showLoading').hide();
				angular.element('#confirmBtn').attr("disabled",false);
							if(data.resultCode==1){
								successCount.innerHTML = data.resultBody.validateTotal;// 充值号码
								faildCount.innerHTML = data.resultBody.inValidateTotal;// 充值号码
								total.innerHTML = data.resultBody.tatal;// 充值号码
								bacthNo  = data.resultBody.exchangeBatchNo;
								$scope.upload_params=[];
								$scope.upload_param=[];
										if( data.resultBody.inValidateTotal > 0){
											document.getElementById("failBtn").disabled=false; 
											document.getElementById("failBtn").setAttribute("href","../coupon/downloadExchangeResult?type=invalid&couponBatchNo="+data.resultBody.exchangeBatchNo); 
										}
										if( data.resultBody.validateTotal > 0){
											document.getElementById("successBtn").disabled=false;
											document.getElementById("successBtn").setAttribute("href","../coupon/downloadExchangeResult?type=valid&couponBatchNo="+data.resultBody.exchangeBatchNo); 
											
										}
								
							}else{
								$scope.showToast(data.resultComment,2000);
							}
							var nf = obj.cloneNode(true);
							obj.parentNode.replaceChild(nf, obj);
							
		});
		
	};
	
	
	$scope.confirmBtn = false;
	$scope.reExchange = function(){
		if(!bacthNo){
			$rootScope.showToast("请先上传文件",2000);
			return;
		}
		
		if($scope.confirmBtn){
			$rootScope.showToast("兑换正在进行，请稍后",2000);
			return;
		}
		
		angular.element('#confirmBtn').attr("disabled",true);
		$rootScope.showToast("已发起确认兑换请求，请稍后查看充值结果",2000);
		$scope.confirmBtn = true;
		
		var postValue = {
				url : '../coupon/confirmExchange',
				params : {
					couponBatchNo : bacthNo
				},
				rolling : true
			};
			$HttpService.post(postValue).then(function(res) {
				$scope.confirmBtn = false;
				if(res.data.resultCode == 1){
//					$rootScope.showToast("后台处理成功",2000);
				}else{
					$rootScope.showToast(res.data.resultComment,2000);
				}
			});
	};
	
	//移除上传的文件
	$scope.removeFile=function(){
		console.log($scope.phoneNum);
	};
	
	//清空上传的手机号
	$scope.clearAll=function(){
		successCount.innerHTML = 0;
		faildCount.innerHTML = 0;
		total.innerHTML = 0;
		$scope.upload_params = []; 
		$scope.upload_param = []; 
	};
});
