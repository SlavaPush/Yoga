window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	//TABS
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (e) {
		let target = e.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});


	//TIMER

	let deadLine = '2020-03-11';

	function getTimeRemaining(endtime) {

		if (Date.parse(endtime) < Date.parse(new Date())) {
			return {
				'total': Date.parse(endtime) - Date.parse(new Date()),
				'days': '00',
				'hours': '00',
				'minutes': '00',
				'seconds': '00'
			};
		}
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / 1000 / 60 / 60) % 24),
			days = Math.floor(t / (1000 * 60 * 60 * 24));



		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endtime) {

		let timer = document.getElementById(id),
			days = timer.querySelector('.days'),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {

			let t = getTimeRemaining(endtime);
			days.textContent = t.days;
			if (days.textContent.length === 1) {
				days.textContent = '0' + days.textContent;
			}
			hours.textContent = t.hours;
			if (hours.textContent.length === 1) {
				hours.textContent = '0' + hours.textContent;
			}
			minutes.textContent = t.minutes;
			if (minutes.textContent.length === 1) {
				minutes.textContent = '0' + minutes.textContent;
			}
			seconds.textContent = t.seconds;
			if (seconds.textContent.length === 1) {
				seconds.textContent = '0' + seconds.textContent;
			}

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}

	setClock('timer', deadLine);


	// Modal

	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descr = document.querySelectorAll('.description-btn');

	function openModal(el) {
		el.addEventListener('click', function () {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	}

	descr.forEach(el => {
		openModal(el);
	});

	openModal(more);

	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});


});
