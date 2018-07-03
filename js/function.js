/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	$('[data-scroll-to]').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) {
		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
		}
		return false;
	});

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });

    // Inputmask.js
    $('[name=tel]').inputmask("+9 999 99 999 99",{ showMaskOnHover: false });

   	// gridMatch();

    fontResize();
    formSubmit();

    $('.choice__slider').slick({
        arrows: false,
        dots: true
    });

    $('.faqs__toggler,.faqs__quest').on('click', function() {
        var item = $(this).closest('.faqs__item');

        if (item.hasClass('open')) {
            item.removeClass('open');
        } else {
            $('.faqs__item').removeClass('open');
            item.addClass('open');
        }
    });

    mapsList();

    firstScreenAnim();

    // Выставляем опцию для определения положения по ip
    ymaps.ready(function () {
        ymaps.geolocation.get({
            provider: 'yandex',
        }).then(function (result) {
            var thisCity = 0;
            var currentLocate = result.geoObjects.get(0).properties._data.name;
            $(".dillers__city").each(function() {
                console.log($(this).text())
                if ($(this).text() == currentLocate) {
                    // console.log('thisCity = true')
                    return false;
                } else {
                    thisCity++;
                    // console.log(thisCity)

                }
            });
            // console.log(result.geoObjects.get(0).properties._data.name);
            if (thisCity >= 4) {
                $(".dillers__city").last().text(currentLocate)
            }
        });
    });

    $('[data-product-modal]').on('click', function() {
        var modal = $(this).closest('.choice__gridItem').next('.modal');
        var modalId = modal.attr('id');
        var slider1 = modal.find('.product__slide');
        var slider2 = modal.find('.product__thumbs');
        $('#'+modalId+'').modal('show');
        productSliders(slider1, slider2);
        
    });

    $('.product__plus,.product__minus').on('click', function() {
        var field = $(this).closest('.product__count').find('input');
        var fieldVal = field.val();
        var plus = $(this).hasClass('product__plus');
        var minus = $(this).hasClass('product__minus');
        var price = $(this).closest('.product__buy').find('.product__price');
        var priceVal = price.data('price');

        if (plus) {
            fieldVal++;
            field.val(fieldVal);
            price.html(priceVal * fieldVal)
        }
        if (minus) {
            if (fieldVal != 1) {
                fieldVal--;
                field.val(fieldVal)
                price.html(priceVal * fieldVal)
            } else {
                return false;
            }
        }

    });

    $('.firstScreen__companyItem:nth-child(2)').addClass('anim');
    $('.firstScreen__companyItem').on('mouseenter', function() {
        $('.firstScreen__companyItem:nth-child(2)').removeClass('anim');
    });

});

function productSliders(slide1, slide2) {    
    slide1.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        draggable: false,
        asNavFor: slide2
    });
    slide2.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: slide1,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });
}


function firstScreenAnim() {
    if (!isXsWidth()) {
        setTimeout(function() {
            $('.firstScreen__imgFluxport').addClass('visible animated bounceInDown');
        }, 100);
        setTimeout(function() {
            $('.firstScreen__imgIphone').addClass('visible animated bounceInDown');
        }, 1500);
        setTimeout(function() {
            $('.firstScreen__rightTooltips').addClass('visible animated bounceInDown');
        }, 2200);
        setTimeout(function() {
            $('.firstScreen__imgCharged').addClass('charged');
        }, 3000);
    } else {
       $('.firstScreen__img,.firstScreen__rightTooltips').removeClass('hidden');
       $('.firstScreen__imgCharged').addClass('charged');
    }

}

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize()
});

function checkOnResize() {
   	// gridMatch();

    fontResize();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth < 1800 && windowWidth >= 768) {
    	var fontSize = windowWidth/16.25;
    } else if (windowWidth < 768) {
    	var fontSize = 54;
    // } else if (windowWidth >= 1770) {
    // 	var fontSize = 100;
    }
	$('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
$(function () {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            var videoId = $(this).closest('.js_youtube').attr('id');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'width': $(this).width(),
                'height': $(this).innerHeight()
            })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});


// Деление чисел на разряды Например из строки 10000 получаем 10 000
// Использование: thousandSeparator(1000) или используем переменную.
// function thousandSeparator(str) {
//     var parts = (str + '').split('.'),
//         main = parts[0],
//         len = main.length,
//         output = '',
//         i = len - 1;
    
//     while(i >= 0) {
//         output = main.charAt(i) + output;
//         if ((len - i) % 3 === 0 && i > 0) {
//             output = ' ' + output;
//         }
//         --i;
//     }

//     if (parts.length > 1) {
//         output += '.' + parts[1];
//     }
//     return output;
// };


// Хак для яндекс карт втавленных через iframe
// Страуктура:
//<div class="map__wrap" id="map-wrap">
//  <iframe style="pointer-events: none;" src="https://yandex.ru/map-widget/v1/-/CBqXzGXSOB" width="1083" height="707" frameborder="0" allowfullscreen="true"></iframe>
//</div>
// Обязательное свойство в style которое и переключет скрипт
// document.addEventListener('click', function(e) {
//     var map = document.querySelector('#map-wrap iframe')
//     if(e.target.id === 'map-wrap') {
//         map.style.pointerEvents = 'all'
//     } else {
//         map.style.pointerEvents = 'none'
//     }
// })

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){ 
        e.preventDefault();
        var form = $(this).closest('.form');
        var url = 'send.php';
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }  
        });

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {        
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    // $('#success').modal('show');
                    // console.log('success');
                    // console.log(response);
                    // console.log(data);
                    if (form.attr('id') == 'calculate') {
                        document.location.href = "files/Презентация.pdf";
                    } else {
                        document.location.href = "success.html";
                    }
                },
                error: function (response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    // console.log(response);
                }
            });
        }

    });

    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

    $('.form__privacy input').on('change', function(event) {
        event.preventDefault();
        var btn = $(this).closest('.form').find('.btn');
        if ($(this).prop('checked')) {
            btn.removeAttr('disabled');
            $(this).closest('.form__privacy').removeClass('invalid');
            // console.log('checked');
        } else {
            btn.attr('disabled', true);
            $(this).closest('.form__privacy').addClass('invalid');
        }
    });
}

ymaps.ready(function () {
    var myMap = new ymaps.Map('map-wrap', {
            center: [59.90367006420742,30.300668499999983],
            zoom: 17,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Flux Port',
            balloonContent: '<b>Flux Port</b><br />Беспроводные зарядные устройства из Германии для бизнеса и дома'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-marker.png',
            // Размеры метки.
            iconImageSize: [107, 147],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-50, -147]
        });

    myMap.geoObjects
        .add(myPlacemark);

    myMap.behaviors.disable('scrollZoom');
});

function mapsList() {
    ymaps.ready(function () {
        $('.office__listMap').each(function(index) {
            var coord = $(this).data('coord');
            var id = $(this).attr('id');
            var map = 'myMap' + index;
            // console.log(coord);
            var map = new ymaps.Map(id, {
                    center: coord,
                    zoom: 14,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                });

            // map.container.fitToViewport();
            map.behaviors.disable('scrollZoom');
        });
    });
}
