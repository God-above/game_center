flowApp.controller('flowController',function($rootScope, $scope, $http, $location, $routeParams,$cookieStore,$HttpService) {


					$scope.init = function() {
						$scope.user = $cookieStore.get("user");
						
						if($scope.user){
							$scope.userName = $scope.user;  
						}else{
							$scope.userName = "未登陆用户";  
						}
					};

					$scope.getOut = function() {
						var postValue={
								url:'../logout',
						};
						$HttpService.post(postValue).then(function(res){
							if(res.data.resultCode=='0'){
								window.location = "../supervisor/login.html";
							}
						});
						
					};

					

				});
