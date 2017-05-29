angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){
	var app = this;
	
	$rootScope.$on('$routeChangeStart', function(){
		app.loadme = false;
		if(Auth.isLoggedIn()){
		//console.log('success: User Is Logged In');
		app.isLoggedIn = true;
		Auth.getUser().then(function(data){
			//console.log(data.data.username);
			app.username= data.data.username;
			app.useremail=data.data.email;
			app.loadme = true;
		});
	}
	else{
		//console.log('Failure: User Is Not Logged In');
		app.isLoggedIn = false;
		app.username = '';
		app.loadme = true;
	}
	});
	
	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;
		//console.log('Data Submitted');
		//console.log(this.regData);
		Auth.login(app.loginData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.message);
			if(data.data.success)
			{   
		        app.loading = false;
				app.successMsg = data.data.message + '....please Wait Redirecting';
				$timeout(function(){
					$location.path('/');
					app.loginData= '';
					app.successMsg= false;
				},2000);
				
			}else
			{    
		        app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
	
	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);
	};
});









