(function () {
    var $;
    $ = this.jQuery || window.jQuery;
    win = $(window), body = $('body'), doc = $(document);

    $.fn.hc_accordion = function () {
        var acd = $(this);
        acd.find('ul>li').each(function (index, el) {
            if ($(el).find('ul li').length > 0) $(el).prepend('<button type="button" class="acd-drop"></button>');
        });
        acd.on('click', '.acd-drop', function (e) {
            e.preventDefault();
            var ul = $(this).nextAll("ul");
            if (ul.is(":hidden") === true) {
                ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
                ul.parent('li').parent('ul').children('li').children('.acd-drop').removeClass("active");
                $(this).addClass("active");
                ul.slideDown(180);
            } else {
                $(this).removeClass("active");
                ul.slideUp(180);
            }
        });
    }

    $.fn.hc_menu = function (options) {
        var settings = $.extend({
            open: '.open-mnav',
        }, options),
            this_ = $(this);
        var m_nav = $('<div class="m-nav"><button class="m-nav-close"><i class="fal fa-times"></i></button><div class="nav-ct"></div></div>');
        var m_nav_over = $('<div class="m-nav-over"></div>');
        body.append(m_nav);
        body.append(m_nav_over);

        m_nav.find('.m-nav-close').click(function (e) {
            e.preventDefault();
            mnav_close();
        });
        m_nav.find('.nav-ct').append($('.logo').clone());
        m_nav.find('.nav-ct').append(this_.children().clone());

        var mnav_open = function () {
            m_nav.addClass('active');
            m_nav_over.addClass('active');
            body.css('overflow', 'hidden');
        }
        var mnav_close = function () {
            m_nav.removeClass('active');
            m_nav_over.removeClass('active');
            body.css('overflow', '');
        }

        doc.on('click', settings.open, function (e) {
            e.preventDefault();
            if (win.width() <= 1199) mnav_open();
        }).on('click', '.m-nav-over', function (e) {
            e.preventDefault();
            mnav_close();
        });

        m_nav.hc_accordion();
    }

    var $searchHeader = $('.search-header');
    $searchHeader.on('click', function (e) {
        e.preventDefault();
        $('.search-hd').addClass('active');
    });
    win.on("click", function (event) {
        if (
            $searchHeader.has(event.target).length == 0 //checks if descendants of box was clicked
            &&
            !$searchHeader.is(event.target) //checks if the box itself was clicked
            && $(".search-hd").hasClass("active")
        ) {
            $('.search-hd').removeClass('active');
        }
    })

    $.fn.hc_countdown = function (options) {
        var settings = $.extend({
            date: new Date().getTime() + 1000 * 60 * 60 * 24,
        }, options),
            this_ = $(this);

        var countDownDate = new Date(settings.date).getTime();

        var count = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this_.html('<div class="item"><span>' + days + '</span> ngày</div>' +
                '<div class="item"><span>' + hours + '</span> giờ</div>' +
                '<div class="item"><span>' + minutes + '</span> phút </div>' +
                '<div class="item"><span>' + seconds + '</span> giây </div>'
            );
            if (distance < 0) {
                clearInterval(count);
            }
        }, 1000);
    }

    $.fn.hc_upload = function (options) {
        var settings = $.extend({
            multiple: false,
            result: '.hc-upload-pane',
        }, options),
            this_ = $(this);

        var input_name = this_.attr('name');
        this_.removeAttr('name');

        this_.change(function (e) {
            if ($(settings.result).length > 0) {
                var files = event.target.files;
                if (settings.multiple) {
                    for (var i = 0, files_len = files.length; i < files_len; i++) {
                        var path = URL.createObjectURL(files[i]);
                        var name = files[i].name;
                        var size = Math.round(files[i].size / 1024 / 1024 * 100) / 100;
                        var type = files[i].type.slice(files[i].type.indexOf('/') + 1);

                        var img = $('<img src="' + path + '">');
                        var input = $('<input type="hidden" name="' + input_name + '[]"' +
                            '" value="' + path +
                            '" data-name="' + name +
                            '" data-size="' + size +
                            '" data-type="' + type +
                            '" data-path="' + path +
                            '">');
                        var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img).append(input);
                        $(settings.result).append(elm);
                    }
                } else {
                    var path = URL.createObjectURL(files[0]);
                    var img = $('<img src="' + path + '">');
                    var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img);
                    $(settings.result).html(elm);
                }
            }
        });

        body.on('click', '.hc-upload .hc-del', function (e) {
            e.preventDefault();
            this_.val('');
            $(this).closest('.hc-upload').remove();
        });
    }

}).call(this);


jQuery(function ($) {
    var win = $(window),
        body = $('body'),
        doc = $(document);

    var FU = {
        get_Ytid: function (url) {
            var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            if (url) var arr = url.match(rx);
            if (arr) return arr[1];
        },
        get_currency: function (str) {
            if (str) return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        animate: function (elems) {
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        },
    };

    var UI = {
        mMenu: function () {

        },
        header: function () {
            var elm = $('header'),
                h = elm.innerHeight(),
                offset = 200,
                mOffset = 0;
            var fixed = function () {
                elm.addClass('fixed');
                body.css('margin-top', h);
            }
            var unfixed = function () {
                elm.removeClass('fixed');
                body.css('margin-top', '');
            }
            var Mfixed = function () {
                elm.addClass('m-fixed');
                body.css('margin-top', h);
            }
            var unMfixed = function () {
                elm.removeClass('m-fixed');
                body.css('margin-top', '');
            }
            if (win.width() > 991) {
                win.scrollTop() > offset ? fixed() : unfixed();
            } else {
                win.scrollTop() > mOffset ? Mfixed() : unMfixed();
            }
            win.scroll(function (e) {
                if (win.width() > 991) {
                    win.scrollTop() > offset ? fixed() : unfixed();
                } else {
                    win.scrollTop() > mOffset ? Mfixed() : unMfixed();
                }
            });
        },
        backTop: function () {
            var back_top = $('.back-to-top'),
                offset = 800;

            back_top.click(function () {
                $("html, body").animate({ scrollTop: 0 }, 800);
                return false;
            });

            if (win.scrollTop() > offset) {
                back_top.fadeIn(200);
            }

            win.scroll(function () {
                if (win.scrollTop() > offset) back_top.fadeIn(200);
                else back_top.fadeOut(200);
            });
        },
        slider: function () {
            if ($('.cas-home').length) {
                $('.cas-home').slick({
                    autoplay: true,
                    speed: 2000,
                    autoplaySpeed: 8000,
                    pauseOnHover: false,
                    swipeToSlide: true,
                    fade: true,
                    arrows: false,
                    dots: false,
                })
                FU.animate($(".cas-home .slick-current [data-animation ^= 'animated']"));
                $('.cas-home').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    if (currentSlide != nextSlide) {
                        var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
                        FU.animate(aniElm);
                    }
                });
            }

            // cas field
            if ($(".cas-list-field").length) {
                $(".cas-img-field").slick({
                    swipeToSlide: true,
                    speed: 1000,
                    accessibility: false,
                    arrows: false,
                    fade: true,
                    asNavFor: ".cas-list-field, .cas-content-field",
                    draggable: false,
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                arrows: true,
                                nextArrow: '<div class="smooth next"><i class="far fa-long-arrow-alt-right"></i></div>',
                                prevArrow: '<div class="smooth prev"><i class="far fa-long-arrow-alt-left"></i></i></div>',
                            },
                        },
                    ],
                });
                $(".cas-list-field").slick({
                    autoplay: false,
                    slidesToShow: 5,
                    swipeToSlide: true,
                    focusOnSelect: true,
                    speed: 1000,
                    asNavFor: ".cas-img-field, .cas-content-field",
                    autoplaySpeed: 8000,
                    accessibility: false,
                    arrows: false,
                    vertical: true,
                    infinite: true,
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                vertical: false,
                                slidesToShow: 2,
                            },
                        },
                        // {
                        //     breakpoint: 767,
                        //     settings: {
                        //         vertical: false,
                        //         slidesToShow: 1,
                        //     },
                        // },
                    ],
                });
                $(".cas-content-field").slick({
                    swipeToSlide: true,
                    arrows: false,
                    speed: 1000,
                    fade: true,
                    accessibility: false,
                    draggable: false,
                    // asNavFor: ".cas-list-field, .cas-content-field",
                });
            }
            // cas exchanges
            if ($(".list-exchanges").length) {
                $(".list-exchanges").slick({
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 3,
                    swipeToSlide: true,
                    focusOnSelect: true,
                    accessibility: false,
                    arrows: false,
                    dots: true,
                    speed: 1000,
                    autoplaySpeed: 8000,
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }

            // casconnect
            if ($(".list-connect").length) {
                $(".list-connect").slick({
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 5,
                    swipeToSlide: true,
                    focusOnSelect: true,
                    accessibility: false,
                    arrows: true,
                    dots: true,
                    speed: 1000,
                    autoplaySpeed: 8000,
                    nextArrow: '<div class="smooth next"><i class="far fa-long-arrow-alt-right"></i></div>',
                    prevArrow: '<div class="smooth prev"><i class="far fa-long-arrow-alt-left"></i></i></div>',
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 4,
                            },
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                    ],
                });
            }

            //cas-prj
            ///***** START SLICK WITH PROGRESSBAR****///
            // Slick Slide Counters
            var $mainslider = $('.cas-prj');
            if ($mainslider.length) {
                $mainslider.on('init', function (event, slick) {
                    if ($(this).hasClass("slick-counter") == false) {
                        $(this).append('<div class="slick-counter"><span class="current"></span><div class="slider-progress"><div class="progress"></div></div><span class="total"></span></div>');
                    }
                    $('.current').text(slick.currentSlide + 1);
                    $('.total').text(slick.slideCount);
                });
                //refresh slick
                $('.tabs-project a').click(function () {
                    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                        $('.cas-prj').slick('setPosition');
                    })
                })
                $mainslider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    $('.current').text(nextSlide + 1);
                });

                // Slick Slider Options
                $mainslider.slick({
                    draggable: true,
                    arrows: false,
                    dots: false,
                    fade: true,
                    infinite: true,
                    speed: 2000,
                    // mobileFirst: true,
                    // pauseOnHover: true,
                });

                // Slider Progressbar Start Here
                var time = 3;
                var $bar,
                    $mainslider,
                    isPause,
                    tick,
                    percentTime;

                $bar = $('.slider-progress .progress');

                function startProgressbar() {
                    resetProgressbar();
                    percentTime = 0;
                    isPause = false;
                    tick = setInterval(interval, 15);
                }

                function interval() {
                    if (isPause === false) {
                        percentTime += 1 / (time + 0.1);
                        $bar.css({
                            width: percentTime + "%"
                        });
                        if (percentTime >= 100) {
                            $mainslider.slick('slickNext');
                        }
                    }
                }
                function resetProgressbar() {
                    $bar.css({
                        width: 0 + '%'
                    });
                    clearTimeout(tick);
                }
                // Reset Progressbar When Slide Change
                $mainslider.on('afterChange', function (event, slick, currentSlide) {
                    startProgressbar();
                });

                // $('.sliderwrap').on({
                //     mouseenter: function () {
                //         isPause = true;
                //     },
                //     mouseleave: function () {
                //         isPause = false;
                //     }
                // })
                startProgressbar();
                FU.animate($(".cas-prj .slick-current [data-animation ^= 'animated']"));
                $('.cas-prj').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    if (currentSlide != nextSlide) {
                        var aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
                        FU.animate(aniElm);
                    }
                });
            }

            // cas exchanges
            if ($(".list-exchanges").length) {
                $(".list-exchanges").slick({
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 3,
                    swipeToSlide: true,
                    focusOnSelect: true,
                    accessibility: false,
                    arrows: false,
                    dots: true,
                    speed: 1000,
                    autoplaySpeed: 8000,
                    // responsive: [
                    //     {
                    //         breakpoint: 1199,
                    //         settings: {
                    //             slidesToShow: 4,
                    //         },
                    //     },
                    //     {
                    //         breakpoint: 575,
                    //         settings: {
                    //             slidesToShow: 3,
                    //         },
                    //     },
                    // ],
                });
            }
        },
        input_number: function () {
            doc.on('keydown', '.numberic', function (event) {
                if (!(!event.shiftKey &&
                    !(event.keyCode < 48 || event.keyCode > 57) ||
                    !(event.keyCode < 96 || event.keyCode > 105) ||
                    event.keyCode == 46 ||
                    event.keyCode == 8 ||
                    event.keyCode == 190 ||
                    event.keyCode == 9 ||
                    event.keyCode == 116 ||
                    (event.keyCode >= 35 && event.keyCode <= 39)
                )) {
                    event.preventDefault();
                }
            });
            doc.on('click', '.i-number .up', function (e) {
                e.preventDefault();
                var input = $(this).parents('.i-number').children('input');
                var max = Number(input.attr('max')),
                    val = Number(input.val());
                if (!isNaN(val)) {
                    if (!isNaN(max) && input.attr('max').trim() != '') {
                        if (val >= max) {
                            return false;
                        }
                    }
                    input.val(val + 1);
                    input.trigger('change');
                }
            });
            doc.on('click', '.i-number .down', function (e) {
                e.preventDefault();
                var input = $(this).parents('.i-number').children('input');
                var min = Number(input.attr('min')),
                    val = Number(input.val());
                if (!isNaN(val)) {
                    if (!isNaN(min) && input.attr('max').trim() != '') {
                        if (val <= min) {
                            return false;
                        }
                    }
                    input.val(val - 1);
                    input.trigger('change');
                }
            });
        },
        yt_play: function () {
            doc.on('click', '.yt-box .play', function (e) {
                var id = FU.get_Ytid($(this).closest('.yt-box').attr('data-url'));
                $(this).closest('.yt-box iframe').remove();
                $(this).closest('.yt-box').append('<iframe src="https://www.youtube.com/embed/' + id + '?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
            });
        },
        psy: function () {
            var btn = '.psy-btn',
                sec = $('.psy-section'),
                pane = '.psy-pane';
            doc.on('click', btn, function (e) {
                e.preventDefault();
                $(this).closest(pane).find(btn).removeClass('active');
                $(this).addClass('active');
                $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 40 }, 600);
            });

            var section_act = function () {
                sec.each(function (index, el) {
                    if (win.scrollTop() + (win.height() / 2) >= $(el).offset().top) {
                        var id = $(el).attr('id');
                        $(pane).find(btn).removeClass('active');
                        $(pane).find(btn + '[href="#' + id + '"]').addClass('active');
                    }
                });
            }
            section_act();
            win.scroll(function () {
                section_act();
            });
        },
        drop: function () {
            $('.drop').each(function () {
                var this_ = $(this);
                var label = this_.children('.label');
                var ct = this_.children('ul');
                var item = ct.children('li').children('a.drop-item');

                this_.click(function () {
                    ct.slideToggle(150);
                    label.toggleClass('active');
                });

                item.click(function (e) {
                    e.preventDefault();
                    label.html($(this).html());
                });

                win.click(function (e) {
                    if (this_.has(e.target).length == 0 && !this_.is(e.target)) {
                        this_.children('ul').slideUp(150);
                        label.removeClass('active');
                    }
                })
            });
        },
        toggle: function () {
            var ani = 100;
            $('[data-show]').each(function (index, el) {
                var ct = $($(el).attr('data-show'));
                $(el).click(function (e) {
                    e.preventDefault();
                    ct.fadeToggle(ani);
                });
            });
            win.click(function (e) {
                $('[data-show]').each(function (index, el) {
                    var ct = $($(el).attr('data-show'));
                    if (ct.has(e.target).length == 0 && !ct.is(e.target) && $(el).has(e.target).length == 0 && !$(el).is(e.target)) {
                        ct.fadeOut(ani);
                    }
                });
            });
        },
        uiCounterup: function () {
            var item = $('.hc-couter'),
                flag = true;
            if (item.length > 0) {
                run(item);
                win.scroll(function () {
                    if (flag == true) {
                        run(item);
                    }
                });

                function run(item) {
                    if (win.scrollTop() + 70 < item.offset().top && item.offset().top + item.innerHeight() < win.scrollTop() + win.height()) {
                        count(item);
                        flag = false;
                    }
                }

                function count(item) {
                    item.each(function () {
                        var this_ = $(this);
                        var num = Number(this_.text().replace(".", ""));
                        var incre = num / 80;

                        function start(counter) {
                            if (counter <= num) {
                                setTimeout(function () {
                                    this_.text(FU.get_currency(Math.ceil(counter)));
                                    counter = counter + incre;
                                    start(counter);
                                }, 20);
                            } else {
                                this_.text(FU.get_currency(num));
                            }
                        }
                        start(0);
                    });
                }
            }
        },
        uiParalax: function () {
            var paralax = function () {
                $('.prl').each(function (index, el) {
                    var num = 20;
                    if ($(el).hasClass('v1')) num = 3;
                    if ($(el).hasClass('v2')) num = 3;
                    if ($(el).hasClass('v3')) num = 3;
                    if ($(el).hasClass('v-ab')) num = 4;
                    if ($(el).hasClass('v-video')) num = 20;
                    if ($(el).hasClass('v-sv1')) num = 20;
                    if ($(el).hasClass('v-sv2')) num = 25;
                    if ($(el).hasClass('v-sv3')) num = 30;
                    var he = $(el).innerHeight(),
                        vtop = $(el).offset().top;
                    win.scroll(function (e) {
                        var top = $(window).scrollTop();
                        $(el).css({
                            'transform': 'translateY(' + (top / num) + 'px)',
                        })
                        if ($(el).hasClass('v-video')) {
                            $(el).css({
                                'transform': 'translate(' + (2 * top - vtop) / 30 + 'px,' + (top - vtop) / num + 'px)',
                            })
                        }
                        if ($(el).hasClass('v-left')) {
                            $(el).css({
                                'transform': 'translate(' + (2 * top - vtop) / 70 + 'px,' + (top - vtop) / num + 'px)',
                            })
                        }
                        if ($(el).hasClass('v-right')) {
                            $(el).css({
                                'transform': 'translate(' + (2 * top - vtop) / 70 * -1 + 'px,' + (top - vtop) / num + 'px)',
                            })
                        }
                    });
                });
            }
            if ($(win).width() > 767) {
                paralax();
            }
        },
        ready: function () {
            //UI.mMenu();
            //UI.header();
            UI.slider();
            UI.backTop();
            // UI.toggle();
            //UI.input_number();
            //UI.uiCounterup();
            //UI.yt_play();
            //UI.psy();
            //UI.uiParalax();
        },
    }
    UI.ready();

    /*custom here*/
    WOW.prototype.addBox = function (element) {
        this.boxes.push(element);
    };

    var wow = new WOW({
        mobile: false
    });
    wow.init();
    // if ($(window).width() > 1199) {
    //     $('.wow').on('scrollSpy:exit', function() {
    //         $(this).css({
    //             'visibility': 'hidden',
    //             'animation-name': 'none'
    //         }).removeClass('animated');
    //         wow.addBox(this);
    //     }).scrollSpy();
    // }

    $(win).scroll(function () {
        if ($(win).scrollTop() > 5) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });

    // disable scroll
    var owl = $('.owl-carousel');
    owl.on('drag.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            e.preventDefault()
        }
    })
    // enable scroll
    owl.on('dragged.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            return true
        }
    })
    $('.d-nav').hc_menu({
        open: '.open-mnav',
    })
    if (win.width() > 767) {
        $('#fullpage').fullpage({
            navigation: true,
            anchors: ['banner-home', 'about-home', 'field-home', 'project-home', 'exchanges-home', 'news-home', 'connect-home'],
            navigationTooltips: ['Banner', 'Giới thiệu', 'Lĩnh vực', 'Dự án', 'Sàn giao dịch', 'Tin tức', 'Liên kết'],
            css3: false,
            scrollingSpeed: 1200,
            navigationPosition: 'right',
            normalScrollElements: '.d-nav.active',
            //easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        });
    }
    $('.icon-menu').click(function (event) {
        $(this).toggleClass('active');
        $('.d-nav').toggleClass('active');
    });

    // set margin
    var wContainer = $('.container').width();
    var wWindow = $(window).width();
    var setMargin = -((wWindow - wContainer) / 2);
    if ($(win).width() > 767) {
        $('.section.about .img').css('margin-left', -(wWindow - wContainer));
        $('.cas-img-field').css('margin-right', setMargin);
        $('.tabs-project-wrap').css('left', -setMargin);
        $('.slick-counter').css('right', -(setMargin));
        win.resize(function (event) {
            $('.section.about .img').css('margin-left', -(wWindow - wContainer));
            $('.cas-img-field').css('margin-right', setMargin);
            $('.tabs-project-wrap').css('left', -setMargin);
            $('.slick-counter').css('right', -(setMargin));
        });
    }

    //swiper
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 8000,
        },
        effect: 'coverflow',
        loop: true,
        slideToClickedSlide: true,
        speed: 1000,
        spaceBetween: -50,
        centeredSlides: true,
        slidesPerView: 2,
        initialSlide: 2,
        keyboardControl: true,
        mousewheelControl: true,
        lazyLoading: true,
        preventClicks: true,
        preventClicksPropagation: true,
        lazyLoadingInPrevNext: true,
        parallax: true,
        coverflowEffect: {
            rotate: 0,
            depth: 250,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // 1366: {
            //     slidesPerView: 5,
            // },
            1200: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        }

    });
})

// if ($('#map').length) {
//     function initMap() {
//         // Create a new StyledMapType object, passing it an array of styles,
//         // and the name to be displayed on the map type control.
//         var styledMapType = new google.maps.StyledMapType(
//             [{
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#f6f6f7"
//                 }]
//             },
//             {
//                 "elementType": "labels.icon",
//                 "stylers": [{
//                     "visibility": "off"
//                 }]
//             },
//             {
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#616161"
//                 }]
//             },
//             {
//                 "elementType": "labels.text.stroke",
//                 "stylers": [{
//                     "color": "#f6f6f7"
//                 }]
//             },
//             {
//                 "featureType": "administrative.land_parcel",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#bdbdbd"
//                 }]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#eeeeee"
//                 }]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#757575"
//                 }]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#e5e5e5"
//                 }]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             },
//             {
//                 "featureType": "road",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#ffffff"
//                 }]
//             },
//             {
//                 "featureType": "road.arterial",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#757575"
//                 }]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#dadada"
//                 }]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#616161"
//                 }]
//             },
//             {
//                 "featureType": "road.local",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             },
//             {
//                 "featureType": "transit.line",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#e5e5e5"
//                 }]
//             },
//             {
//                 "featureType": "transit.station",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#eeeeee"
//                 }]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#c9c9c9"
//                 }]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             }
//             ], { name: 'Map' });

//         // Create a map object, and include the MapTypeId to add
//         // to the map type control.
//         var map = new google.maps.Map(document.getElementById('map'), {
//             center: { lat: 21.022088, lng: 105.855216 },
//             zoom: 15,
//             scrollwheel: false,
//             mapTypeControlOptions: {
//                 mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
//                     'styled_map'
//                 ]
//             }
//         });

//         //Associate the styled map with the MapTypeId and set it to display.
//         map.mapTypes.set('styled_map', styledMapType);
//         map.setMapTypeId('styled_map');
//         var myMarker = new google.maps.Marker({
//             position: { lat: 21.022088, lng: 105.855216 },
//             map: map,
//             title: "",
//             icon: "images/ic-logo.png",
//             label: {
//                 color: '#717c8b',
//                 fontWeight: 'bold',
//                 fontSize: '0px',
//                 text: '.',

//             },
//             icon: {
//                 labelOrigin: new google.maps.Point(11, 60),
//                 url: 'images/ic-logo.png',
//                 size: new google.maps.Size(116, 60),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(11, 40),
//             },
//         });
//         // var contentString = '<img src="images/dc-map1.png" alt="">';

//         // var infowindow = new google.maps.InfoWindow({
//         //     content: contentString
//         // });
//         // infowindow.open(map, myMarker);
//         /*myMarker.addListener('click', function() {
//             infowindow.open(map, myMarker);
//         });*/
//     }
// }
