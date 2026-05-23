(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 500);
    };
    spinner();

    // Init WOW.js
    new WOW().init();

    // Add shadow on scroll for fixed navbar
    function navbarShadow() {
        var navbar = $('.navbar');
        if ($(window).scrollTop() > 50) {
            navbar.addClass('navbar-scrolled');
        } else {
            navbar.removeClass('navbar-scrolled');
        }
    }
    $(window).scroll(navbarShadow);
    navbarShadow();

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });
    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });

    // Counter animation
    function animateCounter() {
        $('.counter').each(function () {
            var $this = $(this);
            var target = parseInt($this.text());
            if (!isNaN(target)) {
                $this.text('0');
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    easing: 'easeOutExpo',
                    step: function () {
                        $this.text(Math.floor(this.count));
                    },
                    complete: function () {
                        $this.text(target);
                    }
                });
            }
        });
    }

    // Trigger counters when visible
    var countersAnimated = false;
    $(window).on('scroll', function () {
        var statsTop = $('.stats-row').offset().top;
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if (statsTop < scrollBottom && !countersAnimated) {
            countersAnimated = true;
            animateCounter();
        }
    });

    // Smooth scroll for nav links
    $('.navbar-nav a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            var navbarHeight = $('.navbar').outerHeight();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - navbarHeight - 10
            }, 800, 'easeInOutExpo');
            // Close hamburger on mobile
            $('#navbarMain').collapse('hide');
        }
    });

    // Theme toggle
    var themeSwitch = $('#themeSwitch');
    var body = $('body');

    function setTheme(theme) {
        if (theme === 'light') {
            body.addClass('light-theme');
            themeSwitch.find('.fa-sun').hide();
            themeSwitch.find('.fa-moon').show();
            localStorage.setItem('srae-theme', 'light');
        } else {
            body.removeClass('light-theme');
            themeSwitch.find('.fa-sun').show();
            themeSwitch.find('.fa-moon').hide();
            localStorage.setItem('srae-theme', 'dark');
        }
    }

    var savedTheme = localStorage.getItem('srae-theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeSwitch.on('click', function () {
        var isLight = body.hasClass('light-theme');
        setTheme(isLight ? 'dark' : 'light');
    });

    // Floating sun particles
    function createSunParticle() {
        var particle = $('<div class="sun-particle"></div>');
        var size = Math.random() * 6 + 3;
        var startX = Math.random() * window.innerWidth;
        var duration = Math.random() * 8 + 6;
        var delay = Math.random() * 5;

        particle.css({
            width: size + 'px',
            height: size + 'px',
            left: startX + 'px',
            animationDuration: duration + 's',
            animationDelay: delay + 's'
        });

        $('body').append(particle);

        setTimeout(function () {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    setInterval(createSunParticle, 1500);
    for (var i = 0; i < 8; i++) {
        setTimeout(createSunParticle, i * 200);
    }

    // Form submit to WhatsApp
    $('.contact-form-wrap form').on('submit', function (e) {
        e.preventDefault();
        var name = $(this).find('input[type="text"]').val();
        var email = $(this).find('input[type="email"]').val();
        var phone = $(this).find('input[type="tel"]').val();
        var service = $(this).find('select').val() || 'No especificado';
        var message = $(this).find('textarea').val();

        var text = 'Hola SRAE PERU, soy ' + name + '.%0A' +
                   'Email: ' + email + '%0A' +
                   'Teléfono: ' + phone + '%0A' +
                   'Servicio: ' + service + '%0A' +
                   'Mensaje: ' + message;

        window.open('https://wa.me/51986366440?text=' + text, '_blank');
    });

})(jQuery);
