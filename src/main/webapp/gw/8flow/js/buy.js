$(function() {
	$("#size1").val(1);
	$("#size2").val(1);
	$("#size3").val(1);
	$("#size4").val(1);

	$('.selectLiuliang')
			.on(
					'click',
					function() {
						$('.selectLiuliang').children(
								".selectLiuliang_rightSize").children(
								".num,.count,.price").css("color", "#000000");
						$('.selectLiuliang').children(".selectLiuliang_leftBg")
								.css("background", "#CCCCCC");
						$(this).children(".selectLiuliang_rightSize").children(
								".num,.count,.price").css("color", "#2797CF");
						$(this).children(".selectLiuliang_leftBg").css(
								"background", "#2797CF");
					});

	// $('.selectLiuliang').on('mouseover', function() {
	// $(this).children(".selectLiuliang_rightSize").css("color", "#29bd8b");
	// });
	// $('.selectLiuliang').on('mouseout', function() {
	// $(this).children(".selectLiuliang_rightSize").css("color", "#000000");
	// });
	$('.lt').on('click', function() {
		$("#buy4").hide();
		$("#buy3").hide();
		$("#buy2").show();
		$("#buy1").hide();
		$('.lt').css("background", "#d7000f")
		$('.lt').css("color", "#FFFFFF")
		$('.dx_active').css("background", '#eeeeee');
		$('.dx_active').css("color", '#000000');
		$('.yd').css("background", '#eeeeee');
		$('.yd').css("color", '#000000');
		$('.qg').css("background", '#eeeeee');
		$('.qg').css("color", '#000000');
		 $("#lt_img").attr("src","./img/buy/liantong_c.png");            
		 $("#qg_img").attr("src","./img/buy/sanwang.png"); 
		 $("#yd_img").attr("src","./img/buy/yidong.png"); 
		 $("#dx_img").attr("src","./img/buy/dianxin.png"); 
		 
	});

	$('.dx_active').on('click', function() {
		$("#buy1").show();
		$("#buy4").hide();
		$("#buy3").hide();
		$("#buy2").hide();
		$('.dx_active').css("background", '#0f4491');
		$('.dx_active').css("color", '#FFFFFF');
		$('.lt').css("background", "#eeeeee")
		$('.lt').css("color", "#000000")
		$('.yd').css("background", '#eeeeee');
		$('.yd').css("color", '#000000');
		$('.qg').css("background", '#eeeeee');
		$('.qg').css("color", '#000000');
		 $("#lt_img").attr("src","./img/buy/liantong.png");            
		 $("#qg_img").attr("src","./img/buy/sanwang.png"); 
		 $("#yd_img").attr("src","./img/buy/yidong.png"); 
		 $("#dx_img").attr("src","./img/buy/dianxin_c.png"); 
	});

	$('.yd').on('click', function() {
		$("#buy4").hide();
		$("#buy3").show();
		$("#buy2").hide();
		$("#buy1").hide();
		$('.yd').css("background", '#005cac');
		$('.yd').css("color", '#FFFFFF');
		$('.dx_active').css("background", '#eeeeee');
		$('.dx_active').css("color", '#000000');
		$('.lt').css("background", "#eeeeee")
		$('.lt').css("color", "#000000")
		$('.qg').css("background", '#eeeeee');
		$('.qg').css("color", '#000000');
		 $("#lt_img").attr("src","./img/buy/liantong.png");            
		 $("#qg_img").attr("src","./img/buy/sanwang.png"); 
		 $("#yd_img").attr("src","./img/buy/yidong_c.png"); 
		 $("#dx_img").attr("src","./img/buy/dianxin.png"); 
	});

	$('.qg').on('click', function() {
		$("#buy4").show();
		$("#buy3").hide();
		$("#buy2").hide();
		$("#buy1").hide();
		$('.qg').css("background", '#a0c944');
		$('.qg').css("color", '#FFFFFF');
		$('.dx_active').css("background", '#eeeeee');
		$('.dx_active').css("color", '#000000');
		$('.lt').css("background", "#eeeeee")
		$('.lt').css("color", "#000000")
		$('.yd').css("background", '#eeeeee');
		$('.yd').css("color", '#000000');
		 $("#lt_img").attr("src","./img/buy/liantong.png");            
		 $("#qg_img").attr("src","./img/buy/sanwang_c.png"); 
		 $("#yd_img").attr("src","./img/buy/yidong.png"); 
		 $("#dx_img").attr("src","./img/buy/dianxin.png"); 
	});
});
var orderprice;
var baoxing;
var carrier;

function getPrice(count, price, yy) {
	$("#size2").val(1);
	$("#size3").val(1);
	$("#size4").val(1);
	$('#totalprice2').html(0);
	$('#totalprice3').html(0);
	$('#totalprice4').html(0);
	orderprice = price;
	baoxing = count;
	carrier = yy;
	var count = $('#size1').val();
			
	price = accMul(price,count);
	$('#totalprice1').html(toDecimal2(price));
}
function accMul(arg1,arg2)
{
var m=0,s1=arg1.toString(),s2=arg2.toString();
try{m+=s1.split(".")[1].length}catch(e){}
try{m+=s2.split(".")[1].length}catch(e){}
return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
function getTwoPrice(count, price, yy) {
	$("#size1").val(1);
	$("#size3").val(1);
	$("#size4").val(1);
	$('#totalprice1').html(0);
	$('#totalprice3').html(0);
	$('#totalprice4').html(0);
	orderprice = price;
	baoxing = count;
	carrier = yy;
	var count = $('#size2').val();
	price = price * count;
	$('#totalprice2').html(toDecimal2(price));
}

function getThreePrice(count, price, yy) {
	$("#size1").val(1);
	$("#size2").val(1);
	$("#size4").val(1);
	$('#totalprice1').html(0);
	$('#totalprice2').html(0);
	$('#totalprice4').html(0);
	orderprice = price;
	baoxing = count;
	carrier = yy;
	var count = $('#size3').val();
	price = price * count;
	$('#totalprice3').html(toDecimal2(price));
}

function getFourPrice(count, price, yy) {
	$("#size1").val(1);
	$("#size2").val(1);
	$("#size3").val(1);
	$('#totalprice1').html(0);
	$('#totalprice2').html(0);
	$('#totalprice3').html(0);
	orderprice = price;
	baoxing = count;
	carrier = yy;
	var count = $('#size4').val();
	price = price * count;
	$('#totalprice4').html(toDecimal2(price));
}

function minisCount1() {
	var count = $('#size1').val();
	count = parseInt(count);
	if (count < 2) {
		alert("最小范围是1");
		return false;
	}
	count = count - 1;
	$('#size1').val(count);

	if (carrier == "dx") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice1').html(toDecimal2(price));
		}
		
	}
}

function addCount1() {
	var count = $('#size1').val();
	count = parseInt(count);
	if (count > 9999) {
		alert("最大范围10000");
		return false;
	}
	count = count + 1;
	$('#size1').val(count);
	if (carrier == "dx") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice1').html(toDecimal2(price));
		}
		
	}

}

function minisCount2() {
	var count = $('#size2').val();
	count = parseInt(count);
	if (count < 2) {
		alert("最小范围是1");
		return false;
	}
	count = count - 1;
	$('#size2').val(count);
    alert(carrier);
	if (carrier == "lt") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice2').html(toDecimal2(price));
		}
		
	}

}

function addCount2() {
	var count = $('#size2').val();
	count = parseInt(count);
	if (count > 9999) {
		alert("最大范围10000");
		return false;
	}
	count = count + 1;
	$('#size2').val(count);
	if (carrier == "lt") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice2').html(toDecimal2(price));
		}
		
	}

}

function minisCount3() {
	var count = $('#size3').val();
	count = parseInt(count);
	if (count < 2) {
		alert("最小范围是1");
		return false;
	}
	count = count - 1;
	$('#size3').val(count);
	if (carrier == "yd") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice3').html(toDecimal2(price));
		}
		
	}
}

function addCount3() {
	var count = $('#size3').val();
	count = parseInt(count);
	if (count > 9999) {
		alert("最大范围10000");
		return false;
	}
	count = count + 1;
	$('#size3').val(count);
	if (carrier == "yd") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice3').html(toDecimal2(price));
		}
		
	}

}

function minisCount4() {
	var count = $('#size4').val();
	count = parseInt(count);
	if (count < 2) {
		alert("最小范围是1");
		return false;
	}
	count = count - 1;
	$('#size4').val(count);

	if (carrier == "qg") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice4').html(toDecimal2(price));
		}
		
	}

}

function addCount4() {
	var count = $('#size4').val();

	count = parseInt(count);
	if (count > 9999) {
		alert("最大范围10000");
		return false;
	}
	count = count + 1;
	$('#size4').val(count);
	if (carrier == "qg") {
		if (orderprice) {
			var price = accMul(orderprice,count);
			$('#totalprice4').html(toDecimal2(price));
		}
		
	}
	

}

function getSize1(val) {
	val = val.replace(/\D/g, '');
	$('#size1').val(val);
	if (carrier == "dx") {
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice1').html(toDecimal2(price));
		}
		if (val > 10000) {
			alert("最大范围10000");
			$('#size1').val(10000);
			if (orderprice) {
				var price = accMul(orderprice,10000);
				$('#totalprice1').html(toDecimal2(price));
			}
			return false;
		}
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice1').html(toDecimal2(price));
		}
		
	}

}

function getSize2(val) {
	val = val.replace(/\D/g, '');
	$('#size2').val(val);
	if (carrier == "lt") {
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice2').html(toDecimal2(price));
		}
		if (val > 10000) {
			alert("最大范围10000");
			$('#size2').val(10000);
			if (orderprice) {
				var price = accMul(orderprice,10000);
				$('#totalprice2').html(toDecimal2(price));
			}
			return false;
		}
		if (orderprice) {
			var price =accMul(orderprice,val);
			$('#totalprice2').html(toDecimal2(price));
		}
		
	}

}

function getSize3(val) {
	val = val.replace(/\D/g, '');
	$('#size3').val(val);
	if (carrier == "yd") {
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice3').html(toDecimal2(price));
		}
		if (val > 10000) {
			alert("最大范围10000");
			$('#size3').val(10000);
			if (orderprice) {
				var price = accMul(orderprice,10000);
				$('#totalprice3').html(toDecimal2(price));
			}
			return false;
		}
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice3').html(toDecimal2(price));
		}
	}
	
}

function getSize4(val) {
	val = val.replace(/\D/g, '');
	$('#size4').val(val);
	if (carrier == "qg") {
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice4').html(toDecimal2(price));
		}
		if (val > 10000) {
			alert("最大范围10000");
			$('#size4').val(10000);
			if (orderprice) {
				var price = accMul(orderprice,10000);
				$('#totalprice4').html(toDecimal2(price));
			}
			return false;
		}
		if (orderprice) {
			var price = accMul(orderprice,val);
			$('#totalprice4').html(toDecimal2(price));
		}
	}

}
function goLogin1() {
	var total = $('#totalprice1').text();
	var count = $('#size1').val();
	;
	if (orderprice == undefined || orderprice == "") {
		return false;
	}
	if( $('#totalprice1').text()=="0" || $('#totalprice1').text()=="0.00" ){
	alert("请选择商品和数量");
	return false;
	}
	return false;
	window.location.href = "./login.html?orderprice=" + orderprice
			+ "&baoxing=" + baoxing + "&carrier=" + carrier + "&total=" + total
			+ "&count=" + count
};

function goLogin2() {
	var total = $('#totalprice2').text();
	var count = $('#size2').val();
	;
	if (orderprice == undefined || orderprice == "") {
		return false;
	}
	;
	if( $('#totalprice2').text()=="0" || $('#totalprice2').text()=="0.00" ){
	alert("请选择商品和数量");
	return false;
	}
	window.location.href = "./login.html?orderprice=" + orderprice
			+ "&baoxing=" + baoxing + "&carrier=" + carrier + "&total=" + total
			+ "&count=" + count
};

function goLogin3() {
	var total = $('#totalprice3').text();
	var count = $('#size3').val();
	;
	if (orderprice == undefined || orderprice == "") {
		return false;
	}
	;
	if( $('#totalprice3').text()=="0" || $('#totalprice3').text()=="0.00" ){
	alert("请选择商品和数量");
	return false;
	}
	window.location.href = "./login.html?orderprice=" + orderprice
			+ "&baoxing=" + baoxing + "&carrier=" + carrier + "&total=" + total
			+ "&count=" + count
};

function goLogin4() {
	var total = $('#totalprice4').text();
	var count = $('#size4').val();
	;
	if (orderprice == undefined || orderprice == "") {
		return false;
	}
	;
	if( $('#totalprice4').text()=="0" || $('#totalprice4').text()=="0.00" ){
	alert("请选择商品和数量");
	return false;
	}
	window.location.href = "./login.html?orderprice=" + orderprice
			+ "&baoxing=" + baoxing + "&carrier=" + carrier + "&total=" + total
			+ "&count=" + count
};
function toDecimal2(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}    