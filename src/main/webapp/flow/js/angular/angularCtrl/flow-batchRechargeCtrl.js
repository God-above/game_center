flowApp
		.controller(
				'batchRecharegeController',
				function($scope, $rootScope, $cookieStore, $HttpService,
						$location) {
					var vm = $scope.vm = {};
					var vmList = $scope.vmList = {};
					$scope.upload_params = []; // 每次上传的数据
					$scope.upload_param = []; // 单一上传某一个文件时
					$scope.fileIndex = -1;

					// 这是从之前获取来的
					var currentIndex = 0;
					var historyParams = {};

					// 初始化 方法
					$scope.init = function() {
						for ( var i = 0; i <= 15; i++) {
							$("#text li").eq(i).removeClass("active");
						}
						$("#text li").eq(2).addClass("active");

						$scope.getProductList();
						$scope.nfArray = [];
						for ( var i = 0; i < 1; i++) {
							$scope.nfArray.push({});
						}
						$scope.upload_params = [];
						$scope.upload_param = [];
						$("#batchInfo").hide();
						$("#createBatch").show();
						$("#batchDetail").hide();
					};

					/**
					 * 获取可用的商品列表
					 */

					$scope.getProductList = function() {
						var params = {
								type:parseInt(1),
								status:parseInt(1)
						};
						var postValue = {
							url : '../product/productList',
							params : params,
							rolling : true

						}
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == 0) {
								$scope.products = res.data.resultBody;
							} else {
								$rootScope.showToast(res.data.resultComment,2000);
							}
						});
					}

					/**
					 * 确认批次
					 */
					$scope.confirmBatch = function() {

					};

					/*
					 * 商品变更
					 * 
					 */
					$scope.changeProductNo = function(productNo) {
						if (historyParams.batchNo == undefined) {
						} else {
							$("#firstBtn").attr("disabled", "disabled");
							$("input[name = 'phoneNum']").click();
						}

					};

					$scope.initOrder = function() {
						console.log("订单管理");
					};

					$scope.selectFile = function(obj) {

						if (historyParams.batchNo == undefined) {
							console.log("第一次提交")
							$scope.upload_param.push({
								key : 'productNo',
								value : $scope.productNo
							});
							historyParams["originalProNo"] = $scope.productNo;
							if (obj.files[0]) {
								
								$scope.upload_param.push({
									key : 'file',
									value : obj.files[0]
								});
							}
							
							$scope.upload_params[$scope.fileIndex] = $scope.upload_param;
							$rootScope
									.upload(
											$scope.upload_params,
											'../batch/upload_account',
											function(data) {
												// 文件上传后 回调的数据
												if (data.resultCode == 0) {
													console.log(data);
													$scope.results = data.resultBody;// 获取信息
													$scope.batchNo = $scope.results.batchNo;// 订单编号
													historyParams["batchNo"] = $scope.results.batchNo;

													$scope.parseResult = $scope.results.parseResult;
													document
															.getElementById("validTotal").innerHTML = $scope.parseResult.validTotal;// 充值号码
													document
															.getElementById("total").innerHTML = $scope.parseResult.total;// 总号码
													document
															.getElementById("invalidTotal").innerHTML = $scope.parseResult.invalidTotal;// 总号码
													document
															.getElementById("validCMCCNumbers").innerHTML = $scope.parseResult.validCMCCNumbers.length// 移动号码
													document
															.getElementById("validCUCCNumbers").innerHTML = $scope.parseResult.validCUCCNumbers.length;// 联通号码
													document
															.getElementById("validCTCCNumbers").innerHTML = $scope.parseResult.validCTCCNumbers.length;// 电信号码
													$("#firstBtn").removeAttr(
															"disabled")

												} else {

													$rootScope.showToast(data.resultComment,2000);
													console.log($scope.upload_params)
													$scope.upload_params=[];
													$scope.upload_param=[];
													console.log($scope.upload_params);
												}

											});

							var nf = obj.cloneNode(true);
							obj.parentNode.replaceChild(nf, obj);
						} else {
							console.log("第二次");
							$scope.upload_param = [];
							$scope.upload_param.push({
								key : 'productNo',
								value : $scope.productNo
							});
							$scope.upload_param.push({
								key : 'batchNo',
								value : historyParams.batchNo
							});
							$scope.upload_param.push({
								key : 'originalProNo',
								value : historyParams.originalProNo
							});

							historyParams["originalProNo"] = $scope.productNo;
							if (obj.files[0]) {
								console.log('获取到文件');
								$scope.upload_param.push({
									key : 'file',
									value : obj.files[0]
								});
							}
			
							$scope.upload_params[$scope.fileIndex] = $scope.upload_param;
							$rootScope
									.upload(
											$scope.upload_params,
											'../batch/upload_account',
											function(data) {
												console.log(data)
												// 文件上传后 回调的数据
												if (data.resultCode == 0) {
													$scope.results = data.resultBody;// 获取信息
													$scope.batchNo = $scope.results.batchNo;// 订单编号
													historyParams["batchNo"] = $scope.results.batchNo;

													$scope.parseResult = $scope.results.parseResult;
													document
															.getElementById("validTotal").innerHTML = $scope.parseResult.validTotal;// 充值号码
													document
															.getElementById("total").innerHTML = $scope.parseResult.total;// 总号码
													document
															.getElementById("invalidTotal").innerHTML = $scope.parseResult.invalidTotal;// 总号码
													document
															.getElementById("validCMCCNumbers").innerHTML = $scope.parseResult.validCMCCNumbers.length// 移动号码
													document
															.getElementById("validCUCCNumbers").innerHTML = $scope.parseResult.validCUCCNumbers.length;// 联通号码
													document
															.getElementById("validCTCCNumbers").innerHTML = $scope.parseResult.validCTCCNumbers.length;// 电信号码
													$("#firstBtn").removeAttr(
															"disabled")

												} else {
													$rootScope.showToast(data.resultComment,2000);
													$scope.upload_params=[];
													$scope.upload_param=[];
												}

											});

							var nf = obj.cloneNode(true);
							obj.parentNode.replaceChild(nf, obj);

						}

					};

					$scope.openSecond = function() {
						$("#createBatch").hide();
						$("#batchInfo").show();
					}

					$scope.getBatchName = function() {
						if ($scope.batchName.length > 0) {

							$("#secBtn").removeAttr("disabled")
						} else {

							$("#secBtn").attr("disabled", "disabled")
						}

					}

					// 创建订单

					$scope.conOrderList = function() {
						if (!$scope.batchName) {
							$rootScope.showToast("请输入批次名称",2000);
							return;
						}
						var params = {
							batchNo : $scope.batchNo,
							batchName : $scope.batchName
						}
						var postValue = {
							url : '../batch/create_batch',
							params : params,
							rolling : true

						}
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == 0) {
								console.log(res.data);
								$scope.batchOrder = res.data.resultBody
								$("#batchInfo").hide();
								$("#batchDetail").show();
							} else {
								$rootScope.showToast(res.data.resultComment,2000);
							}
						});
					}

					$scope.clickFile = function(index) {
						$scope.fileIndex = index;
						angular.element('input[type=file]')[index].click();
					};

					$scope.removeFile = function(index) {

						return;
						$scope.nfArray.splice(index, 1);
					};
					$scope.conOrderPay = function() {

						$location.path("confirmOrder/"
								+ $scope.batchOrder.number + "/batch/batch");
					}

				});
