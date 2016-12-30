// Canvas
var Canvas={
	// Functions
	init:function(){
		C().e=document.getElementById('c');
		C().context=C().e.getContext('2d');
		C().resize();
		C().sprites=new Image();
		C().sprites.src='sprites.png';
	},
	
	step:function(){
		// Whether or not to go
		C().go=
			// If you've just pressed enter after the title screen
			C().progress.pressedEnter && C().X < 1280
		;
		if(C().speed > 0)
			C().goTimer++;
		else
			C().goTimer=0;
		
		
		
		
		
		
		
		
		
		
		// Clear screen
		D().clearRect(
			0,
			0,
			C().e.width,
			C().e.height
		);
		
		// Pixel perfect
		D().webkitImageSmoothingEnabled=false;
		D().mozImageSmoothingEnabled=false;
		D().msImageSmoothingEnabled=false;
		D().imageSmoothingEnabled=false;
		
		// Draw bg
		B()[0]();
		
		// Step
		if(C().go){
			C().speed+=C().Xa;
			if(C().speed > C().speedLimit) C().speed=C().speedLimit;
		}else{
			if(C().speed >= C().Xa)
				C().speed-=C().Xa;
			else
				C().speed=0;
		}
		C().X+=C().speed;
		
		// Draw ground
		for(i=0;i<(C().size.width / C().zoom);i++){
			D().drawImage(
				C().sprites,
				20,
				0,
				5,
				5,
				5 * i * C().zoom,
				C().size.height - (5 * C().zoom),
				5 * C().zoom,
				5 * C().zoom
			);
		}
		
		// Draw mario
		D().drawImage(
			C().sprites,
			(
				C().goTimer % 10 < 5 ? 0 : 5
			),
			0,
			5,
			10,
			(C().size.width - (5 * C().zoom)) / 2,
			C().size.height - (15 * C().zoom),
			5 * C().zoom,
			10 * C().zoom
		);
		
		// Draw title
		D().fillStyle='#FFF';
		D().font='48px Courier New';
		D().textAlign='center';
		D().fillText(
			'Spoopy Maryo Teaches Typing',
			(C().size.width / 2) - C().X,
			100
		);
		D().font='24px Courier New';
		D().fillText(
			'Press Enter',
			(C().size.width / 2) - C().X,
			300
		);
	},
	
	resize:function(){
		C().e.width=C().size.width;
		C().e.height=C().size.height;
		C().e.style.top=(window.innerHeight - C().e.offsetHeight) / 2 + 'px';
		C().e.style.left=(window.innerWidth - C().e.offsetWidth) / 2 + 'px';
	},
	
	
	
	// Variables
	context:null,
	e:null,
	FPS:60,
	stepInterval:null,
	size:{
		width:1280,
		height:720
	},
	sprites:null,
	zoom:10,
	
	X:0,
	Xa:0.15,
	speed:0,
	speedLimit:5,
	
	go:false,
	goTimer:0,
	
	progress:{
		pressedEnter:false,
	},
	
	phrases:[
		'Mario jumps high.',
		'Luigi jumps higher.',
		'Mario is jealous.',
		'Luigi is scared.',
		'Why is Luigi scared?',
		'Luigi is sick.',
		'Mario is sicker.',
		'Where is Luigi buried?',
		'Nobody knows, except for me.',
	]
};
function C(){return window.Canvas;}
function D(){return C().context;}



// Backgrounds
var stars=null;
var Backgrounds=[
	function(){
		if(window.stars==null){
			window.stars=[];
			for(var i=0;i<300;i++){
				window.stars.push([
					Math.floor(Math.random() * C().size.width),
					Math.floor(Math.random() * C().size.height)
				]);
			}
		}
		for(var i in window.stars){
			var star=window.stars[i];
			D().fillStyle='rgba(255,255,200,0.5)';
			D().fillRect(
				((star[0] - C().X - C().size.width) % C().size.width) + C().size.width,
				star[1],
				1,
				1
			);
		}
	}
];
function B(){return window.Backgrounds;}



// Initialization function
function init(){
	C().init();
	C().stepInterval=setInterval(function(){
		//if()
		C().step();
	},1000 / C().FPS);
	window.addEventListener('resize',function(){
		C().resize();
	});
	window.addEventListener('keydown',function(e){
		if(!C().progress.pressedEnter)
			C().progress.pressedEnter=e.keyCode==13;
	});
}