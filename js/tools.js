$(document).ready(function() {

    $('nav ul li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('nav ul li a').click(function(e) {
        if ($(window).width() < 1160) {
            if ($(this).parent().find('ul').length > 0) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $('.table-scroll').mCustomScrollbar({
        axis: 'x'
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-name').html(curName);
        } else {
            curField.find('.form-file-name').html('');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.slider').each(function() {
        if ($('.slider-item').length > 1) {
            $('.slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                fade: true,
                adaptiveHeight: true
            });
        }
    });

    var sliderPageTimer = null;
    var sliderPageSpeed = 1000;
    var sliderPagePeriod = 5000;

    $('.slider-page-list').each(function() {
        $('.slider-page-item').eq(0).addClass('active');
        if ($('.slider-page-item').length > 1) {
            $('.slider-page-item').css({'transition': 'all ' + sliderPageSpeed / 1000 + 's'});
            $('.slider-page-list').data('curIndex', 0);
            sliderPageTimer = window.setTimeout(sliderPageNext, sliderPagePeriod + sliderPageSpeed);
            var dotsHTML =  '<div class="slider-page-dots"><ul>';
            $('.slider-page-item').each(function() {
                dotsHTML += '<li><button></button></li>';
            });
            dotsHTML +=     '</ul></div>';
            $('.slider-page').append(dotsHTML);
            $('.slider-page-dots li').eq(0).addClass('active');
        }
    });

    function sliderPageNext() {
        var curIndex = $('.slider-page-list').data('curIndex');
        curIndex++;
        if (curIndex > $('.slider-page-item').length - 1) {
            curIndex = 0;
        }
        $('.slider-page-item.active').removeClass('active');
        $('.slider-page-item').eq(curIndex).addClass('active');
        $('.slider-page-list').data('curIndex', curIndex);
        $('.slider-page-dots li.active').removeClass('active');
        $('.slider-page-dots li').eq(curIndex).addClass('active');
        sliderPageTimer = window.setTimeout(sliderPageNext, sliderPagePeriod + sliderPageSpeed);
    }

    $('body').on('click', '.slider-page-dots li button', function() {
        window.clearTimeout(sliderPageTimer);
        sliderPageTimer = null;
        var curIndex = $('.slider-page-dots li button').index($(this));
        $('.slider-page-item.active').removeClass('active');
        $('.slider-page-item').eq(curIndex).addClass('active');
        $('.slider-page-list').data('curIndex', curIndex);
        $('.slider-page-dots li.active').removeClass('active');
        $('.slider-page-dots li').eq(curIndex).addClass('active');
        sliderPageTimer = window.setTimeout(sliderPageNext, sliderPagePeriod + sliderPageSpeed);
    });

    $('.main-video-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1159,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        curGallery.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            adaptiveHeight: true,
            fade: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1159,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('.wrapper .dimmer-table').each(function() {
        var curIndex = 0;
        var countRows = $(this).find('tbody tr').length;
        for (var i = 0; i < countRows; i++) {
            var curRow = $(this).find('tbody tr').eq(i);
            if (curRow.hasClass('dimmer-table-group')) {
                curIndex = 0;
            } else {
                curIndex++;
                if (curIndex % 2 == 1) {
                    curRow.addClass('dimmer-table-row-odd');
                } else {
                    curRow.addClass('dimmer-table-row-even');
                }
            }
        }
    });

    $('.product-other').each(function() {
        var newHTML = '<ul>';
        for (var i = 0; i < $('.product-other-tab').length; i++) {
            newHTML += '<li><a href="#">' + $('.product-other-tab').eq(i).attr('data-title') + '</a></li>';
        }
        newHTML += '</ul>';
        $('.product-other-menu').append(newHTML);
        $('.product-other-menu ul li').eq(0).addClass('active');
        $('.product-other-menu-current').html($('.product-other-menu ul li').eq(0).find('a').html());
    });

    $('body').on('click', '.product-other-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.product-other-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-other-menu ul li').index(curLi);
            $('.product-other-tab.active').removeClass('active');
            $('.product-other-tab').eq(curIndex).addClass('active');
            $('.product-other-menu-current').html($(this).html());
        }
        $('.product-other-menu').removeClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.product-other-menu-current', function(e) {
        $('.product-other-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.product-other-menu').length == 0) {
            $('.product-other-menu').removeClass('open');
        }
    });

    $('.product-other-tab .collection-products-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1159,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $.extend(true, $.magnificPopup.defaults, {
        tClose: 'Закрыть (Esc)',
        tLoading: 'Загрузка...',
        gallery: {
            tPrev: 'Предыдущая',
            tNext: 'Следующая',
            tCounter: '%curr% из %total%'
        },
        image: {
            tError: '<a href="%url%">Изображение</a> не может быть загружено.'
        },
        ajax: {
            tError: '<a href="%url%">Контент</a> не может быть загружен.'
        }
    });

    $('.tv-item-preview a').magnificPopup({type:'iframe'});
    $('.main-video-item a').magnificPopup({type:'iframe'});

    $('.footer-contacts-title').click(function(e) {
        $('.footer-contacts').toggleClass('open');
    });

    $('.footer-content-title').click(function(e) {
        $('.footer-content').toggleClass('open');
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
        } else {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            $('html').addClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).is('nav')) {
            $('html').toggleClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
        }
    });

    $('.collection-products-sort-current').click(function() {
        $('.collection-products-sort').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.collection-products-sort').length == 0 || $(e.target).hasClass('collection-products-sort-list')) {
            $('.collection-products-sort').removeClass('open');
        }
    });

    $('.collection-products-sort-list-close').click(function() {
        $('.collection-products-sort').removeClass('open');
    });

    $('body').on('click', '.collection-products-filter-current-title, .collection-products-filter-current-arrow, .collection-products-filter-current-item-text', function() {
        $('.collection-products-filter').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.collection-products-filter').length == 0 || $(e.target).hasClass('collection-products-filter-list')) {
            $('.collection-products-filter').removeClass('open');
        }
    });

    $('.collection-products-filter-list-close').click(function() {
        $('.collection-products-filter').removeClass('open');
    });

    $('body').on('change', '.collection-products-sort-item input', function() {
        var activeItem = $('.collection-products-sort-item input:checked').parent().parent();
        $('.collection-products-sort-current span').html(activeItem.find('span').html());
        $('.collection-products-sort').removeClass('open');
        $('.collection-products-container').addClass('loading');
        var curForm = $('.collection-products-ctrl form');
        if (typeof (history.pushState) !== undefined) {
            history.pushState(null, null, curForm.attr('action') + '?' + curForm.serialize());
        }
        $.ajax({
            type: 'GET',
            url: curForm.attr('action'),
            dataType: 'html',
            data: curForm.serialize(),
            cache: false
        }).done(function(html) {
            $('.collection-products-container').html(html)
            $('.collection-products-container').removeClass('loading');
        });
    });

    $('body').on('change', '.collection-products-filter-list input', function() {
        $('.collection-products-container').addClass('loading');
        var curForm = $('.collection-products-ctrl form');
        if (typeof (history.pushState) !== undefined) {
            history.pushState(null, null, curForm.attr('action') + '?' + curForm.serialize());
        }
        $.ajax({
            type: 'GET',
            url: curForm.attr('action'),
            dataType: 'html',
            data: curForm.serialize(),
            cache: false
        }).done(function(html) {
            $('.collection-products-container').html(html)
            $('.collection-products-container').removeClass('loading');
            $(window).trigger('resize');
        });
        rebuildFilter();
    });

    $('body').on('click', '.collection-products-container .pager a', function(e) {
        $('.collection-products-container').addClass('loading');
        var curLink = $(this).attr('href');
        if (typeof (history.pushState) !== undefined) {
            history.pushState(null, null, curLink.replace('&ajaxfilter=Y', '').replace('&amp;ajaxfilter=Y', '').replace('?ajaxfilter=Y&', '?').replace('ajaxfilter=Y', ''));
        }
        $.ajax({
            type: 'GET',
            url: curLink,
            dataType: 'html',
            cache: false
        }).done(function(html) {
            $('.collection-products-container').html(html)
            $('.collection-products-container').removeClass('loading');
            $(window).trigger('resize');
            $('html, body').animate({'scrollTop': $('.collection-products').offset().top});
        });
        rebuildFilter();
        e.preventDefault();
    });

    rebuildFilter();

    function rebuildFilter() {
        $('.collection-products-filter-current-list').html('');
        for (var i = 0; i < $('.collection-products-filter-group').length; i++) {
            var curGroup = $('.collection-products-filter-group').eq(i);
            var newHTML = '';
            if (curGroup.find('input:checked').length > 0) {
                newHTML = '<div class="collection-products-filter-current-item"><div class="collection-products-filter-current-item-text">';
                for (var j = 0; j < curGroup.find('input:checked').length; j++) {
                    if (j > 0) {
                        newHTML += ', еще ' + (curGroup.find('input:checked').length - 1);
                        break;
                    } else {
                        newHTML += curGroup.find('input:checked').eq(j).parent().find('span').html();
                    }
                }
                newHTML += '</div><div class="collection-products-filter-current-item-remove" data-group="' + i + '"></div></div>';
            }
            $('.collection-products-filter-current-list').append(newHTML);
        }
    }

    $('body').on('click', '.collection-products-filter-current-item-remove', function() {
        var curGroup = $('.collection-products-filter-group').eq($(this).attr('data-group'));
        curGroup.find('input').prop('checked', false);
        curGroup.find('input').eq(0).trigger('change');
    });

    $('body').on('click', '.collection-products-container .pager a', function(e) {
        $('.collection-products-container').addClass('loading');
        var curForm = $('.collection-products-ctrl form');
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            data: curForm.serialize(),
            cache: false
        }).done(function(html) {
            $('.collection-products-container').html(html)
            $('.collection-products-container').removeClass('loading');
        });
        e.preventDefault();
    });

    $('.header-search-icon').click(function(e) {
        $('.search-window').addClass('open');
        e.preventDefault();
    });

    $('.search-window-close').click(function(e) {
        $('.search-window').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('search-window')) {
            $('.search-window').removeClass('open');
        }
    });

    $('.compare').each(function() {
        if ($('.compare-header').width() < $('.compare-header .compare-list').width() - 20) {
            $('.compare-next').addClass('visible');
            $('.compare').data('curIndex', 0);
        }
    });

    $('.compare-next').click(function() {
        var curIndex = $('.compare').data('curIndex');
        curIndex++;
        var curLeft = $('.compare-header .compare-cell').eq(0).outerWidth() * curIndex;
        if ($('.compare-header').width() <= $('.compare-header .compare-list').width() - 20 - curLeft) {
            $('.compare').data('curIndex', curIndex);
            $('.compare-list').css({'transform': 'translateX(-' + curLeft + 'px)'});
        }
        if ($('.compare-header').width() >= $('.compare-header .compare-list').width() - 20 - curLeft) {
            $('.compare-next').removeClass('visible');
        }
        $('.compare-prev').addClass('visible');
    });

    $('.compare-prev').click(function() {
        var curIndex = $('.compare').data('curIndex');
        curIndex--;
        var curLeft = $('.compare-header .compare-cell').eq(0).outerWidth() * curIndex;
        if (curIndex >= 0) {
            $('.compare').data('curIndex', curIndex);
            $('.compare-list').css({'transform': 'translateX(-' + curLeft + 'px)'});
        }
        if (curIndex == 0) {
            $('.compare-prev').removeClass('visible');
        }
        $('.compare-next').addClass('visible');
    });

    $('.dimmer-table-next').click(function() {
        $('.dimmer-table').addClass('to-right');
    });

    $('.dimmer-table-prev').click(function() {
        $('.dimmer-table').removeClass('to-right');
    });

    $('body').on('click', '.collection-products-list .collection-products-item-compare a:first-child, .main-collection-list .collection-products-item-compare a:first-child', function(e) {
        $(this).parent().addClass('in-compare');
        e.preventDefault();
    });

});

$(window).on('load resize', function() {
    $('.compare').each(function() {
        var curIndex = $('.compare').data('curIndex');
        var curLeft = $('.compare-header .compare-cell').eq(0).outerWidth() * curIndex;
        $('.compare-list').css({'transform': 'translateX(-' + curLeft + 'px)'});
    });

    $('.collection-products-list, .main-collection-list, .compare-list').each(function() {
        var curList = $(this);

        curList.find('.collection-products-item-title').css({'min-height': '0px'});

        curList.find('.collection-products-item-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.collection-products-item-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = '27px';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.parents().filter('.window').length == 0) {
            curSelect.select2({
                minimumResultsForSearch: 10
            });
        } else {
            curSelect.select2({
                minimumResultsForSearch: 10,
                dropdownParent: $('.window-content')
            });
        }
        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
        });
        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.validate({
        ignore: ''
    });
}

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();
    var curHeight = $(window).height();
    if ($('.compare-header').length == 1) {
        if ((curScroll > $('.compare-container').offset().top - $('.compare-header-fixed').height()) && (curScroll < $('.compare-container').offset().top - $('.compare-header-fixed').height() + $('.compare-container').height())) {
            $('.compare-header-fixed').addClass('visible');
        } else {
            $('.compare-header-fixed').removeClass('visible');
        }
    }

    if ($('.dimmer-table').length == 1) {
        if ((curScroll > $('.dimmer-table').offset().top) && (curScroll < $('.dimmer-table-container').offset().top - $('.dimmer-table-fixed').height() + $('.dimmer-table-container').height())) {
            $('.dimmer-table-fixed').addClass('visible');
        } else {
            $('.dimmer-table-fixed').removeClass('visible');
        }
    }

    $('.main-collection-title, .main-collection-text, .main-collection-big, .main-collection-list, .collection-products-item, .main-sections-item, .main-video-title, .main-video-list, .product-info, .product-tech, .product-gallery, .product-download, .product-header, .slider-collection').each(function() {
        if ($(this).offset().top < curScroll + curHeight) {
            $(this).addClass('animated');
        }
    });
});