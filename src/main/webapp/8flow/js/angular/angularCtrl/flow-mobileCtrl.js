flowApp.controller('mobileController', function($rootScope, $scope,FileUploader,
		$cookieStore) {
	$scope.uploadFile={};
	var um=$scope.um=[];
	$scope.cmccCount=0;
	$scope.cuccCount=0;
	$scope.dxCount=0;
	$scope.invalidCount=0;
	var upList=[{phoneType:'中国移动',count:'44'},{phoneType:'中国联通',count:'33'},
	            {phoneType:'中国电信',count:'22'},{phoneType:'无效号码',count:'10'}];

	//上传文件
	$scope.clickFile=function(){
		angular.element('input[type=file]').click();
		$scope.successCount=9000;
		$scope.faildCount=1233;
		
	};
	
	$scope.selectFile = function(obj) {
		console.log(obj.files[0].size);
		angular.element('#fileName').html(obj.files[0].name);
		$scope.phoneNum=obj.files[0];
		
	};
	//移除上传的文件
	$scope.removeFile=function(){
		console.log($scope.phoneNum);
	};
	//清空上传的手机号
	$scope.clearAll=function(){
		$scope.successCount=0;
		$scope.faildCount=0;
	};
	
});

