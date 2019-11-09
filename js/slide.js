(function ($) {
	// "use strict";

	$(".home-carousel").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navClass: ["triangle-nav-prev", "triangle-nav-next"],
		navText: ["", ""],
		dots: false,
		animateOut: "fadeOut",
		animateIn: "fadeIn",
		autoplay: true,
		autoplayTimeout: 2000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				nav: false
			},
			768: {
				nav: true
			}
		}
	});

	$(".award-carousel").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navClass: ["sl-arrow prev", "sl-arrow next"],
		navText: ["<i class='fal fal fa-chevron-left'></i>", "<i class='fal fa-chevron-right'></i>"],
		dots: false,
		animateOut: "fadeOut",
		animateIn: "fadeIn",
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				nav: false
			},
			1190: {
				nav: true
			}
		}
	});

	// Carousel Award
	$(window).on("load resize", function () {
		if ($(this).width() < 1200) {
			$(".award-list").addClass("owl-carousel");
			$(".award-list").owlCarousel({
				items: 1,
				loop: true,
				margin: 15,
				stagePadding: 30,
				nav: false,
				dots: false,
				responsive: {
					0: {
						items: 1
					},
					400: {
						items: 1.3
					}
					,
					520: {
						items: 2
					}
					,
					991: {
						items: 3
					},
					1100: {
						items: 3
					}
				}
			});
		} else {
			$(".award-list").removeClass("owl-carousel");
			$(".award-list").trigger("destroy.owl.carousel");
		}
	});

	$(".home-box-carousel").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navClass: ["triangle-nav-prev", "triangle-nav-next"],
		navText: ["", ""],
		dots: true,
		dotClass: "yellow-dot",
		stagePadding: 12,
		margin: 15,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				stagePadding: 0,
				nav: false
			},
			992: {
				stagePadding: 5,
				nav: true
			}
		}
	});

	// Carousel footer
	$(window).on("load resize", function () {
		if ($(this).width() < 768) {
			$(".logo-list").addClass("owl-carousel");
			$(".logo-list").owlCarousel({
				items: 3,
				loop: true,
				margin: 15,
				stagePadding: 30,
				nav: false,
				dots: false,
				responsive: {
					0: {
						items: 3
					},
					425: {
						items: 4
					}
				}
			});
		} else {
			$(".logo-list").removeClass("owl-carousel");
			$(".logo-list").trigger("destroy.owl.carousel");
		}
	});

	//
	function addCurrent(slider, thumbnailSlider) {
		var slideIndex = slider.find(".owl-item.active").index();
		var thumbItem = thumbnailSlider.find(".owl-item");

		thumbItem.removeClass("current");
		thumbnailSlider.find(".owl-item:eq(" + slideIndex + ")").addClass("current");
	};

	// Carousels in product detail
	function twoCarousels(main, thumb) {
		// reference for main items
		var slider = $(main);
		// reference for thumbnail items
		var thumbnailSlider = $(thumb);

		//transition time in ms
		var duration = 200;
		// carousel function for main slider
		slider.owlCarousel({
			loop: false,
			items: 1,
			dots: false,
			animateIn: "fadeIn",
			animateOut: "fadeOut",
			nav: false,
			dots: false
		}).on('changed.owl.carousel', function (e) {
			//On change of main item to trigger thumbnail item
			thumbnailSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
		}).on('dragged.owl.carousel', function (e) {
			addCurrent(slider, thumbnailSlider);
		});
		// carousel function for thumbnail slider
		thumbnailSlider.owlCarousel({
			items: 6,
			loop: false,
			margin: 5,
			dots: false,
			nav: false,
			dots: false,
			responsive: {
				0: {
					items: 3,
				},
				576: {
					items: 5,
				},
				768: {
					items: 6,
				}
			}
		}).on('click', '.owl-item', function () {
			// On click of thumbnail items to trigger same main item
			slider.trigger('to.owl.carousel', [$(this).index(), duration, true]);
			addCurrent(slider, thumbnailSlider);
		}).on('changed.owl.carousel', function (e) {
			// On change of thumbnail item to trigger main item
			slider.trigger('to.owl.carousel', [e.item.index, duration, true]);
			addCurrent(slider, thumbnailSlider);
		});

		addCurrent(slider, thumbnailSlider);
	};

	twoCarousels(".detail-carousel", ".thumb-carousel");
	twoCarousels(".youtube-detail-carousel", ".youtube-thumb-carousel");

	//
	$(".tags-carousel").owlCarousel({
		items: 2,
		nav: false,
		dots: false,
		margin: 10,
		responsive: {
			320: {
				items: 1,
				margin: 0
			},
			1200: {
				items: 2,
				margin: 10
			}
		}
	})

	$('.img-award').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
	  });
	  
	$('.partner-items').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		speed:1000
	  });

	$('.partner-items-mobile').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	  });
		  
})(jQuery);