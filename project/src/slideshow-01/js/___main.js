$(function () {
	var slides = $('.slideshow .slide'),
			slideCount = slides.length,
			timer = undefined, //timer, 하고 넘어가도 되는데 이 땐 변수긴 한데 무슨 타입인지 지정하지 않아서, 이따끔 버벅이는 현상이 일어난다. jvs 와 jq 는 다른 언어들과 다르게 데이터의 타입을 지정하지 않는다. 
			currentIdx = 0;  
	/*
	jQ 에서 집합객체 $('.slideshow img ')로 만들어야 메소드를 쓸 수 있다.
			//slides[0].css({display:'block'});  -->  console로 찍었을 때 jQ 에서 집합객체가 jvs에서와 같은 완벽한 배열이 아니므로 불가

	순번을 이용해서 객체요소를 선택할 때에 A.eq(0) 메소드를 쓴다. -->equivalent
			
	show();  ==  display:'block'과 동일, 그러나 괄호 안에 나타날 시간을 입력할 수 있다는 점이 다르다.
	hide();  ==  display:'none'과 동일, 이하 동문.
	fadeIn();  ==  슥 나타난다. opacity 조정하는 함수.
	fadeOut();  ==  슥 사라진다.

	slides.eq(0).fadeIn(1500, function(){
		setTimeout(function(){
			slides.eq(0).fadeOut(1500)
		}, 1500);
	});
	*/
	slides.eq(currentIdx).fadeIn();
	
	startAutoSlide();

	function startAutoSlide(){
		if(!timer){  // if(timer=='undefined')이라면 함수동작.
			timer = setInterval(showNextSlide, 1500); 
		}
	}

	// 여기서 setInterval(showNextSlide(), 1500); 이 아닌 setInterval(showNextSlide, 1500); 인 이유: 함수를 실행하지 말고 넘겨야 하기 때문이다.

	// 초보 개발자는 setTimeout에 함수를 넘길 때, 함수 뒤에 () 을 붙이는 실수를 하곤 합니다. 
	// // 잘못된 코드	// setTimeout(sayHi(), 1000);
	// setTimeout은 함수의 참조 값을 받도록 정의되어 있는데 sayHi()를 인수로 전달하면 함수 실행 결과가 전달되어 버립니다. 그런데 sayHi()엔 반환문이 없습니다. 호출 결과는 undefined가 되겠죠. 따라서 setTimeout은 스케줄링할 대상을 찾지 못해, 원하는 대로 코드가 동작하지 않습니다.

	// ㄴ함수의 인수: 함수가 호출될 때 함수로 값을 전달해주는 변수.
	
	// 1. 값 전달: 기본적으로 함수의 인수는 값 전달 방식으로 매개변수로 전달됩니다.
	// 인수를 함수에 전달하면, 새롭게 생성된 매개변수에 전달받은 값이 복사되어 저장됩니다. 매개변수에 저장된 값은 전달받은 데이터의 복사본으로, 함수 안에서 변경되어도 함수 밖의 원본 데이터에는 영향을 주지 않습니다.
	// 2. 참조 전달: 전달받은 원본 데이터에 대한 참조 변수를 매개변수에 전달한다, 인수로 전달받은 값을 복사하는 것이 아니다.
 

	function stopAutoSlide(){
		clearInterval(timer);
		timer = undefined;  // 다시 timer를 undefined값으로 확실하게 만들어 놓음.
	}

	//함수(startAutoSlide, stopAutoSlide)로 되어있어야 재사용이 가능하므로 setInterval과 clearInterval을 함수로써 지정해줬다는 점이 이 예제의 포인트! 이 땐 추가적으로 startAutoSlide(); 이렇게 맨 위에 함수를 따로 가동해주어야 한다. 

	function showNextSlide(){
		var nextIdx = (currentIdx + 1) % slideCount;
		slides.eq(currentIdx).fadeOut();
		slides.eq(nextIdx).fadeIn();
		currentIdx = nextIdx;
	}
	
	slides.mouseover(function(){
		stopAutoSlide();
	})
	.mouseout(function(){
		startAutoSlide();
	}); 
	
});
