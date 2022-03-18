$(document).ready(function() {

  var slideshow = $('.slide-container'),
    slides = slideshow.find('.slideshow-slides'),
    slide = slides.find('.slide'),
    slideCount = slide.length,
    currentIdx = 0,
    duration = 1000,
    interval = 2000,
    timer;     

  slide.each(function(i) {
    $(this).css({left: i * 100 + '%'});
  });

  function moveSlide(i) {
    slides.stop().animate({left: (-i * 100) + '%'}, duration);
    currentIdx = i;
  };

  function startAutoSlide() {
    timer = setInterval(function() {
      var nextAutoIdx = (currentIdx + 1) % slideCount;
      moveSlide(nextAutoIdx);
    }, interval);
  }
  startAutoSlide();

  function stopAutoSlide() {
    clearInterval(timer);
  }

  slideshow.mouseenter(function() {
    stopAutoSlide();
  }).mouseleave(function() {
    startAutoSlide();
  })

});