flowApp
		.controller(
				'goodsController',
				function($rootScope,$scope,$HttpService,$routeParams) {
					$scope.currentPage = 1;// 默认分页第一页开始搜索 int类型
					$scope.pageSizeCode = 10;// 每页展示多少条数

					$scope.rememberFJ = ""; // 记录分页的条件

					// 初始化加载
					$scope.init = function() {
						//导航样式,防刷新
						window.scrollTo(0, 0);
						$rootScope.getSign(6,7);
					};
					/*====================================搜索按鈕start===================*/
					// 搜索查询
					$scope.allBtn = function(index, type) {
						var params = {};
						if (type && type == 'page') {
							params = {
								currentPage : 1,
								pageSize : $scope.pageSizeCode
							};
							$scope.currentPage = 1;
						} else {
							params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSizeCode
							};
						}
						 /**
					     * 商品列表
					     * productNo         String   商品编号
					     * productName       String   商品名称
					     * beginPrice        Integer  开始价格（分）
					     * endPrice          Integer  结束价格（分）
					     * beginProCount     Integer  库存下限
					     * endProCount       Integer  库存上限
					     * sortType          String   排序字段（创建时间排序：'create';操作时间排序：'update';默认创建时间）
					     * type              Integer  商品类型     1-虚拟商品；2-券
					     * status            Integer  1-正常   0-禁用
					     * @return
					     */

						var startCreateTime = $('#startCreateTime').val();
						var endCreateTime = $('#endCreateTime').val();
						if (startCreateTime != undefined
								&& startCreateTime != ""
								&& endCreateTime != undefined
								&& endCreateTime != "") {
							var sDate = new Date((startCreateTime).replace(
									/-/g, "/"));
							var eDate = new Date((endCreateTime).replace(
									/-/g, "/"));
							if (sDate > eDate) {
								$rootScope.showToast("开始时间不能大于结束时间", 2000);
								return;
							}
						}

						if ($scope.searchText != undefined
								&& $scope.searchText != "") {
							params['productInfo'] = $scope.searchText;
						}
						;
						if (index && index == 1) {
							if ($scope.creatorId != undefined
									&& $scope.creatorId != "") {
								params['creatorId'] = $scope.creatorId;
							}
							if (startCreateTime != undefined
									&& startCreateTime != "") {
								params['startTime'] = startCreateTime;
							}
							if (endCreateTime != undefined
									&& endCreateTime != "") {
								params['endTime'] = endCreateTime;
							}
							if ($scope.status != undefined
									&& $scope.status != "") {
								params['status'] = $scope.status;
							}
							if ($scope.productType != undefined
									&& $scope.productType != "") {
								params['type'] = $scope.productType;
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
							if ($scope.remark != undefined
									&& $scope.remark != "") {
								params['disableReason'] = $scope.remark;
							}

						}

						$scope.rememberFJ = params;
						var postValue={
								url:'../product/productList',
								params:params
						};
						$HttpService.post(postValue).then(function(res){
							if(res.data.resultCode=='0'){
								console.log(res.data);
								$scope.pageInfo=res.data.pageInfo;
								if($scope.pageInfo!=undefined){
									$scope.totalPage = $scope.pageInfo.totalPage;
								}
								$scope.productLists=res.data.resultBody;
								if($scope.productLists.length>0){
									$scope.createPages();
								}else{
									$rootScope.showToast("无符合当前搜索条件的结果！",2000);
								}
							}else{
								$rootScope.showToast(res.data.resultComment,2000);
							}
						});
					};
					/*====================================搜索按鈕end===================*/
					/*=============================修改 商品  start========================*/
					$scope.editGoods=function(){
						var productNo=$routeParams.goodsNo;
						var postValue={
								url:'../product/getProductInfo',
								params:{
									productNo:productNo
								}
						};
						$HttpService.post(postValue).then(function(res){
							console.log(res.data);
							if(res.data.resultCode==0){
								$scope.product=res.data.resultBody;
							}else{
								$rootScope.showToast(res.data.resultComment,2000);
							}
						});
						
					};
					$scope.updateGoods=function(){
						/**
					     * 修改商品状态
					     * productNo       String    商品编号
					     * productName       String    商品名称
					     * type     Integer   商品类型     1-虚拟商品；2-券
					     * price     Integer   价格（分）
					     * proCount    Integer   数量
					     * accountType   Integer   帐号类型
					     * verifyType   Integer   帐号检测类型（移动、联通...号段验证等）
					     * source    String     来源
					     * remark    String    备注
					     * status          Integer   状态      （1：启用；0：禁用）
					     * disableReason        String    禁用原因
					     * @return
					     */
						if(!$scope.product || !$scope.product.productName){
							$rootScope.showToast("商品名称不能为空！",2000);
							return;
						}
						if(!$scope.product || !$scope.product.price){
							$rootScope.showToast("商品价格不能为空！",2000);
							return;
						}else if($scope.product.price){
							if(isNaN($scope.product.price)){
								$rootScope.showToast("请输入正确的商品价格！",2000);
								return;
							}
						}
						var params={
								productNo:$scope.product.productNo,
								productName:$scope.product.productName,
								type:$scope.product.type,
								price:$scope.product.price,
								accountType:$scope.product.accountType,
								remark:$scope.product.remark,
								status:$scope.product.status,
								disableReason:$scope.product.disableReason
						};
						var postValue={
								url:'../product/updateProduct',
								params:params,
								rolling:true
								
						};
						$HttpService.post(postValue).then(function(res){
							console.log(res.data);
							if(res.data.resultCode==0){
								$rootScope.showToast("修改成功！",2000);
							}else if(res.data.resultCode=='1201'){
								window.location.href="login.html";
							}else{
								$rootScope.showToast(res.data.resultComment,2000);
							}
						});
					};
					/*=============================修改 商品  end  ========================*/
					
					
					/*=============================禁用/启用   商品 start =======================*/
					$scope.changState=function(type, good){
						$scope.platformGood = good;
						if ($scope.platformGood.status == 0) {
							$rootScope.showDialog("确认信息", "确定要启用吗?");
							$rootScope.save_type = type;
							$rootScope.update_no = $scope.platformGood.productNo;
							$rootScope.update_status = 1;
						} else {	
							$rootScope.showDialog("确认信息", "确定要禁用吗?");
							$rootScope.save_type = type;
							$rootScope.update_no = $scope.platformGood.productNo;
							$rootScope.update_status = 0;
						}
					};
					/*
					 * 禁用原因
					 */
					$rootScope.showProReason=function(){
						if($rootScope.update_status=='0'){
							$("#newmyModal").modal("show");
							$rootScope.newshowpupupDiv=true;
							$rootScope.hideDialog();
							$scope.disReason="";
						}
					};
					$rootScope.updateProStatus=function(){
						var status=$rootScope.update_status;
						var productNo=$rootScope.update_no;
				
						var params={
								productNo : productNo,
								status:parseInt(status)
						};
						if($rootScope.update_status=='0'){
							if(!$scope.disReason){
								$rootScope.showToast("禁用原因不能为空",2000);
								return;
							}
							if($scope.disReason && $scope.disReason.length>20){
								$rootScope.showToast("禁用原因长度过长",2000);
								return;
							}
							params["disableReason"]=$scope.disReason;
						}
						var postValue={
								url:'../product/updateProductStatus',
								params:params
						};
						$HttpService.post(postValue).then(function(res){
							console.log(res.data);
							if(res.data.resultCode==0){
								$rootScope.showToast("修改成功", 2000);
								$scope.platformGood.status=status;
								$scope.platformGood.disableReason=$scope.disReason;
							}else{
								$rootScope.showToast(res.data.resultComment, 2000);
							}
							$("#newmyModal").modal("hide");
							$rootScope.hideDialog();
						});

						
					};
					/*=============================禁用/启用   商品 end =======================*/
					
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
						params=$scope.rememberFJ;
						params["currentPage"]=index;
						$scope.currentPage = index;
						var postValue={
								url:'../product/productList',
								params:params,
								rolling:true
						};
						$HttpService.post(postValue).then(function(res){
							if(res.data.resultCode=='0'){
								$scope.pageInfo=res.data.pageInfo;
								if($scope.pageInfo!=undefined){
									$scope.totalPage = $scope.pageInfo.totalPage;
								}
								$scope.productLists =res.data.resultBody;
								$scope.createPages();
							}else{
								$rootScope.showToast(res.data.resultComment,2000);
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

				});
