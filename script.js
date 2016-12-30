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
		// Clear screen
		D().clearRect(
			0,
			0,
			C().e.width,
			C().e.height
		);
		
		// Draw bg
		B()[0]();
		
		// Step
		C().X++;
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
	
	X:0
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
			D().fillStyle='#FFFFFF';
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
}