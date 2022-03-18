$(document).ready(function() {
  
	var slideshow = $('.slide-container'),
		slides = slideshow.find('.slideshow-slides'),
		slide = slides.find('.slide'),
		slideCount = slide.length,
		nav = $('.slide-container .slide-nav'),
		currentIdx = 0,
		indicator = slideshow.find('.indicator'),
		indicatorHtml = '<div class="ind-plus">+</div>',
		duration = 600,
		interval = 1000,
		timer;

	indicator.find('span:first-of-type').addClass('active');
	indicator.html(indicatorHtml);
	startAutoSlide();
	updateNav();

	slide.each(function(i) {
		$(this).css({left: i * 100 + '%'});
		indicatorHtml += '<span>' + (i + 1) + '</span>';
	});

	function moveSlide(i) {
		slides.stop().animate({left: (-i * 100) + '%'}, duration);
		currentIdx = i;
		updateNav();
	};

	function updateNav() {
		var prevBtn = nav.find('.prev'),
			nextBtn = nav.find('.next');
		if (currentIdx == 0) {
			prevBtn.addClass('disabled')
			nextBtn.removeClass('disabled')
		} else if (currentIdx == slideCount - 1) {
			prevBtn.removeClass('disabled')
			nextBtn.addClass('disabled')
		} else {
			prevBtn.removeClass('disabled')
			nextBtn.removeClass('disabled')
		}
	}

	function startAutoSlide() {
		timer = setInterval(function() {
			var nextAutoIdx = (currentIdx + 1) % slideCount;
			moveSlide(nextAutoIdx);
			indicator.find('span:nth-of-type(' + (nextAutoIdx + 1) + ')').addClass('active').siblings('span').removeClass('active');
		}, interval);
	}

	function stopAutoSlide() {
		clearInterval(timer);
	}

	slideshow.mouseenter(function() {
		stopAutoSlide();
	}).mouseleave(function() {
		startAutoSlide();
	})

	//NavClick
	nav.find('a').click(function(e) {
		e.preventDefault();
		if ($(this).hasClass('prev')) {
			var currentIdx4nav = currentIdx - 1;
			moveSlide(currentIdx4nav);
			indicator.find('span:nth-of-type(' + (currentIdx4nav + 1) + ')').addClass('active').siblings('span').removeClass('active');
		} else {
			var currentIdx4nav = currentIdx + 1;
			moveSlide(currentIdx4nav);
			indicator.find('span:nth-of-type(' + (currentIdx4nav + 1) + ')').addClass('active').siblings('span').removeClass('active');
		}
	})

	//indicatorClick
	indicator.find('span').click(function(e) {
		e.preventDefault();
		targetIdx = $(this).index() - 1,
		moveSlide(targetIdx);
		$(this).addClass('active').siblings().removeClass('active'); // 현재 활성화된 슬라이드에만 페이저 검은색으로
	})


	//indicatorPlusClick
	indicator.find('.ind-plus').click(function(e) {
		e.preventDefault();
		var nextAutoIdx = (currentIdx + 1) % slideCount;
		moveSlide(nextAutoIdx);
		indicator.find('span:nth-of-type(' + (nextAutoIdx + 1) + ')').addClass('active').siblings('span').removeClass('active');
	})

});