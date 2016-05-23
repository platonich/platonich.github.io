(function($) {

    "use strict";

    $(document).ready(function() {

        /* Happy Birthday timer
        ==================================================================================== */
        var TMR = 1000 * 60, birthday = '23.07.2015 11:30:00';
        countf();

        setInterval(function() {
            countf();
        }, TMR);

        function countf() {
            var a = birthday.split(' '),
                b = a[0].split('.'),
                c = a[1].split(':'),
                d = new Date,
                T = [], C = [];
            T[0] = b[2],            C[0] = d.getFullYear(),
            T[1] = b[1] - 1,        C[1] = d.getMonth(),
            T[2] = parseInt(b[0]),  C[2] = d.getDate(),

            T[3] = parseInt(c[0]),  C[3] = d.getHours(),
            T[4] = parseInt(c[1]),  C[4] = d.getMinutes(),
            T[5] = parseInt(c[2]),  C[5] = d.getSeconds();

            for (var D = [], j = 0; j < 5; j++)
                D[j] = C[j] - T[j];

            if (D[5] < 0)
                D[5] += 60,
                D[4]--;

            if (D[4] < 0)
                D[4] += 60,
                D[3]--;

            if (D[3] < 0)
                D[3] += 24,
                D[2]--;

            if (D[2] < 0)
                D[2] = C[2] + new Date(C[0], C[1], 0).getDate() - T[2],
                D[1]--;

            if (D[1] < 0)
                D[1] = C[1] + 12 - T[1],
                D[0]--;

            for (j = 1; j < 5; j++)
                formTxt(D[j], j);

            function formTxt(n, q) {
                var w = [['год', 'года', 'лет'],
                         ['месяц', 'месяца', 'месяцев'],
                         ['день', 'дня', 'дней'],
                         ['час', 'часа', 'часов'],
                         ['минута', 'минуты', 'минут'],
                         ['секунда', 'секунды', 'секунд']],
                    k = n % 10,
                    l = (!k || n > 5 && n < 21 || k > 4) ? 2 : ((k == 1) ? 0 : 1),
                    t = w[q][l];
                $('#count-'+q).text(n+' '+t);
            }
            TMR = 1000 * 60;
        }

        /* Input element placeholder bug fix
         ==================================================================================== */
        var inputs = document.getElementsByTagName('input');
        inputs.onblur = function () {
            if (this.value == '')
                this.value = this.defaultValue;
        };
        inputs.onfocus = function () {
            if (this.value == this.defaultValue)
                this.value = '';
        };

        /* Hero height for full and half screen
        ==================================================================================== */
        var windowHeight = $(window).height();
        $('.hero').height(windowHeight - 60);

        $(window).resize(function() {
            var windowHeight = $(window).height();
            $('.hero').height(windowHeight - 60);
        });

        /* Responsive Menu - Expand / Collapse on Mobile
        ==================================================================================== */
        function recalculate_height() {
            var nav_height = $(window).outerHeight();
            $("#navigation").height(nav_height - 60);
        }

        $('#menu-toggle-wrapper').on('click', function(event) {
            recalculate_height();
            $(this).toggleClass('open');
            $("body").toggleClass('open');
            $('#navigation').slideToggle(200);
            event.preventDefault();
        });

        $(window).resize(function() {
            recalculate_height();
        });

        /* Main Menu - Add active class for each nav depending on scroll
        ==================================================================================== */
        $('section').each(function() {
            $(this).waypoint(function(direction) {
                if (direction === 'down') {
                    var containerID = $(this).attr('id');
                    /* update navigation */
                    $('#navigation ul li a').removeClass('active');
                    $('#navigation ul li a[href*=#' + containerID + ']').addClass('active');
                }
            }, {
                offset: '60px'
            });

            $(this).waypoint(function(direction) {
                if (direction === 'up') {
                    var containerID = $(this).attr('id');
                    /* update navigation */
                    $('#navigation ul li a').removeClass('active');
                    $('#navigation ul li a[href*=#' + containerID + ']').addClass('active');
                }
            }, {
                offset: function() {
                    return -$(this).height() - 60;
                }
            });
        });

        /* Scroll to Main Menu
        ==================================================================================== */
        $('#navigation a[href*=#],#navigation-dotted a[href*=#]').on('click',function(event) {
            var $this = $(this);
            var offset = -60;

            $.scrollTo($this.attr('href'), 650, {
                easing: 'swing',
                offset: offset,
                'axis': 'y'
            });
            event.preventDefault();

            // For mobiles and tablets, do the thing!
            if ($(window).width() < 1025) {
                $('#menu-toggle-wrapper').toggleClass('open');
                $('#navigation').slideToggle(200);
            }
        });

        /* Scroll to Element on Page - 
        /* USAGE: Add class "scrollTo" and in href add element where you want to scroll page to.
        ==================================================================================== */
        $('a.scrollTo').on('click',function(event) {
            var $target = $(this).attr("href");
            event.preventDefault();
            $.scrollTo($($target), 1250, {
                offset: -60,
                'axis': 'y'
            });
        });

        /* Main Menu - Fixed on Scroll
        ==================================================================================== */
        $("#home-content").waypoint(function(direction) {
            if (direction === 'down') {
                $("#main-menu").removeClass("gore");
                $("#main-menu").addClass("dole");
            } else if (direction === 'up') {
                $("#main-menu").removeClass("dole");
                $("#main-menu").addClass("gore");
            }
        }, {
            offset: '1px'
        });

        /* PARALAX and BG Video - disabled on smaller devices
        ==================================================================================== */
        if (!device.tablet() && !device.mobile()) {

            /* SubMenu */
            $('#main-menu ul > li').on({

                mouseenter: function() {
                    $(this).children('ul').fadeIn(300);
                },
                mouseleave: function() {
                    $(this).children('ul').fadeOut(300);
                }

            });

            $('.hero,#background-image,.parallax').addClass('not-mobile');

            $('section[data-type="parallax"]').each(function() {
                $(this).parallax("50%", 0.5);
            });

            /* fixed background on mobile devices */
            $('section[data-type="parallax"]').each(function(index, element) {
                $(this).addClass('fixed');
            });
        }

        /* Family - equal heights
        ==================================================================================== */
        $('.my-family .row').each(function() {
            var highestBox = 1;
            $('.column', this).each(function(){
                if($(this).outerHeight() > highestBox)
                highestBox = $(this).outerHeight(); 
            });
            $('.column',this).height(highestBox);
        });


        /* SlideShow
        ==================================================================================== */
        $('.hero-slideshow').each(function() {
            var $slide = $(this);
            var $img = $slide.find('img');

            $img.each(function(i) {
                var cssObj = {
                    'background-image': 'url("' + $(this).attr('src') + '")'
                };

                if (i > 0) {
                    cssObj['display'] = 'none';
                }

                $slide.append($("<div />", {
                    'class': 'slide'
                }).css(cssObj));
            });

            if ($img.length <= 1) {
                return;
            }

            setInterval(function() {
                $slide.find('.slide:first').fadeOut('slow')
                    .next('.slide').fadeIn('slow')
                    .end().appendTo($slide);
            }, 5000);
        });


        /* Portfolio Images
        ==================================================================================== */
        $('.gallery-wrapper').magnificPopup({
            delegate: '.block:not(.isotope-hidden) a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            closeOnBgClick: false,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.parent().find('img');
                }
            },
            image: {
                cursor: null,
                markup: '<div class="mfp-figure">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mfp-img"></div>' +
                    '<div class="mfp-bottom-bar">' +
                    '<div class="mfp-title"></div>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="small-gallery-wrapper"><div class="small-gallery"></div></div>',
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.find('.portfolio-title').text(); // place .html() if you need to show categories too.
                }
            },
            setActive: function($gallery, ind) {

                if (ind !== false) {
                    $gallery.find('img').removeClass('active');
                    $gallery.find('img:eq(' + ind + ')').addClass('active');
                }

                var active_left = $gallery.find('img.active').position().left;
                var gall_width = $gallery.parent().width() / 2;
                var active_width = $gallery.find('img.active').width() / 2;

                $gallery.css('left', -((active_left - gall_width) + active_width));

            },
            callbacks: {
                open: function() {
                    var $gallery = this.contentContainer.find('.small-gallery');
                    var magnificPopup = this;
                    $.each(this.st.items, function(i) {
                        var $img = $(this).parent().find('img');
                        $gallery.append($("<img />", {
                            src: $img.attr('src')
                        }).on('click', function() {
                            magnificPopup.goTo(i);
                        }));
                    });

                    this.content.find('img.mfp-img').load(function() {
                        magnificPopup.st.setActive($gallery, magnificPopup.currItem.index);
                    });

                },
                change: function() {
                    var img = this.content.find('img.mfp-img');
                    var magnificPopup = this;
                    var $gallery = this.contentContainer.find('.small-gallery');

                    // Smanjujemo velicinu slika
                    img.css('max-height', parseFloat(img.css('max-height')) * 0.7);

                    if ($gallery.find('img').length) {
                        img.load(function() {
                            magnificPopup.st.setActive($gallery, magnificPopup.currItem.index);
                        });
                    }

                },
                resize: function() {

                    var img = this.content.parent().find('img.mfp-img');
                    var $gallery = this.contentContainer.find('.small-gallery');

                    img.css('max-height', parseFloat(img.css('max-height')) * 0.7);

                    if ($gallery.find('img').length) {
                        this.st.setActive(this.contentContainer.find('.small-gallery'), false);
                    }
                }
            }
        });

        $('.rsvpPopup').magnificPopup({
            type: 'inline',

            fixedContentPos: false,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'zoom-anim-dialog'
        });

        /* Isotope Portfolio
        ==================================================================================== */
        var $container = $('.gallery-wrapper');
        $container.isotope({
            itemSelector: '.block',
            layoutMode: 'sloppyMasonry',
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('#gallery-filter a').on('click', function() {
            $('#gallery-filter li.active').removeClass('active');
            $(this).parent().addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

        /* Instagram Script - change Tag to yours and update ClientId
        ==================================================================================== */
        var instagramTag = 'platonarsenovich'; // Add Instagram Tag here
        var instagramClientId = '630b5c9d2cab44e08fb9d014cf00b2b6'; // Add ClientId here
        var $instagramSection = $('#instagram-section');
        var max_tag_id = false;

        var getInstagramByTag = function() {

            $.ajax({
                url: "https://api.instagram.com/v1/tags/" + instagramTag + "/media/recent",
                data: $.extend({}, {
                    client_id: instagramClientId,
                    count: 23,
                }, (max_tag_id ? {
                    max_tag_id: max_tag_id
                } : {})),
                type: "GET",
                dataType: "jsonp",
            }).done(function(resp) {

                var img = [];

                $.each(resp.data, function() {
                    if (this.type != 'image') {
                        return;
                    }
                    if (this.caption !=null) { 
                        if(this.caption.text != null) { 
                            var title = this.caption.text; 
                        } 
                    } else { var title = ""; }
                    img.push(
                        $("<a href='" + this.link + "' target='_blank'></a>").append(
                            $("<img>", {
                                src: this.images.thumbnail.url,
                                title: title
                            })
                        )
                    );
                });

                if (typeof resp.pagination.next_max_tag_id != 'undefined') {
                    max_tag_id = resp.pagination.next_max_tag_id;
                } else {
                    $instagramSection.find('.load-more').fadeOut();
                }

                $instagramSection.find('.instagram-images').append(img);
            });
        };

        $instagramSection.on('click', '.load-more', function(e) {
            e.preventDefault();

            getInstagramByTag();
        });

        getInstagramByTag();

        /* WOW plugin triggers animation.css on scroll
        ================================================== */
        var wow = new WOW(
          {
            boxClass:     'wow', // animated element css class (default is wow)
            offset:       250,   // distance to the element when triggering the animation (default is 0)
            mobile:       false  // trigger animations on mobile devices (true is default)
          }
        );

        /* Share Icons
        ==================================================================================== */
        $('.share').socShare({
            facebook: '.soc-fb',
            twitter: '.soc-tw',
            google_plus: '.soc-gplus',
            pinterest: '.soc-pin'
        });

        /* Contact Form
         ==================================================================================== */
        (function(e) {
            function n(e, n) {
                this.$form = e;
                this.indexes = {};
                this.options = t;
                for (var r in n) {
                    if (this.$form.find("#" + r).length && typeof n[r] == "function") {
                        this.indexes[r] = n[r]
                    } else {
                        this.options[r] = n[r]
                    }
                }
                this.init()
            }
            var t = {
                _error_class: "error",
                _onValidateFail: function() {}
            };
            n.prototype = {
                init: function() {
                    var e = this;
                    e.$form.on("submit", function(t) {
                        e.process();
                        if (e.hasErrors()) {
                            e.options._onValidateFail();
                            t.stopImmediatePropagation();
                            return false
                        }
                        return true
                    })
                },
                notEmpty: function(e) {
                    return e != "" ? true : false
                },
                isEmail: function(e) {
                    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
                },
                isUrl: function(e) {
                    var t = new RegExp("(^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?))[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?", "gim");
                    return t.test(e)
                },
                elClass: "",
                setClass: function(e) {
                    this.elClass = e
                },
                process: function() {
                    this._errors = {};
                    for (var t in this.indexes) {
                        this.$el = this.$form.find("#" + t);
                        if (this.$el.length) {
                            var n = e.proxy(this.indexes[t], this, e.trim(this.$el.val()))();
                            if (this.elClass) {
                                this.elClass.toggleClass(this.options._error_class, !n);
                                this.elClass = ""
                            } else {
                                this.$el.toggleClass(this.options._error_class, !n)
                            }
                            if (!n) {
                                this._errors[t] = n
                            }
                        }
                        this.$el = null
                    }
                },
                _errors: {},
                hasErrors: function() {
                    return !e.isEmptyObject(this._errors)
                }
            };
            e.fn.isValid = function(t) {
                return this.each(function() {
                    var r = e(this);
                    if (!e.data(r, "is_valid")) {
                        e.data(r, "is_valid", new n(r, t))
                    }
                })
            }
        })(jQuery)

        var $form = $('.actionform');

        //get security question
        function setFormAutoValue(cb) {
            $.ajax({
                'url': 'action.php',
                'data': {
                    get_auto_value: ''
                },
                'type': "POST",
                'dataType': 'json',
            }).done(function(response) {

                if (typeof response.data != 'undefined') {
                    $form.find('.auto-safe label').text(unescape(response.data));
                }

                if (cb) {
                    cb();
                }

            });
        }

        $form.on('click', '.auto-refresh', function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass('fa-spin');

            setFormAutoValue(function() {
                $this.removeClass('fa-spin');
            });
        });

        // setFormAutoValue();

        //ajax contact form
        $form.isValid({
            'name': function(data) {
                this.setClass(this.$el.parent());
                return this.notEmpty(data);
            },
            'email': function(data) {
                this.setClass(this.$el.parent());
                return this.isEmail(data);
            },
            'subject': function(data) {
                this.setClass(this.$el.parent());
                return this.notEmpty(data);
            },
            'autovalue': function(data) {
                this.setClass(this.$el.parent());
                return this.notEmpty(data);
            }
        }).submit(function(e) {
            e.preventDefault();
            var $this = $(this);

            $this.find('.notification')
                .attr('class', 'notification');
            $this.find('.notification').text('');

            $.ajax({
                'url': $this.attr('action'),
                'type': $this.attr('method'),
                'dataType': 'json',
                'data': $(this).serialize()
            }).done(function(response) {
                $this.find('.loading').hide();
                if (typeof response.type != 'undefined' && typeof response.message != 'undefined') {
                    $this.find('.notification')
                        .addClass(response.type + 'msg')
                        .text(response.message);

                    if (response.type == 'success') {
                        $this.find('input[type="text"], input[type="email"], textarea').val('');
                        setFormAutoValue();
                    }
                }
            });

        });

    });

})(jQuery);