document.addEventListener("DOMContentLoaded", function(){
  //document.addEventListener("DOMContentLoaded", () => {

	var slideshow = document.querySelector('.slide-container'),
		slide = document.querySelectorAll('.slide-container .slide'),
		slideCount = slide.length,
    navs = document.querySelectorAll('.slide-container .slide-nav a'),
		nav = document.querySelector('.slide-container .slide-nav'),
		currentIdx = 0,
		indicator = document.querySelector('#indicator'),
		indicatorHtml = '',
		timer;

		if(slide.length) {

			slide.forEach((item, idx, arr) => {
				indicatorHtml += '<button>' + (idx + 1) + '</button>';
				item.addEventListener('click', () => {
					item[idx].style.left = idx * 100 + '%';
				})
			})
			indicator.innerHTML += indicatorHtml;
			
			var indPlus = document.querySelector('.indicator-container .ind-plus'),
			indicArray = document.querySelectorAll('#indicator button');

			console.log('indicArray: ' + indicArray);//NodeList
  


			
			function moveSlide() {
				for (i=currentIdx;i<slideCount;i++) {
					slide[i].style.left = (-i * 100) + '%';
				}
				currentIdx = i;
				updateNav();
			};




			//indicatorClick
			indicArray.forEach((item, idx) => {
				item.addEventListener('click', function() {
					for (var i=0;i<indicArray.length;i++) {
						indicArray[i].classList.remove('active');
					}
					item.classList.add('active');
				})
				moveSlide(idx - 1);
			})

			// indicArray.find('button:first-of-type').addClass('active'); // 웹사이트 첨 로드 시 첫 페이저 검은색 표기

			//indicatorPlusClick
			// indPlus.click(function(e) {
			// 	e.preventDefault();
			// 	var nextAutoIdx = (currentIdx + 1) % slideCount;
			// 	moveSlide(nextAutoIdx);
			// })
		}

	function startAutoSlide() {
		timer = setInterval(function() {
			var nextAutoIdx = (currentIdx + 1) % slideCount;
			moveSlide(nextAutoIdx);
			for (var i=0;i<indicArray.length;i++) {
				indicArray[i].classList.remove('active');
			}
			indicArray[nextAutoIdx + 1].classList.add('active');
		}, 4000);
	}
	startAutoSlide();

	// function stopAutoSlide() {
	// 	clearInterval(timer);
	// }

	function updateNav() {
		var prevBtn = document.querySelector('.slide-container .slide-nav .prev'),
			nextBtn = document.querySelector('.slide-container .slide-nav .next');
		if (currentIdx == 0) {
			prevBtn.classList.add('disabled');
			nextBtn.classList.remove('disabled');
		}
		if (currentIdx > slideCount) {
			prevBtn.classList.remove('disabled');
			nextBtn.classList.add('disabled');
		}
	}
	updateNav();

	// slideshow.mouseenter(function() {
	// 	stopAutoSlide();
	// }).mouseleave(function() {
	// 	startAutoSlide();
	// })

	// //NavClick
	// nav.find('a').click(function(e) {
	// 	e.preventDefault();
	// 	if ($(this).hasClass('prev')) {
	// 		var currentIdx4nav = currentIdx - 1;
	// 		moveSlide(currentIdx4nav);
	// 		indicator.find('span:nth-of-type(' + (currentIdx4nav + 1) + ')').addClass('active').siblings('span').removeClass('active');
	// 	} else {
	// 		var currentIdx4nav = currentIdx + 1;
	// 		moveSlide(currentIdx4nav);
	// 		indicator.find('span:nth-of-type(' + (currentIdx4nav + 1) + ')').addClass('active').siblings('span').removeClass('active');
	// 	}
	// })

});