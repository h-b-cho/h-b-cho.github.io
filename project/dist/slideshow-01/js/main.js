$(function () {
	var slides = $('.slideshow .slide'),
			slideLength = slides.length,
			timer = undefined,
			curIdx = 0;

	slides.eq(curIdx).fadeIn();
	
	startSld();

	function startSld(){
		if(!timer){ 
			timer = setInterval(NxtSld, 1500);
		}    
	}

	function NxtSld(){
		var nextIdx = (curIdx + 1) % slideLength;
		slides.eq(curIdx).fadeOut();
		slides.eq(nextIdx).fadeIn();
		curIdx = nextIdx;
		console.log(timer);
	}
	
	function pauseSld(){
		clearInterval(timer);
		timer = undefined;
	}

	slides.mouseover(function(){
		pauseSld();
		console.log(timer);
	})
	.mouseout(function(){
		startSld();
		console.log(timer);
	}); 

});