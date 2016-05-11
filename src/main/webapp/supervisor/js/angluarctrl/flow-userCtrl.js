flowApp.controller('userController', function($rootScope, $scope,$HttpService,$location) {

	$scope.currentPage = 1;
	$scope.pageSizeCode = 10;// 每页展示多少条数
	$scope.searchParams="";   //记录分页查询的条件
	// 初始化加载
	$scope.init = function() {
			//导航样式,防刷新
			window.scrollTo(0, 0);
			$rootScope.getSign(10,11);
	};
	$scope.initRep=function(){
		//导航样式,防刷新
		window.scrollTo(0, 0);
		$rootScope.getSign(10,12);
	};
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	if($scope.searchParams){
            		$scope.searchbtn($scope.paginationConf.currentPage);
            	}
            }
        };
	/**
     * 用户列表
     * userInfo          String   用户帐号
     * userCode    		String   用户编号
     * status          Integer  状态
     * userType       Integer  用户类型  1-个人用户；2-公司用户；3-管理员
     * beginTime       String   创建开始时间
     * endTime         String   创建结束时间
     * sortType          String   排序字段（创建时间排序：'create';操作时间排序：'update';默认创建时间）
     * @return
     */
	$scope.searchbtn = function(index,type) {
		if(type && (type=='user' || type =='reg')){
			$scope.currentPage = 1;
			$scope.paginationConf.currentPage=1;
		}
		var params = {
			currentPage : index,
			pageSize : $scope.pageSizeCode
		};
		if(type && type=='user' || $scope.searchParams.userType==3){
			params['userType'] = 3;
		}else if(index && index==2 || $scope.searchParams.userType==0){
			params['userType'] = 0;
		}
		if ($scope.searchText != undefined && $scope.searchText != null
				&& $scope.searchText != "") {
			params["userInfo"] = $scope.searchText;
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
			params['beginPrice'] = $scope.minPrice;
		}
		if ($scope.maxPrice != undefined
				&& $scope.maxPrice != "") {
			params['endPrice'] = $scope.maxPrice;
		}
		if ($scope.userType != undefined
				&& $scope.userType != "") {
			params['userType'] = $scope.userType;
		}
		if ($scope.disableReason && $scope.status == '0') {
			params["disableReason"] = $scope.disableReason;
		}

		$scope.searchParams = params;
		var postValue={
				url:'../user/userPage',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				$scope.userList=res.data.resultSet;
				if($scope.userList.length>0){
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！",2000);
				}
			}else if(res.data.resultCode=='2004'){
				$rootScope.showToast("该用户没有管理权限！",3000);
				setTimeout(function(){
					window.location.href="login.html";	
				}, 3000);
			}else{
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
	};
	/* =======================搜索查询列表 end================== */
	/*=====================修改用户状态 start===================*/
	$scope.updateStatus = function(type, user) {
		$scope.platformUser = user;
		if ($scope.platformUser.status == 0) {
			$rootScope.showDialog("确认信息", "确定要启用吗?");
			$rootScope.save_type = type;
			$rootScope.update_no = $scope.platformUser.userCode;
			$rootScope.update_status = 1;
		} else {
			$rootScope.showDialog("确认信息", "确定要禁用吗?");
			$rootScope.save_type = type;
			$rootScope.update_no = $scope.platformUser.userCode;
			$rootScope.update_status = 0;
		}
	};
	/*
	 * 禁用原因
	 */
	$rootScope.showUserReason = function() {
		if ($rootScope.update_status == '0') {
			$("#newmyModal").modal("show");
			$rootScope.newshowpupupDiv = true;
			$rootScope.hideDialog();
			$scope.disReason = "";
		}
	};
	$rootScope.updateUserStatus = function() {
		/**
	     * 修改用户状态
	     * userCode       String    用户编号
	     * status          Integer   状态      （1：启用；0：禁用）
	     * disableReason        String    禁用原因
	     * @return
	     */
		var userId = $rootScope.update_no;
		var status = $rootScope.update_status;
		var params = {
			userCode : userId,
			status : status
		};
		if ($rootScope.update_status == '0') {
			if (!$scope.disUserReason) {
				$rootScope.showToast("禁用原因不能为空", 2000);
				return;
			}
			if ($scope.disUserReason && $scope.disUserReason.length > 20) {
				$rootScope.showToast("禁用原因长度过长", 2000);
				return;
			}
			params["disableReason"] = $scope.disUserReason;
		}
		var postValue={
				url:'../user/updateUserStatus',
				params:params
		};
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode==0){
				$rootScope.showToast("修改成功", 2000);
				 $scope.platformUser.status=status;
				 $scope.platformUser.disableReason=$scope.disUserReason;
			}else{
				$rootScope.showToast(res.data.resultComment, 2000);
			}
			$("#newmyModal").modal("hide");
			$rootScope.hideDialog();
		});
	};
	/* ====================修改用户状态  end======================*/
	/*======================查看充值记录 start=================*/
	$scope.showRechcord=function(userCode){
		var params = {
				userCode:userCode,
				flowAssetType:1
			};
			var postValue={
					url:'../user/getUserAssetList',
					params:params
			};
			$HttpService.post(postValue).then(function(res){
				if(res.data.resultCode=='0'){
					$scope.userRecordList=res.data.resultSet;
					if($scope.userRecordList.length>0){
						$location.path("userRecord/"+userCode);
					}else{
						$rootScope.showToast("该用户没有查询到充值记录！",2000);
						return;
					}
				}else if(res.data.resultCode=='1201'){
					window.location.href="login.html";						
				}else{
					$rootScope.showToast(res.data.resultComment,2000);
				}
			});
	};
	/*======================查看充值记录 end=================*/

});
