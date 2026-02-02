/*
	Dopetrope by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center'
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel (mobile menu: close + main nav + social links at bottom).
			(function() {
				var mainNavHtml = '';
				$('#nav > ul > li:not(.social-icons) > a').each(function() {
					var $a = $(this);
					var href = $a.attr('href');
					var target = $a.attr('target');
					if (!href || href === '#') return;
					mainNavHtml += '<a class="link depth-0" ' + (target ? ' target="' + target + '"' : '') + ' href="' + href + '"><span class="indent-0"></span>' + $a.text().trim() + '</a>';
				});
				var socialHtml = '<div class="nav-panel-social">' +
					'<a href="https://www.facebook.com/people/Newport-Sushi-co/61574827383154/" target="_blank" rel="noopener" aria-label="Facebook" class="link link-social">' +
					'<i class="fab fa-facebook-f" aria-hidden="true"></i> Facebook</a>' +
					'<a href="https://www.instagram.com/newportsushico/" target="_blank" rel="noopener" aria-label="Instagram" class="link link-social">' +
					'<i class="fab fa-instagram" aria-hidden="true"></i> Instagram</a>' +
					'</div>';
				$(
					'<div id="navPanel">' +
						'<nav>' +
							'<a href="#navPanel" class="link link-close depth-0">Close menu</a>' +
							mainNavHtml +
							socialHtml +
						'</nav>' +
					'</div>'
				)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});
			})();

		// Update hamburger aria-expanded when panel opens/closes (accessibility).
		$body.on('click', 'a[href="#navPanel"]', function() {
			window.setTimeout(function() {
				var open = $body.hasClass('navPanel-visible');
				$('#nav-toggle').attr('aria-expanded', open);
			}, 100);
		});

})(jQuery);