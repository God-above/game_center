var myApp = angular.module('myApp', [ 'tm.pagination','$HttpService' ]);
//ready 函数等待文本初始化完成
angular.element(document).ready(function(){
	angular.bootstrap(document,["myApp"]);
})
myApp.controller('testController', function($scope,$HttpService) {
	$scope.paginationConf = {
            pagesLength:9,//页码条数
            perPageOptions: [10, 20, 30, 40, 50],
            rememberPerPage: 'perPageItems',
            onChange: function($event){
            	$scope.getAssetFlowList($scope.paginationConf.currentPage);
            }
        };
	$scope.getAssetFlowList=function(index,size){
			var params={
        				currentPage :index,
        				pageSize:10
        		};
        		var postValue={
        			url:'../../order/getAssetFlowList',
					params:params,
        		};
        		$scope.historyParams=postValue;
        		$HttpService.post(postValue).then(function(res) {
        			if (res.data.resultCode == '0') {
        				$scope.orderList=res.data.resultSet;
        				$scope.paginationConf.totalItems=res.data.pageInfo.totalCount;
        			} else {
        				console.log(res.data);
        			}
        		});
	}
	
	
});