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
        /*m_nav.find('.nav-ct').append($('.control-header').clone());*/

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
    };
    $('.d-nav').hc_menu({
        open: '.open-mnav',
    })
}).call(this);