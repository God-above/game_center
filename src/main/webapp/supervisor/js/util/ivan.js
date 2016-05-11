/* 封装httpServer 0.0.2
 * 
 * 
 * 调用方式
 * var xxx={
 *   url:接口地址
 *   params:参数
 *   rolling:true /false  启动关闭加载条
 *   
 * }
 *  方式为post  get
 *  
 *  0.0.2 {
 *    更新 检测状态为-1 or 1201的状态码跳转登陆页面
 *  
 *  }
 *
 **/

var $HttpService = angular.module('$HttpService', []).factory(
		'$HttpService',
		function($http, $rootScope) {
			var data = '';
			var service = {};
			// post方式
			service.post = function(params) {
				if (params.rolling == true) {
					CommonPerson.Base.LoadingPic.FullScreenShow();// 加载条显示
					return $http.post(params.url, params.params).success(
							function(data, status, headers, config) {
								CommonPerson.Base.LoadingPic.FullScreenHide();// 加载条显示
								if (data.resultCode == "-1") {
									alert("登录已超时,请重新登录");
									window.location='./login.html';
									return data;

								} else if(data.resultCode == 1201){
									alert("登录已超时,请重新登录");
									window.location='./login.html';
									return data;
								}else{
									return data;
								}
							}).error(function(data, status, headers, config) {
							return data;
					});
				} else {
					return $http.post(params.url, params.params).success(
							function(data, status, headers, config) {
								if (data.resultCode == "-1") {
									alert("登录已超时,请重新登录");
									window.location='./login.html';
									return data;
								}  else if(data.resultCode == 1201){
									alert("登录已超时,请重新登录");
									window.location='./login.html';
									return data;
								}else {
									return data;
								}
							}).error(function(data, status, headers, config) {
						return data;
					});

				}

			};
			// get方式
			service.get = function(params) {
				if (params.rolling == true) {
					CommonPerson.Base.LoadingPic.FullScreenShow();// 加载条显示
					return $http.get(params.url, params.params).success(
							function(data, status, headers, config) {
								CommonPerson.Base.LoadingPic.FullScreenHide();// 加载条显示
								return data;
							}).error(function(data, status, headers, config) {
						return data;
					});
				} else {
					return $http.get(params.url, params.params).success(
							function(data, status, headers, config) {
								return data;
							}).error(function(data, status, headers, config) {
						return data;
					});

				}

			}
			return service;
		});
