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

	const deadLine = '2020-03-23';

	function getTimeRemaining(endtime) {
		// Рассчитываем кол-во милисекунд от текущей до конечной даты и преобразуем их в секунды, минуты и т.д.
		const t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / 1000 / 60 / 60) % 24),
			days = Math.floor(t / (1000 * 60 * 60 * 24));

		//Если дата меньше текущей, то выходим из функции
		if (t <= 0) {
			return;
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(endtime) {

		const timer = document.querySelector('#timer'),
			days = timer.querySelector('.days'),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			//В переменную t получаем объект со значениями из первой функции
			const t = getTimeRemaining(endtime);

			t.days > 10 ?
				days.textContent = t.days : //Страховка на случай, сли дней больше 100
				days.textContent = '0' + t.days;
			// Если значение состоит из одной цифры, то добавляем ноль в начало
			hours.textContent = ('0' + t.hours).slice(-2);
			minutes.textContent = ('0' + t.minutes).slice(-2);
			seconds.textContent = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				// Останавливаем таймер, если время вышло
				clearInterval(timeInterval);
			}
		}

	}

	setClock(deadLine);


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

	// Form

	let message = {
		loading: "Загрузка",
		sucsess: "Спасибо, мы скоро с вами свяжемся",
		failure: "Что-то пошло не так..."
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.setRequestHeader('Content-Type', 'application/json charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});

		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function () {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status === 200) {
				statusMessage.innerHTML = message.sucsess;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});
});
