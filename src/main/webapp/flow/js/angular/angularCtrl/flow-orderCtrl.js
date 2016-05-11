flowApp
		.controller(
				'orderController',
				function($rootScope, $scope, $HttpService, $location, $modal,
						$routeParams) {
					var vm = $scope.vm = {};
					var orderStatus = "";
					var getBalance = function() {
						// 查询账户余额
						var postValue = {
							url : '../user/getBalance'
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.data.resultCode == '0') {
								$scope.price = res.data.resultBody.balance;
							} else {
								console.log(res.data);
							}
						});
					};

					/* 获取订单信息 */
					$scope.RechargeInit = function() {
						$scope.inputCount = 5;
						var type = $routeParams.type;
						var orderNo = $routeParams.orderNo;
						$scope.orderType = type;
						var status = $routeParams.status;
						getBalance();
						// $scope.payType=2;
						if (type && type == 'single') {
							for (var i = 0; i <= 15; i++) {
								$("#text li").eq(i).removeClass("active");
							}
							$("#text li").eq(1).addClass("active");
							$scope.singleMain = true;
							$scope.batchPayMain = false;
							$scope.singlePay(orderNo);
						}

						if (type && type == "batch") {
							for (var i = 0; i <= 15; i++) {
								$scope.test = "active";
								$("#text li").eq(i).removeClass("active");
							}
							$("#text li").eq(2).addClass("active");
							$scope.singleMain = false;
							$scope.batchPayMain = true;
							$scope.batchPay(orderNo);
						}

						if (type && type == 'coupon') {
							for (var i = 0; i <= 15; i++) {
								$scope.test = "active";
								$("#text li").eq(i).removeClass("active");
							}
							$("#text li").eq(6).addClass("active");
							$scope.singleMain = true;
							$scope.batchPayMain = false;
							$scope.singlePay(orderNo);
						}
						if (type && type == 'payMain') {

							for (var i = 0; i <= 15; i++) {
								$("#text li").eq(i).removeClass("active");
							}
							$("#text li").eq(1).addClass("active");

							$scope.singleMain = false;
							$scope.batchPayMain = false;
							$scope.payTypeMain = true;

							if (status && status == 'single') {
								$scope.singlePay(orderNo);
							} else if (status && status == 'batch') {
								$scope.batchPay(orderNo);
							}
							$scope.hisOrderList = "";

							// $scope.singleMain = false;
							// $scope.batchPayMain = false;
							// $scope.payProName=productName;
							// $scope.payPrice=price;
							// var status=$routeParams.status;
							// $scope.hisOrderList="";
							// if(status && status=='12'){
							// $scope.searchHistory(orderNo);
							// }
						}
						if (type && type == 'payResult') {
							for (var i = 0; i <= 15; i++) {
								$("#text li").eq(i).removeClass("active");
							}
							$("#text li").eq(1).addClass("active");
							$scope.singleMain = false;
							$scope.batchPayMain = false;
							$scope.payTypeMain = false;
							$scope.paySuccess = true;
						}
					};

					$scope.singlePay = function(orderNo) {
						var postValue = {
							url : '../order/getOrderInfo',
							params : {
								orderNo : orderNo
							}
						};
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											if (res.data.resultCode == '0') {
												$scope.orderInfo = res.data.resultBody;
												$scope.payPrice = $scope.orderInfo.totalPrice;
												$scope.payProName = $scope.orderInfo.productName;
												orderStatus = $scope.orderInfo.status;
												if (orderStatus
														&& orderStatus == '12') {
													$scope
															.searchHistory(orderNo);
												}
												// if ($scope.orderInfo.status
												// && $scope.orderInfo.status !=
												// '10' &&
												// $scope.orderInfo.status !=
												// '12') {
												// $("#btnConfirm").attr("disabled",
												// true);
												// }else
												// if($scope.orderInfo.status ==
												// '12'){
												// $location.path("confirmOrder/"+orderNo+"/single/"+$scope.orderInfo.status);
												// }
											} else if (res.data.resultCode == '1201') {
												$rootScope.showToast(
														"连续输入密码超过限制，请重新登录",
														2000);
												window.location = "./login.html";
											} else {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
											}

										});

					};
					/*-------------------找回支付密码---------------*/
					$scope.findPayPwd = function() {
						$('#myModal').modal("hide");
						var postValue = {
							url : '../user/sendSetPayPassEmail',
							rolling : true
						};
						$HttpService.post(postValue).then(
								function(res) {
									if (res.data.resultCode == '0') {
										$scope.email = res.data.resultBody;
										$("#myModalPwd").modal("show");
										// $rootScope.showToast("已发送邮件到"+res.data.resultBody+"，请注意查收
										// 及时认证",2000);
									} else {
										$rootScope.showToast(
												res.data.resultComment, 2000);
									}
									console.log(res);
								});
					};

					// 忘记支付密码 重新发送邮件
					$scope.rePwdEmail = function() {
						$('#myModalPwd').modal("hide");
						// $("#setBtn").attr('disabled',false);
					};

					// 根据邮箱类型登录
					$scope.openEmailUrl = function(email) {
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

					/*-------------------找回支付密码 end---------------*/
					$scope.batchPay = function(orderNo) {

						var postValue = {
							url : '../batch/query_batch',
							params : {
								batchNo : orderNo
							}
						};

						$HttpService
								.post(postValue)
								.then(
										function(res) {
											if (res.data.resultCode == '0') {
												$scope.batchInfo = res.data.resultBody;

												$scope.payPrice = $scope.batchInfo.totalPrice;
												$scope.payProName = $scope.batchInfo.productName;
												orderStatus = $scope.batchInfo.status;
												if (orderStatus
														&& orderStatus == '2') {
													$scope
															.searchHistory(orderNo);
												}
												console.log($scope.batchInfo);
											} else if (res.data.resultCode == '1201') {
												$rootScope.showToast(
														"连续输入密码超过限制，请重新登录",
														3000);
												window.location = "./login.html";
											} else {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
											}

										});
					};

					$scope.reBack = function() {
						var type=$routeParams.status;
						if(type && type=='batch'){
							$location.path("batch");
						}else if(type && type == 'single'){
							$location.path("singleOrder");
						}

					};
					$scope.cancelPay = function() {
						$('#myModal').modal("hide");
						$scope.payPwd = "";
					};

					/*----------------------------------------------------------支付订单start---------------*/
					/* 选择支付类型 */
					$scope.hisOrderList = "";
					$scope.openPay = function(orderNo, productName, price) {
						$scope.payTypeMain = true;
						$scope.singleMain = false;
						$scope.batchPayMain = false;
						// $scope.payProName=productName;
						// $scope.payPrice=price;
						// var status=$routeParams.status;
						// $scope.hisOrderList="";
						// if(status && status=='12'){
						// $scope.searchHistory(orderNo);
						// }
					};

					var payInfo = [];// 选择的支付类型
					// checkBox 选中事件
					$scope.changePayType = function(type) {
						if ($scope.payType2 && !$scope.payType10
								&& !$scope.payType1) {// 只选择余额支付
							if ($scope.price && $scope.price > 0
									&& $scope.price > $scope.payPrice) {// 余额大于支付金额
								$("#inlineCheckbox10").attr("disabled", true);
								$("#inlineCheckbox1").attr("disabled", true);
							}
						} else if ($scope.payType10 && !$scope.payType2
								&& !$scope.payType1) {// 只选择支付宝
							// $("#inlineCheckbox2").attr("disabled",false);
							$("#inlineCheckbox1").attr("disabled", true);
						} else if ($scope.payType1 && !$scope.payType2
								&& !$scope.payType10) {// 只选择银行卡
							$("#inlineCheckbox10").attr("disabled", false);
							// $("#inlineCheckbox2").attr("disabled",false);
						} else {
							$("#inlineCheckbox10").attr("disabled", false);
							// $("#inlineCheckbox2").attr("disabled",false);
							$("#inlineCheckbox1").attr("disabled", false);
						}
					};
					// 打开支付 模态框 验证是否设置支付密码
					$scope.open = function(productName, price) {
						$("#inlineCheckbox10").attr("disabled", false);
						$("#inlineCheckbox1").attr("disabled", false);

						if (!$scope.payType2 && !$scope.payType10
								&& !$scope.payType1) {
							$rootScope.showToast("至少选择一种支付方式！", 2000);
							return;
						}
						/*
						 * 注 $scope.payType2：余额 $scope.payType10：支付宝
						 * $scope.payType1：银行卡
						 */

						if ($scope.price && $scope.price > 0
								&& $scope.price > price) {// 余额大于支付金额
							if ($scope.payType2 && !$scope.payType10
									&& !$scope.payType1) {// 只选择余额支付
								payInfo = [ {
									payType : 2,
									amount : price
								} ];
							} else if ($scope.payType10 && !$scope.payType2
									&& !$scope.payType1) {// 只选择支付宝
								payInfo = [ {
									payType : 10,
									amount : price
								} ];
							} else if ($scope.payType1 && !$scope.payType2
									&& !$scope.payType10) {// 只选择银行卡
								payInfo = [ {
									payType : 1,
									amount : price
								} ];
							}
						} else if ($scope.price || $scope.price < price) {// 余额不足
							if ($scope.payType2 && $scope.payType10
									&& !$scope.payType1) {// 选择余额和支付宝
								payInfo = [ {
									payType : 2,
									amount : $scope.price
								}, {
									payType : 10,
									amount : price - $scope.price
								} ];
							} else if ($scope.payType2 && $scope.payType1
									&& !$scope.payType10) {// 选择余额和银行卡
								payInfo = [ {
									payType : 2,
									amount : $scope.price
								}, {
									payType : 1,
									amount : price - $scope.price
								} ];
							} else if ($scope.payType10 && !$scope.payType2
									&& !$scope.payType1) {// 只选择支付宝
								payInfo = [ {
									payType : 10,
									amount : price
								} ];
							} else if ($scope.payType1 && !$scope.payType2
									&& !$scope.payType10) {// 只选择银行卡
								payInfo = [ {
									payType : 1,
									amount : price
								} ];
							} else if ($scope.payType2 && !$scope.payType10
									&& !$scope.payType1) {// 只选择余额支付
								$rootScope.showToast("账户余额不足！", 2000);
								return;
							} else {

							}
						} else if (!$scope.price || $scope.price == 0) {
							$("#inlineCheckbox2").attr("disabled", true);
							return;
						}
						$scope.isSetPayPwd();
						console.log(payInfo);
					};
					// 查看用户是否设置支付密码
					$scope.isSetPayPwd = function() {
						var postValue = {
							url : '../user/getUserInfo'
						};
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											if (res.data.resultCode == '0') {
												$scope.userInfo = res.data.resultBody;
												if ($scope.userInfo
														&& $scope.userInfo.payPassword) {
													$('#myModal').modal("show");
												} else {
													$('#myModal2')
															.modal("show");
												}
											}
											console.log(res.data);
										});
					};

					$scope.inputCount = 5;
					// 验证支付密码
					$scope.okPay = function(pwd) {

						$scope.showAlert = false;
						$scope.payPwd = "";
						if (!pwd) {
							$rootScope.showToast("请输入支付密码", 2000);
							return;
						}
						var postValue = {
							url : '..//user/verifyPayPassword',
							params : {
								payPassword : pwd
							}
						};
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											console.log(res.data);
											if (res.data.resultCode == 0) {
												// var type = $routeParams.type;
												var orderNo = $routeParams.orderNo;
												var orderType = $routeParams.status;
												if (orderStatus
														&& orderStatus == '12'||orderStatus=='2') {
													$scope.continuePay();
												} else {
													$scope.confirmOrder(
															orderNo, orderType);
												}
												$("#btnConfirm").attr(
														"disabled", true);
												$('#myModal').modal("hide");
											} else if (res.data.resultCode == '4907') {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
												$location
														.path("setPayType/1/default");
											} else if (res.data.resultCode == '4908') {
												$rootScope.showToast(
														res.data.resultComment
																+ ",请重新输入",
														2000);
												$scope.showAlert = true;
												$scope.inputCount = $scope.inputCount - 1;
												$('#myModal').modal("show");
												$scope.payPwd = "";
											} else if (res.data.resultCode == '1201') {
												$rootScope.showToast(
														"连续输入密码超过限制，请重新登录",
														2000);
												window.location = "./login.html";
											} else {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
											}

										});
					};

					/*---------------------------------------获取所有的支付订单 start----------------*/
					$scope.searchHistory = function(orderNo) {
						var type = $routeParams.status;

						var params = {};
						if (type && type == 'single') {
							params["orderNo"] = orderNo;
						} else if (type && type == 'batch') {
							params["batchNo"] = orderNo;
						}
						var postValue = {
							url : '../payment/get_payment_list',
							params : params
						};
						getStatusEnums();
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											console.log(res.data);
											if (res.data.resultCode == '0') {
												$scope.hisOrderList = res.data.resultSet;
											} else {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
											}
										});
					};
					/*---------------------------------------获取未支付的支付订单 end----------------*/
					// 确认支付
					$scope.confirmOrder = function(orderNo, type) {
						console.log(payInfo);
						var params = {
							payInfo : angular.fromJson(payInfo)
						};
						if (type && type == 'single') {
							params["orderNo"] = orderNo;
						} else if (type && type == 'batch') {
							params["batchNo"] = orderNo;
						}
						var postValue = {
							url : '../payment/multiple_pay',
							params : params
						};
						$HttpService.post(postValue).then(
								function(res) {
									console.log(res.data);

									if (res.data.resultCode == 0) {
										$rootScope.showToast(
												res.data.resultComment, 2000);
										$('#myModal').modal("hide");
									} else if (res.data.resultCode == 2) {
										$rootScope.showToast("余额支付成功！", 2000);
										$location.path("confirmOrder/"
												+ orderNo
												+ "/payResult/"+type);
										$('#myModal').modal("hide");
									} else if (res.data.resultCode == '6030') {
										var resUrl = res.data.resultBody;
										$('#myModal3').modal("show");
										window.open(resUrl);
									} else {
										$rootScope.showToast(
												res.data.resultComment, 2000);
									}
									getBalance();

								});
					};

					/* ===================继续支付==================== */

					$scope.continuePayPwd = function() {
						$scope.isSetPayPwd();
					};

					$scope.continuePay = function() {
						var type = $routeParams.status;
						var orderNo = $routeParams.orderNo;
						var payNoInfo = [];
						for (var i = 0; i < $scope.hisOrderList.length; i++) {
							if ($scope.hisOrderList[i].status == '1') {
								var payNo = $scope.hisOrderList[i].paymentNo;
								payNoInfo.push(payNo);
							}
						}
						var params = {
							paymentNoSet : angular.fromJson(payNoInfo)
						};
						if (type && type == 'single') {
							params["orderNo"] = orderNo;
						} else if (type && type == 'batch') {
							params["batchNo"] = orderNo;
						}
						var postValue = {
							url : '../payment/continue_pay',
							params : params
						};
						$HttpService.post(postValue).then(
								function(res) {
									console.log(res.data);
									if (res.data.resultCode == 0) {
										$rootScope.showToast(
												res.data.resultComment, 2000);
										$('#myModal').modal("hide");
									} else if (res.data.resultCode == '6030') {
										var resUrl = res.data.resultBody;
										$('#myModal3').modal("show");
										window.open(resUrl);
									} else {
										$rootScope.showToast(
												res.data.resultComment, 2000);
									}
								});
					};

					/* =================支付遇到问题 / 支付完成============= */
					$scope.payQusBtn = function() {
						$('#myModal3').modal("hide");
					};

					$scope.payResultBtn = function() {
						console.log("订单详情页");
						var orderNo = $routeParams.orderNo;
						var type = $routeParams.status;

						$location.path("orderDetail/" + orderNo + "/" + type);
					};

					/* ======解析支付类型 */
					$scope.parsePayType = function(type) {
						if (type && type == 2) {
							return "余额";
						} else if (type && type == 10) {
							return "支付宝";
						}

					};
					/*----------------------------------------------------------支付订单end---------------*/

					/*-----------------------订单详情  start---------------------*/
					$scope.orderDetailInit = function() {
						var orderNo = $routeParams.orderNo;
						var type = $routeParams.type;
						getStatusEnums();
						var params = {};
						if (type && type == 'single') {
							params["orderNo"] = orderNo;
						} else if (type && type == 'batch') {
							params["batchNo"] = orderNo;
						}
						;
						var postValue = {
							url : '../order/get_order_batch_and_payments',
							params : params
						};
						$HttpService
								.post(postValue)
								.then(
										function(res) {
											console.log(res.data);
											if (res.data.resultCode == 2) {
												$scope.orderDetail = res.data.resultBody.order;
												$scope.batchOrder = res.data.resultBody.batch;
												if ($scope.orderDetail) {
													$scope.productName = $scope.orderDetail.productName;
													$scope.rechargeAccount = $scope.orderDetail.rechargeAccount;
													$scope.totalPrice = $scope.orderDetail.totalPrice;
													$scope.orderNo = $scope.orderDetail.orderNo;
													$scope.orderCount = $scope.orderDetail.proCount;
													$scope.orderType = "single";
												} else if ($scope.batchOrder) {
													$scope.productName = $scope.batchOrder.productName;
													$scope.totalPrice = $scope.batchOrder.totalPrice;
													$scope.orderNo = $scope.batchOrder.number;
													$scope.orderCount = $scope.batchOrder.validAccountTotal;
													$scope.orderType = "batch";
												}

												$scope.payList = res.data.resultBody.paymentList;
												// $rootScope.showToast(res.data.resultComment,2000);
											} else if (res.data.resultCode == '1201') {
												$rootScope.showToast(
														"连续输入密码超过限制，请重新登录",
														2000);
												window.location = "./login.html";
											} else {
												$rootScope.showToast(
														res.data.resultComment,
														2000);
											}
										});
					};
					/*-----------------------订单详情  end---------------------*/
					// 获取状态列表
					// $scope.getPayStatusEnums=function(){
					//		
					// }
					var getStatusEnums = function() {
						var postValue = {
							url : '../order/getEnums',
							params : {
								name : 'paymentStatus'
							}
						};
						$HttpService.post(postValue).then(function(res) {
							if (res.status == '200') {
								console.log(res.data);
								$scope.statusList = res.data.resultBody;
							} else {
								console.log(res.data);
							}
						});
					};
					// 解析列表中的状态
					$scope.parseStatus = function(status) {
						for (var i = 0; i < $scope.statusList.length; i++) {
							if ($scope.statusList[i].code == status) {
								return $scope.statusList[i].description;
							}
						}
					};

				});
