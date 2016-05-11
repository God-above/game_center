/**
 * 券注入方法
 * 
 */
flowApp.controller('couponController', function($scope, $rootScope,$HttpService,$routeParams) {

	var vm = $scope.vm = {};
	var cdvm = $scope.cdvm = {};
	$scope.pageSizeCode=10;
	$scope.rememberFJ="";
	vm.coupon=function(){
		$rootScope.getSign(6,1);
	};
	
	/*---------------------------分页信息------------------------------*/
	$scope.paginationConf={};
	$scope.paginationConf = {
			itemsPerPage:10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function(){
            	if($scope.rememberFJ){
            		vm.batchBtn($scope.paginationConf.currentPage);
            	}
            }
        };
	/**
     * 分页查询券
     *
     * 非必填参数:
     * state            - 状态(int), 1:可用  2:已过期  3:未开始  4:已消费
     * name       - 券名称(String), 非模糊匹配
     * couponCode       - 券编号(String)
     * isAlive          - 是否通用(int) 0:禁用 1:正常
     * orderNo          - 订单编号(String)
     * currentPage      - 当前页(int), 默认为1
     * pageSize         - 每页数据条数(int), 默认为10
     *
     * @return
     */
	vm.batchBtn=function(index,type){
		if(type && type=='btn'){
			$scope.currentPage = 1;
			$scope.paginationConf.currentPage=1;
		}
		
		var params = {
			currentPage : index,
			pageSize : $scope.pageSizeCode
		};
		if(vm.searchNo){
			params["couponCode"]=vm.searchNo;
		}
		if(vm.searchName){
			params["name"]=vm.searchName;
		}
		if(vm.status){
			params["state"]=parseInt(vm.status);
		}
		if(vm.isAlive){
			params["isAlive"]=parseInt(vm.isAlive);
		}
		
		$scope.rememberFJ=params;
		var postValue={
				url:'../admin/getCouponList',
				params:params,
				rolling:true
		};
		
		$HttpService.post(postValue).then(function(res){
			if(res.data.resultCode=='0'){
				vm.couponList=res.data.resultSet;
				if(vm.couponList.length>0){
					$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
				}else{
					$rootScope.showToast("无符合当前搜索条件的结果！",2000);
				}
			}else if(res.data.resultCode=='2004'){
				$rootScope.showToast("该用户没有管理权限！",3000);
				setTimeout(function(){
					window.location.href="login.html";	
				}, 3000);
										
				console.log(res.data);
			}else{
				$rootScope.showToast(res.data.resultComment,2000);
			}
		});
		
	};
	/*------------------------------------------优惠券详情------------------------------------*/
	cdvm.couponDetailInit=function(){
		cdvm.getCouponDetail();
	};
	cdvm.getCouponDetail=function(){
		var postValue = {
				url : '../admin/getCouponInfo',
				params : {
					couponNo : $routeParams.couponNo
				}
			};
			$HttpService.post(postValue).then(function(res) {
				if (res.data.resultCode == '0') {
					cdvm.couponDetail=res.data.resultBody;
				}
			});
	};

});
