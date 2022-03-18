document.addEventListener("DOMContentLoaded", function(){

  var slideShow = document.querySelector('.slide-container'),
    slide = document.querySelectorAll('.slide-container ul li.slide'),
    indicator = document.querySelector('.indicator-container .indicator'),
    indicPlus = document.querySelector('.indicator-container .ind-plus'),
    navigation = document.querySelectorAll('.slide-nav a'),
    navPrev = document.querySelector('.slide-nav [data-direction="prev"]'),
    navNext = document.querySelector('.slide-nav [data-direction="next"]'),
    progressbar = document.querySelector('.progress-container'),
    currentSlideIdx = 0,
    indicArray,
    progressbarArray,
    progressbarSpanArray,
    indicatorHtml = '',
    progressbarHtml = '',
    navAttr = '',
    myinterval = 3500,
    timer;

  if (slideShow) {

    setSlide();
    startAutoSlide();
    updateSlide(0);

    function setSlide(){
      slide.forEach((item, idx, arr) => {
        item.style.left = `${idx * 100}%`;
        arr[0].classList.add('active');
        item.classList.remove('active');
        indicatorHtml += `<button>${idx + 1}</button>`;
        progressbarHtml += `<div><span>${idx + 1}</span></div>`;
      })
      indicator.innerHTML = indicatorHtml;
      indicArray = document.querySelectorAll('.indicator button');
      progressbar.innerHTML = progressbarHtml;
      progressbarArray = document.querySelectorAll('.progress-container div');
      progressbarSpanArray = document.querySelectorAll('.progress-container div span');
      progressbarArray.forEach(item => {
        item.style.width = `${100 / slide.length}%`;
      })
      navPrev.classList.add('disabled');
    }

    slideShow.addEventListener('mouseenter', () => {stopAutoSlide()});
    slideShow.addEventListener('mouseleave', () => {startAutoSlide()});
    indicArray.forEach((item, targetIndex) => {
      item.addEventListener('click', () => {
        currentSlideIdx = targetIndex;
        moveSlide(targetIndex);
        updateSlide(targetIndex);
      })
    })

    indicPlus.addEventListener('click', function(event){
      event.preventDefault();
      currentSlideIdx += 1;
      if (currentSlideIdx > slide.length - 1) currentSlideIdx = 0;
      moveSlide(currentSlideIdx);
      updateSlide(currentSlideIdx);
    })

    function startAutoSlide(){
      timer = setInterval(function(){
        currentSlideIdx++;
        if (currentSlideIdx > slide.length - 1) currentSlideIdx = 0;
        moveSlide(currentSlideIdx);
        updateSlide(currentSlideIdx);
      }, myinterval);
    }

    function stopAutoSlide(){
      clearInterval(timer);
    }

    function updateIndic(i){
      indicArray.forEach(function(item){
        item.className = '';
      })
      indicArray[i].classList.add('active');
    }

    function updateNavs(){
      if (currentSlideIdx == 0){
        navPrev.classList.add('disabled');
        navNext.className = '';
        return;
      } 
      // currentSlideIdx === 0 ?  navPrev.classList.add('disabled') && navNext.className.remove('disabled') : [navNext, navPrev].className = '';
      if (currentSlideIdx == slide.length - 1){
        navPrev.className = '';
        navNext.classList.add('disabled');
        return;
      }
      navPrev.className = '';
      navNext.className = '';
    }

    navigation.forEach(function(item){
      item.addEventListener('click', event => {
        navAttr = item.getAttribute('data-direction');
        event.preventDefault();
        //prev
        if(navAttr === 'prev'){
          currentSlideIdx--;
          moveSlide(currentSlideIdx);
          updateSlide(currentSlideIdx);
          return;
        }
        //next
        currentSlideIdx++;
        moveSlide(currentSlideIdx);
        updateSlide(currentSlideIdx);
      })
    })

    function progressbarUpdate(target){
      progressbarArray.forEach((item, i) => {
        progressbarArray[i].style.left = `${100 / slide.length * i}%`;
        item.className = '';
      })
      progressbarSpanArray.forEach(item => {
        item.style.transition = `width ` + myinterval / 1000 + `s`;
      })
      progressbarArray[target].classList.add('active');
    }
  
    function moveSlide(j){
      slide.forEach((item, i) => {
        if (i > slide.length - 1) i = 0;
        slide[i].style.left = `${( i - j ) * 100}%`;
      })
    }

    function updateSlide(slideIndex){
      updateNavs();
      updateIndic(slideIndex);
      progressbarUpdate(slideIndex);
    }

  }//if(slide.length > 0)
})