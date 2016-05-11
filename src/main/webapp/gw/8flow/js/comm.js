window.onload = function(){
	$('#flowgo').mouseover(logonover);
	$('#flowgo').mouseout(logonout);
	createCode();
};

function jump(id){
	var scrolltop=$("."+id+"").offset().top;
	$('html,body').animate({scrollTop:scrolltop - 90},500);
};

function logonover(obj){
	$("#flowgo").find('img').attr('src','./img/new_img/flowgo2.png');
};

function logonout(obj){
	$("#flowgo").find('img').attr('src','./img/new_img/flowgo1.png');
};

function loginIn(){
	window.location="./pay.html"
}

function pay(){
	alert("余额不足");
};
var code; //在全局 定义验证码  
function createCode() {
	code = "";
	var codeLength = 4;//验证码的长度  
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c',
			'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
			'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');//所有候选组成验证码的字符，当然也可以用中文的  

	for ( var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 36);
		code += selectChar[charIndex];
	}
	//alert(code);
	if (checkCode) {
		checkCode.className = "code";
		checkCode.value = code;
	}
}

function validate() {
	var inputCode = document.getElementById("input1").value;
	if (inputCode.length <= 0) {
		alert("请输入验证码！");
	} else if (inputCode != code) {
		alert("验证码输入错误！");
		createCode();//刷新验证码  
	} else {
		alert("^-^ OK");
	}
}

