/*========表单验证  失去焦点时显示错误信息*/
app.directive('ngFocus', [ function() {
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

app.directive('ensureUnique', function($http) {
	return{
		require:'ngModel',
		link:function(scope,ele,attrs,c){
			scope.$watch(attrs.ngModel,function(n){
				if(!n)
					return;
				$http({
					method:'POST',
					url:'/api/check/' + attrs.ensureUnique,
					data:{
						field:attrs.ensureUnique,
						value:scope.ngModel
					}
				}).success(function(data){
					c.$setValidity('unqiue',data.isUnique);
				}).error(function(data){
					c.$setValidity('unique',false);
				});
			});
		}
	};
});

app.directive('ensureUnique', function($http) {
	return {
		require : 'ngModel',
		link : function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(n) {
				if (!n)
					return;
				$http({
					method : 'POST',
					url : '/api/check/' + attrs.ensureUnique,
					data : {
						field : attrs.ensureUnique,
						value : scope.ngModel
					}
				}).success(function(data) {
					c.$setValidity('unique', data.isUnique);
				}).error(function(data) {
					c.$setValidity('unique', false);
				});
			});
		}
	};
});

/* 过滤器 创建首字母大写的字符串 */
// 页面 {{ pageHeading | titleCase }} $scope.pageHeading="hello world"; 输出 Hello
// World
app.filter('titleCase', function() {
	var titleCaseFilter = function(input) {
		var words = input.split(' ');
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].splice(1);
		}
		return words.join(' ');
	};
	return titleCaseFilter;
});
