flowApp.controller('userRechargeCtrl', function($rootScope, $scope,$HttpService,$routeParams) {

	$scope.currentPage = 1;
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.searchParams="";   //记录分页查询的条件
	// 初始化加载
	$scope.init = function() {
		window.scrollTo(0, 0);
		$scope.userCode=$routeParams.userNo;
	};
	
	
	/*==============用户充值============*/
	/**
     * 用户余额充值
     chargeUserCode           - 待充值用户的用户名(String)
     * assetType                - 待充值的资产类型(int), 参考{@link AssetTypeEnum}
     * amount                   - 充值金额(int), 当assetType为余额时单位为分
     */
	$scope.addRecharge=function(){
		if ($scope.bankroll) {
			if (isNaN($scope.bankroll)) {
				$rootScope.showToast("请输入正确的金额!", 2000);
				return;
			}
		}else{
			$rootScope.showToast("请输入充值金额!", 2000);
			return;
		}
		var params={
				chargeUserCode:String($routeParams.userNo),
				assetType:parseInt(2),
				amount:parseInt($scope.bankroll*100)
		};
		var postValue={
				url:'../admin/chargeCustomer',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$rootScope.showToast("充值成功!", 2000);
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
		});
		
	};
	$scope.initRecord = function() {
		$scope.getTypeEnums();//获取资产类型
		$scope.getStatusEnums();//获取支付状态枚举
		$scope.searchbtn();
	};
	/* =======================搜索查询列表 start================== */
	$scope.searchbtn = function() {
		$scope.currentPage = 1;
		
		/**
	     * 获取用户充值记录
	     * userCode       String    用户编号 （必填）
	     * flowAssetType     Integer   （参照AssetTypeEnum：1- "积分"  2-"余额"）
	     * type           Integer   （参照AssetFlowTypeEnum：1- "充值余额"  2-"充值积分"）
	     * beginAmount       Integer  开始价格（分）
	     * endAmount         Integer  结束价格（分）
	     * beginTime       String   开始时间
	     * endTime         String   结束时间
	     * @throws IOException 
	     */

		var params = {
			currentPage : 1,
			pageSize : $scope.pageSizeCode,
			userCode:$routeParams.userCode
		};
		if ($scope.searchText != undefined && $scope.searchText != null
				&& $scope.searchText != "") {
			params["searchInfo"] = $scope.searchText;
		}
		if ($scope.status != undefined && $scope.status != null
				&& $scope.status != "") {
			params["status"] = parseInt($scope.status);
		}

		var start_time = $('#start_time').val();
		var end_time = $('#end_time').val();
		if (start_time != undefined && end_time != ""
				&& start_time != undefined && end_time != "") {
			var sDate = new Date((start_time).replace(/-/g, "/"));
			var eDate = new Date((end_time).replace(/-/g, "/"));
			if (sDate > eDate) {
				$rootScope.showToast("开始时间不能大于结束时间", 2000);
				return;
			}
		}
		if ($('#start_time').val()) {
			params["beginTime"] = $('#start_time').val();
		}

		if ($('#end_time').val()) {
			params["endTime"] = $('#end_time').val();
		}
		
		if ($scope.minPrice!=undefined  || $scope.maxPrice!=undefined) {
			if (isNaN($scope.minPrice)
					|| isNaN($scope.maxPrice)||isNaN($scope.minPrice)>isNaN($scope.maxPrice)) {
				$rootScope.showToast("请输入正确的价格!", 2000);
				return;
			}else{
				if(parseInt($scope.minPrice)>parseInt($scope.maxPrice)){
					$rootScope.showToast("请输入正确的价格范围!", 2000);
					return;
				}
			}
		}
		if ($scope.minPrice != undefined
				&& $scope.minPrice != "") {
			params['beginAmount'] = $scope.minPrice;
		}
		if ($scope.maxPrice != undefined
				&& $scope.maxPrice != "") {
			params['endAmount'] = $scope.maxPrice;
		}
		if ($scope.flowType != undefined
				&& $scope.userType != "") {
			params['type'] = $scope.flowType;
		}
		
		$scope.searchParams = params;
		var postValue={
				url:'../user/getUserAssetList',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.userRecordList=res.data.resultSet;
				if($scope.userRecordList.length>0){
					$scope.createPages();
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！",2000);
				}
			}else{
				$rootScope.showToast(res.data.resultComment);
			}
		});
	};
	/* =======================搜索查询列表 end================== */
	
	
	/*---------------------------------------------------------分页start------------------*/
	//分页跳转
	$scope.switchPagePrize=function(index){
		if ($scope.currentPage == index) {
			if(index==1){
				$rootScope.showToast("已经是首页", 2000);
				return;
			}
			if(index==$scope.totalPage){
				$rootScope.showToast("已经是末页", 2000);
				return;
			}
			return;
		}
		if(index==undefined||index > $scope.totalPage){
			$rootScope.showToast("请输入正确的页码", 2000);
			return;
		}
		if (!index) {
			$scope.currentPage = 1;
		} else {
			$scope.currentPage = index;
		}
		params=$scope.searchParams;
		params["currentPage"]=index;
		$scope.currentPage = index;
		var postValue={
				url:'../user/getUserAssetList',
				params:params,
				rolling:true
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$scope.pageInfo=res.data.pageInfo;
				if($scope.pageInfo!=undefined){
					$scope.totalPage = $scope.pageInfo.totalPage;
				}
				$scope.userRecordList =res.data.resultSet;
				$scope.createPages();
			}else{
				$rootScope.showToast(res.data.resultComment);
			}
		});
	};
	$scope.pages = [];
	$scope.createPages = function() {
		$scope.pages=[];
		// 以当前页为中心，向两边扩展
		var start = $scope.currentPage - 2;
		var end = $scope.currentPage + 2;
		// 起点小于1
		if (start < 1 && $scope.totalPage >= 5) {
			start = 1;
			end = 5;
		}
		
		if(start < 1 && $scope.totalPage < 5){
			start = 1;
			end = $scope.totalPage;
		}
		
		// 终点大于总页
		if (end > $scope.totalPage && $scope.totalPage > 5) {
			end = $scope.totalPage;
			start = $scope.totalPage - 4;
		}
		
		if (end > $scope.totalPage && $scope.totalPage <= 5) {
			end = $scope.totalPage;
			start = 1;
		}
		
		for (start; start <= end; start++) {
			var j = {
				value : start,
				name : start
			};
			$scope.pages.push(j);
		}
	};
	/*---------------------------------------------------------页面跳转end------------------*/
	
	/*-----------------------------枚举类start--------------------------------*/
	/*
	 * 获取用户资产类型assetFlowType
	 */
	$scope.getTypeEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'assetFlowType'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.flowTypes = res.data.resultBody;
			}
		});
	};
	/*
	 * 根据用户资产类型
	 */
	$scope.getTypeStr = function(statu) {
		for ( var i = 0; i < $scope.flowTypes.length; i++) {
			if (statu == $scope.flowTypes[i].code) {
				return $scope.flowTypes[i].description;
			}

		}
	};
	/*
	 * 获取资金状态assetFlowType
	 */
	$scope.getStatusEnums = function() {
		var postValue = {
			url : '../order/getEnums',
			params : {
				name : 'assetFlowStatus'
			}
		};
		$HttpService.post(postValue).then(function(res) {
			if (res.data.resultCode == '0') {
				$scope.payStatusList = res.data.resultBody;
			}
		});
	};
	/*
	 * 根据用户资产类型
	 */
	$scope.getStatuStr = function(statu) {
		for ( var i = 0; i < $scope.payStatusList.length; i++) {
			if (statu == $scope.payStatusList[i].code) {
				return $scope.payStatusList[i].description;
			}

		}
	};
	/*---------------------------枚举类end------------------------------*/

});
