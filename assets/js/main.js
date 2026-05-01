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

	// Upcoming appearances ticker beneath nav.
		(function() {
			var nav = document.getElementById('nav');
			if (!nav) return;

			var monthMap = {
				january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
				july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
			};

			function parseDate(dateStr) {
				if (!dateStr || typeof dateStr !== 'string') return null;
				var parts = dateStr.split(',');
				if (parts.length < 2) return null;
				var left = parts[0].trim().split(/\s+/);
				var year = parseInt(parts[1], 10);
				if (left.length < 2 || isNaN(year)) return null;
				var month = monthMap[left[0].toLowerCase()];
				var day = parseInt(left[1], 10);
				if (typeof month !== 'number' || isNaN(day)) return null;
				var d = new Date(year, month, day);
				d.setHours(0, 0, 0, 0);
				return d;
			}

			function createTicker(items) {
				if (!items || !items.length) return;
				var ticker = document.createElement('div');
				ticker.className = 'schedule-ticker';
				ticker.innerHTML =
					'<div class="schedule-ticker-label">Upcoming</div>' +
					'<div class="schedule-ticker-viewport">' +
						'<div class="schedule-ticker-track">' +
							'<span class="schedule-ticker-content"></span>' +
							'<span class="schedule-ticker-content" aria-hidden="true"></span>' +
						'</div>' +
					'</div>';

				var text = items.join('  \u2726  ');
				var contentEls = ticker.querySelectorAll('.schedule-ticker-content');
				for (var i = 0; i < contentEls.length; i++) {
					contentEls[i].textContent = text + '  \u2726  ';
				}
				nav.insertAdjacentElement('afterend', ticker);
			}

			fetch('schedule.json?v=20260501', { cache: 'no-store' })
				.then(function(resp) {
					if (!resp.ok) throw new Error('schedule fetch failed');
					return resp.json();
				})
				.then(function(data) {
					var today = new Date();
					today.setHours(0, 0, 0, 0);
					var list = Array.isArray(data) ? data : [];
					var upcoming = list.filter(function(e) {
						if (!e || e._example || !e.date) return false;
						var d = parseDate(e.date);
						return d && d >= today;
					}).sort(function(a, b) {
						return parseDate(a.date) - parseDate(b.date);
					}).slice(0, 5);

					if (!upcoming.length) return;

					var items = upcoming.map(function(e) {
						var parts = [];
						if (e.date) parts.push(e.date);
						if (e.venue) parts.push(e.venue);
						if (e.time) parts.push(e.time);
						return parts.join(' - ');
					});
					createTicker(items);
				})
				.catch(function() {
					// Keep hidden when schedule data is unavailable.
				});
		})();

})(jQuery);