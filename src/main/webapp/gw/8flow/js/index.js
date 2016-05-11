$(function() {
	$(".main_banner_size").hide();
	$(".plane_one").hide();
	$(document.body).css({
		"overflow-x" : "hidden"
	});

	$(".side ul li").hover(function() {
		$(this).find(".sidebox").stop().animate({
			"width" : "124px"
		}, 200).css({
			"opacity" : "1",
			"filter" : "Alpha(opacity=100)",
			"background" : "#ae1c1c"
		})
	}, function() {
		$(this).find(".sidebox").stop().animate({
			"width" : "54px"
		}, 200).css({
			"opacity" : "0.8",
			"filter" : "Alpha(opacity=80)",
			"background" : "#000"
		})
	});

	$(".firends_img img").on(
			'mouseover',
			function() {
				$(this).attr("src",
						$(this).context.src.replace('icon_hover', 'icon1'));
			})

	$(".firends_img img").on(
			'mouseout',
			function() {
				$(this).attr("src",
						$(this).context.src.replace('icon1', 'icon_hover'));
			})

	$(".good img").on(
			'mouseover',
			function() {
				$(this).attr("src",
						$(this).context.src.replace('icon_hover', 'icon1'));
				$(this).next().hide();
				$(this).next().next().fadeIn();

			})
	$(".good img").on(
			'mouseout',
			function() {
				$(this).attr("src",
						$(this).context.src.replace('icon1', 'icon_hover'));
				$(this).next().fadeIn();
				$(this).next().next().hide();

			})

	$(".plan_content_max img").on('mouseover', function() {

		$(".max_size").slideUp(200, function() {
		});
		$(this).next().slideToggle(200, function() {
		});

	})

	$(".max_size").on('mouseout', function() {
		$(this).slideToggle(200, function() {
		});

	})

	$(".plan_item").hover(function() {
		var that = this;
		plan_itemTimer = setTimeout(function() {
			$(that).find("div").animate({
				width : 270,
				height : 200,
				left : 0,
				top : 0
			}, 300, function() {
				$(that).find("h2").fadeOut(200);
				$(that).find("dl").fadeIn(200);
			});
		}, 100);

	}, function() {
		var that = this;
		clearTimeout(plan_itemTimer);
		$(that).find("dl").fadeOut(200);
		$(that).find("div").stop().animate({
			width : 0,
			height : 0,
			left : 135,
			top : 100
		}, 300);
		$(that).find("h2").fadeIn(200);
	});

})
