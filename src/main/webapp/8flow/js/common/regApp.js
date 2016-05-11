var userApp = angular.module('userApp', [ 'ngRoute', 'ngCookies','$HttpService' ]);// 注入插件服务

document.getQueryStringByName = function(name) {
	var result = location.href.match(new RegExp(
			"[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
};
userApp.run(function($rootScope, $http, $timeout) {
  // 全局toast 提示框
  $rootScope.DIALOG_TOAST = false;
  $rootScope.DIALOG_TOAST_TITLE = "";
  // 显示 全局提示框
  $rootScope.showToast = function(text, time) {
     // $rootScope.DIALOG_TOAST = true;
      $rootScope.DIALOG_TOAST_TITLE = text;
      $timeout($rootScope.hideToast, time);
      $("#drag").show();
  };
  // 隐藏全局提示框
  $rootScope.hideToast = function() {
	  $("#drag").hide();
      $rootScope.DIALOG_TOAST = false;
      $rootScope.DIALOG_TOAST_TITLE = "";
  };

});

userApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/findPwd', {
        templateUrl : 'tlps/regWeb/ng-findPwd.html',
        controller:'regUserControllers'
    }).when('/index', {
        templateUrl : 'tlps/regWeb/ng-reg.html',
        controller:'regUserControllers'
    }).when('/regTwo', {
        templateUrl : 'tlps/regWeb/ng-regTwo.html',
        controller:'regUserControllers'
    }).otherwise({
        templateUrl : 'tlps/ng-error.html'
    });
});

/*
 * 密码重复验证
 */
userApp
      .directive(
              "repeat",
              [ function() {
                  return {
                      restrict : 'A',
                      require : "ngModel",
                      link : function(scope, element, attrs, ctrl) {
                          if (ctrl) {
                              var otherInput = element
                                      .inheritedData("$formController")[attrs.repeat];

                              var repeatValidator = function(value) {
                                  var validity = value === otherInput.$viewValue;
                                  ctrl.$setValidity("repeat", validity);
                                  return validity ? value : undefined;
                              };

                              ctrl.$parsers.push(repeatValidator);
                              ctrl.$formatters.push(repeatValidator);

                              otherInput.$parsers.push(function(value) {
                                  ctrl.$setValidity("repeat",
                                          value === ctrl.$viewValue);
                                  return value;
                              });
                          }
                      }
                  };
              } ]);
// 表单校验 失去焦点时显示错误信息
userApp.directive('ngFocus', [ function() {
  var FOCUS_CLASS = "ng-focused";
  return {
      restrict : 'A',
      require : 'ngModel',
      link : function(scope, element, attrs, ctrl) {
          ctrl.$focused = false;
          element.bind('focus', function(evt) {
              element.addClass(FOCUS_CLASS);
              scope.$apply(function() {
                  ctrl.$focused = true;
              });
          }).bind('blur', function(evt) {
              element.removeClass(FOCUS_CLASS);
              scope.$apply(function() {
                  ctrl.$focused = false;
              });
          });
      }
  };
} ]);