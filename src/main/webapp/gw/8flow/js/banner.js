$(function() {
	$(".main_banner_size").hide();
	$(".plane_one").hide();
	$(".main_banner2_size").hide();
	$("#banner2_earth").hide();
	$(document.body).css({
		"overflow-x" : "hidden"
	});
	banner1play()
})
    var banner=1;

   
	function banner1Open(count) {
		banner1Closed(count)
		//banner1play()
	}
	
	

	function banner2Open(count) {
		banner2Closed(count);
	};
	
	function banner3Open(count) {
		banner3Closed(count);
	};
	
	function banner3Play(){
		$(".banner-one").fadeOut(1000);
		$(".banner-two").fadeOut(1000);
		$(".banner-three").fadeIn(500,function(){
		$(".main_banner3_size").show();
		$(".main_banner3_size").animate({
			top: '40px'
		}, {
			duration : 2500,
			queue : false,
			complete : function() {
			}
		});
			
		});
	}
	
	//exit
	function banner1Closed(count){
		$(".plane_one").animate({
			right: $(window).width()
		}, {
			duration : 500,
			queue : false,
			complete : function() {
			 $(".plane_one").hide();;
			 $(".plane_one").css('right','0px');
			}
		});
		$(".main_banner_size").animate({
			top: -150
		}, {
			duration : 500,
			queue : false,
			complete : function() {
			 $(".main_banner_size").hide();
			 if(count=="2"){
				 banner2Play(); 
			 }else{
				 banner3Play();
			 }
			
			}
		});

	}
	
	//exit
	function banner2Closed(count){
		$("#banner2_earth").animate({
			top: '600px'
		}, {
			duration : 500,
			queue : false,
			complete : function() {
			 $("#banner2_earth").hide();;
			 $("#banner2_earth").css('top','-280px');
			}
		});
		
		$(".main_banner2_size").animate({
			top: '-150px'
		}, {
			duration : 500,
			queue : false,
			complete : function() {
			// $(".main_banner2_size").hide();
			 $(".main_banner2_size").css('top','600px');
			 if(count=="1"){
				 banner1play(); 
			 }else{
				 banner3Play();
			 }
			}
		});
		
	};
	
	function banner1play(){
		$(".banner-three").fadeOut(1000);
		$(".banner-two").fadeOut(1000);
		$(".banner-one").fadeIn(500,function(){
			$(".main_banner_size").show();
			$(".main_banner_size").animate({
				top : '40px'
			}, {
				duration : 1000,
				queue : false,
				complete : function() {
					banner_plane();
				}
			});
			
		});
	}
	
	function banner3Closed(count) {
		$(".main_banner3_size").animate({
			top: '700px'
		}, {
			duration : 1500,
			queue : false,
			complete : function() {
				 $(".main_banner3_size").hide();;
				 $(".main_banner3_size").css('top','0px');
				 if(count=="2"){
					 banner2Play(); 
				 }else if(count=="1"){
					 banner1play();
				 }
			}
		});
	};
	
	function banner2Play(){
//		 $(".banner-three").fadeTo("slow",0.3);
//		$(".banner-one").fadeTo("slow",0.4);
		$(".banner-three").fadeOut(1000);
		$(".banner-one").fadeOut(1000);
		$(".banner-two").fadeIn(1000,function(){
			$("#banner2_earth").show();
			$("#banner2_earth").animate({
				top : '280px'
			}, {
				duration : 1000,
				queue : false,
				complete : function() {
					banner2earth();
				}
			});
		});
	}
	
	function banner_plane() {
		var p_width = $(window).width() / 2;
		if (p_width > 480) {
			p_width = p_width - 215;
			$(".plane_one").show();
			$(".plane_one").animate({
				right : p_width
			}, {
				duration : 500,
				queue : false,
				complete : function() {
				}
			});
		} else {
			$(".plane_one").hide();
		}

	}

	function banner2earth() {

		$(".main_banner2_size").show();
		$(".main_banner2_size").animate({
			top : '40px'
		}, {
			duration : 1000,
			queue : false,
			complete : function() {

			}
		});
	}
