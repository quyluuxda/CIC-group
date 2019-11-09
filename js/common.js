(function($) {
	"use strict";

	// Menu mobile
	$(".btn-menu").click(function(event) {
		/* Act on the event */
		$("#menu-mobile").mmenu({
	        extensions: ['pagedim-black']
	    });
	});

	// Fancybox chi-tiet-san-pham.html
    if ($(window).width() > 991 && $("[data-fancybox]").length > 0) {
	    $("[data-fancybox]").fancybox({
			thumbs : {
				autoStart : true
			}
		});
    };
    

	// The way to display search form on header
	$(window).on("resize", function() {
		if ($(window).width() > 991) {
			$(".search-form-btn").click(function(e) {
				$( this ).toggleClass( "dark" )
				if ($(".search-form input").is(":focus") === false) {
					setTimeout(function() {
						$(".search-form input").focus();
					}, 100);
				} else {
					$(".search-form input").blur();
				}
				$(this).parent().toggleClass("expand");
			});
		}
		//  else {
		// 	$(".search-form-btn").click(function(e) {
		// 		$(".search-form input").toggleClass("input-mobile");

		// 		if ($(".search-form input").is(":visible")) {
		// 			setTimeout(function() {
		// 				$(".search-form input").focus();
		// 			}, 50);
		// 		} else {
		// 			$(".search-form input").blur();
		// 		}
		// 	});
		// }
	});

	var menuOffset = $(".main-header").offset().top;
	var headerHeight = $("header").height();
	$(window).scroll(function(e) {
		if ($(this).scrollTop() >= menuOffset) {
			$("header").addClass("scroll");
			$("header").css({
				"height": headerHeight
			});
		} else {
			$("header").removeClass("scroll");
			$("header").removeAttr("style");
		};
	});


	// Check event for Ripple effect
	var clickEvent;

	if ('onpointerdown' in window) {
	    // use 'pointerdown' if pointerEvent API is supported
	    clickEvent = 'pointerdown';
	    // console.log('pointerEvents used');
	} else if ('ontouchstart' in window) {
	    // use 'touchstart' if touch device
	    clickEvent = 'touchstart';
	    // console.log('touch device');
	} else {
	    // else use mouse event
	    clickEvent = 'click';
	    // console.log('old fashioned mouse events');
	}

	// Riplle effect
	$(document).on(clickEvent, '.ripple', function(e) {
	 	var $rippleElement = $('<span class="ripple-effect" />'),
		    $buttonElement = $(this),
		    btnOffset = $buttonElement.offset(),
		    xPos = e.pageX - btnOffset.left,
		    yPos = e.pageY - btnOffset.top,
		    size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
		    animateSize = parseInt(Math.max($buttonElement.width(), $buttonElement.height()) * Math.PI);

		if ($(this).hasClass('ripple-in-box')) {
			size = 30;
			animateSize = 30 * Math.PI;
		};

	 	$rippleElement
		    .css({
		     	top: yPos,
		     	left: xPos,
		    	width: size,
		     	height: size,
		    	backgroundColor: $buttonElement.data("ripple-color")
		    })
		    .appendTo($buttonElement)
		    .animate({
		     	width: animateSize,
		     	height: animateSize,
		     	opacity: 0
		    }, 700, function() {
		     	$(this).remove();
		    });
	});

	// Trigger resize for some events
	$(window).trigger('resize');

	// js for form tuyen-dung-chi-tiet.html
	$(".career-form__form-control").blur(function() {
		if( !$(this).val() ) {
            $(this).removeClass("valid");
     	} else {
     		$(this).addClass("valid");
     	};
	});

	// lien-he.html
	$(".map-heading").click(function() {
		$(".map-content").slideToggle();
		$(this).find("i:last-child").toggleClass("roll");
	});

	// product-details tab
	$(".detail-product-nav .nav-item") && $(".detail-product-nav .nav-item").click(function() {
		var thisPos = $(this).index();
		$("#main-tab-content .tab-pane").removeClass("active");
		$("#main-tab-content .tab-pane").eq(thisPos).addClass("active");
	});


})(jQuery);