$(document).ready(function() {

    $('nav ul li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
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

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        adaptiveHeight: true
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
            dots: true,
            responsive: [
                {
                    breakpoint: 1159,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('afterChange', function(event, slick, currentSlide){
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(currentSlide);
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

    $('.product-other-menu ul li a').click(function(e) {
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

    $('.product-other-menu-current').click(function(e) {
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

    $('.collection-products-filter-current').click(function() {
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
        reloadProducts();
    });

    $('body').on('change', '.collection-products-filter-list input', function() {
        $('.collection-products-container').addClass('loading');
        var curForm = $('.collection-products-ctrl form');
        $.ajax({
            type: 'POST',
            url: curForm.attr('action'),
            dataType: 'html',
            data: curForm.serialize(),
            cache: false
        }).done(function(html) {
            $('.collection-products-container').html(html)
            $('.collection-products-container').removeClass('loading');
        });
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
        var searchHeight = 100;
        if ($('.slider').length == 1) {
            searchHeight = $('.slider').outerHeight();
        }
        if ($('.product-header').length == 1) {
            searchHeight = $('.product-header').outerHeight();
        }
        $('.search-window').height(searchHeight);
        $('.search-window').addClass('open');
        e.preventDefault();
    });

    $('.search-window-close').click(function(e) {
        $('.search-window').removeClass('open');
        e.preventDefault();
    });

});

$(window).on('load resize', function() {
    $('.search-window').removeClass('open');
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