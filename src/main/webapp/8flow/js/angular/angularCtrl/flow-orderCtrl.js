flowApp
		.controller(
				'orderController',
				function($rootScope, $scope, $cookieStore, $location,
						$HttpService) {
					var vm = $scope.vm = {};// 用户函数方法集合
					var om = $scope.om = {};
					var tm = $scope.tm = {};
					$scope.currentPage = 1;
					$scope.pageSize = 10;
					vm.tabContent = 0;
					vm.historyParams = "";
					vm.historyParams.params = "";

					vm.initOrder = function() {
						vm.showTab("0");
						vm.tabContent = 0;
						vm.getBatchStatusEnums();
						vm.getSingleStatusEnums();
						vm.getBackStatusEnums();
					};

					vm.showTab = function(count) {
						vm.tabContent = count;
						$scope.paginationConf.currentPage = 1;
						$scope.currentPage = 1;
						if (count == 0) {
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize
							};
							var postValue = {
								url : '../coupon/queryCouponBatchAndOrders',
								params : params,
								rolling : true
							};
							om.serchContent="";
							$("#o_start_time").val("");
							$("#o_end_time").val("");

							console.log(postValue);
							vm.getOrder(postValue);
						}
						if (count == 1) {
							$scope.paginationConf.currentPage = 1;
							$scope.currentPage = 1;
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize,

							}
							var postValue = {
								url : '../order/orderPage',
								params : params,
								rolling : true
							};
							$scope.serchContent="";
							$("#t_start_time").val("");
							$("#t_end_time").val("");
							console.log(postValue);
							vm.getOrder(postValue);
						}

						if (count == 2) {
							$scope.paginationConf.currentPage = 1;
							$scope.currentPage = 1;
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize
							};
							var postValue = {
								url : '../coupon/queryBackCardBatchAndOrder',
								params : params,
								rolling : true
							};
							tm.serchContent="";
							$("#tm_start_time").val("");
							$("#tm_end_time").val("");
							vm.getBackOrder(postValue);
						}
						;
					};

					vm.btnSeach = function(obj, index) {
						if (index && index == '1') {
							$scope.currentPage = 1;
							vm.historyParams.params.currentPage = 1;
						}
						if (obj == 'single') {
							var beginTime = angular.element("#t_start_time")
									.val();
							var endTime = angular.element("#t_end_time").val();
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize
							}
							if ($scope.serchContent) {
								params['searchInfo'] = $scope.serchContent;
							}
							if (beginTime) {

								beginTime = beginTime + " 00:00:00";
								params['beginTime'] = beginTime;

							}
							if (endTime) {
								endTime = endTime + " 23:59:59";
								params['endTime'] = endTime;
							}
							if (vm.status) {
								params["status"] = vm.status;
							}
							console.log("-----------------------------------");
							console.log(params);
							var postValue = {
								url : '../order/orderPage',
								params : params
							};
							console.log(postValue);
							vm.getOrder(postValue);

						}

						if (obj == 'total') {
							var beginTime = angular.element("#o_start_time")
									.val();
							var endTime = angular.element("#o_end_time").val();
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize
							};

							if (om.serchContent) {
								if (om.serchContent.length >= 15) {
									params['couponBatchNo'] = om.serchContent;
								} else {
									params['productName'] = om.serchContent;
								}
							}

							if (beginTime) {
								params["buyStartDate"] = beginTime;

							}
							if (endTime) {
								params["buyEndDate"] = endTime;
							}
							if (om.status) {
								params["state"] = om.status;
							}

							var postValue = {
								url : '../coupon/queryCouponBatchAndOrders',
								params : params
							};

							vm.getOrder(postValue);
						}

						if (obj == 'detail') {
							var beginTime = angular.element("#tm_start_time")
									.val();
							var endTime = angular.element("#tm_end_time").val();
							var params = {
								currentPage : $scope.currentPage,
								pageSize : $scope.pageSize
							};

							if (tm.serchContent) {
								params['couponBatchNo'] = tm.serchContent;
							}

							if (beginTime) {
								params["createStartDate"] = beginTime;

							}
							if (endTime) {
								params["createEndDate"] = endTime;
							}
							if (tm.status) {
								params["status"] = parseInt(tm.status);
							}

							var postValue = {
								url : '../coupon/queryBackCardBatchAndOrder',
								params : params
							};

							vm.getBackOrder(postValue);
						}

					};
					$scope.paginationConf = {
						itemsPerPage : 10,
						perPageOptions : [ 10, 20, 30, 40, 50 ],
						onChange : function() {
							if (vm.historyParams) {
								 vm.historyParams.params.currentPage=$scope.paginationConf.currentPage;
								if (vm.tabContent == 2) {
									vm.getBackOrder(vm.historyParams);
								} else {
									vm.getOrder(vm.historyParams);
								}
							} else {
								$scope.paginationConf.currentPage = 1;
								vm.btnSeach();
							}

						}
					};

					// 默认获取订单信息 流量卡订单
					vm.getOrder = function(params) {
						$HttpService
								.post(params)
								.then(
										function(res) {
											if (vm.tabContent == 1) {
												if (res.data.resultCode == "0") {
													$scope.singleOrder = res.data.resultSet;
													vm.historyParams = params;
													$scope.paginationConf.totalItems = res.data.pageInfo.totalCount;
												}

											} else if (vm.tabContent == 0) {
												if (res.data.resultCode == "1") {
													vm.batchOrder = res.data.resultBody.orderList;
													vm.historyParams = params;
													$scope.paginationConf.totalItems = res.data.pageInfo.totalCount;
												} else {
													vm.batchOrder = [];
												}
											}

										});

					};

					vm.getBackOrder = function(params) {
						$HttpService
								.post(params)
								.then(
										function(res) {
											if (vm.tabContent == 2) {
												console.log(res.data);
												if (res.data.resultCode == 1) {
													vm.backBatchList = res.data.resultBody.orderList;
													vm.historyParams = params;
													$scope.paginationConf.totalItems = res.data.pageInfo.totalCount;
												} else {
													vm.backBatchList = [];
												}
											}
										});

					};
					
					vm.gofor = function(obj, type) {
						if (type == 0) {
							window
									.open('./index.html#orderSingleDetail/'
											+ obj);
						} else if (type == 1) {
							window.open('./index.html#orderDetail/' + obj);
						}
					};

					// 关闭 未支付的订单
					$scope.closeOrder = function(batch, orderArray) {
						var couponBatchNo = batch.orderId;
						// console.log(couponBatchNo+'---'+orderArray.length);
						if (confirm("确认取消该订单吗？")) {
							var orderNoArray = [];
							if (orderArray) {
								for (var i = 0; i < orderArray.length; i++) {
									if (orderArray[i].status == 10) {
										orderNoArray[i] = orderArray[i].orderNo;
									}
								}
							}

							var postValue = {
								url : '../order/cancelCouponOrder',
								params : {
									couponBatchNo : couponBatchNo,
									orderNoArray : orderNoArray
								}
							};

							$HttpService
									.post(postValue)
									.then(
											function(res) {
												if (res.data.resultCode == 1) {
													for (var i = 0; i < orderArray.length; i++) {
														if (orderArray[i].status == 10) {
															orderArray[i].statusText = '已取消';
															orderArray[i].status = 60;
															batch.status = 6;
															batch.statusText = '已取消';
														}
													}
												} else {
													$rootScope
															.showToast(
																	res.data.resultComment,
																	3000);
												}
											});
						}

					};

					// 立即退款
					$scope.rowPay = function(orderArray) {
						// console.log('立即退款,批次编号:'+orderArray[0].orderNo);

						if (confirm("确认为该订单执行退款操作吗？")) {
							var orderNoArray = [];
							if (orderArray) {
								for (var i = 0; i < orderArray.length; i++) {
									if (orderArray[i].status == 32) {
										orderNoArray[i] = orderArray[i].orderNo;
									}
								}
							}

							for (var i = 0; i < orderNoArray.length; i++) {
								var postValue = {
									url : '../coupon/refundCouponOrder',
									params : {
										orderNo : orderNoArray[i]
									}
								};

								$HttpService
										.post(postValue)
										.then(
												function(res) {
													if (res.data.resultCode == 0) {
														for (var i = 0; i < orderArray.length; i++) {
															if (orderArray[i].status == 32) {
																orderArray[i].statusText = '处理失败,已退款';
																orderArray[i].status = 41;
															}
														}
													} else {
														console
																.log(postValue.params.orderNo
																		+ '-退款失败！--'
																		+ res.data.resultMsg);
													}
												});
							}
						}
					};

					// 已付款 但生成卡密失败 重新生成
					$scope.reCreate = function(orderArray) {
						if (confirm("确认为该订单重新生成券记录吗？")) {
							var orderNoArray = [];
							if (orderArray) {
								for (var i = 0; i < orderArray.length; i++) {
									if (orderArray[i].status == 32) {
										orderNoArray[i] = orderArray[i].orderNo;
									}
								}
							}
							for (var i = 0; i < orderNoArray.length; i++) {
								var postValue = {
									url : '../coupon/refundCreateCoupon',
									params : {
										orderNo : orderNoArray[i]
									}
								};

								$HttpService
										.post(postValue)
										.then(
												function(res) {
													if (res.data.resultCode == 1) {
														for (var i = 0; i < orderArray.length; i++) {
															if (orderArray[i].status == 32) {
																orderArray[i].statusText = '重新生成中';
																orderArray[i].status = 30;
															}
														}
													} else {
														console
																.log(postValue.params.orderNo
																		+ '-重新生成失败！--'
																		+ res.data.resultComment);
													}
												});
							}
						}

					};
					/*-------------------------------------获取订单状态枚举----------------------------------------*/
					// 批量购卡
					vm.getBatchStatusEnums = function() {
						var postValue = {
							url : '../order/getEnums',
							params : {
								name : 'couponBatchStatusAndBatchOrderStatus'
							}
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								console.log(res.data);
								om.statusList = res.data.resultBody;
							} else {
								console.log(res.data);
							}
						});
					};
					// 流量直充

					vm.getSingleStatusEnums = function() {
						var postValue = {
							url : '../order/getEnums',
							params : {
								name : 'directOrderStatus'
							}
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								console.log(res.data);
								vm.statusList = res.data.resultBody;
							} else {
								console.log(res.data);
							}
						});
					};
					vm.getBackStatusEnums = function() {
						var postValue = {
							url : '../order/getEnums',
							params : {
								name : 'backCouponBatchStatus'
							}
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								console.log(res.data);
								tm.statusList = res.data.resultBody;
							} else {
								console.log(res.data);
							}
						});
					};
				});
