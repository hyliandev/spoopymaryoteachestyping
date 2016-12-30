// Canvas
var Canvas=null
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
	window.Canvas={
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
				||
				// If you're done typing and haven't gotten to your next place yet
				C().progress.inBetween && C().X < C().progress.gotoX
			;
			if(!C().go) C().progress.inBetween=false;
			if(C().speed > 0){
				if(C().goTimer < 0)
					C().goTimer=0;
				C().goTimer++;
			}else{
				if(C().goTimer > 0)
					C().goTimer=0;
				if(C().progress.pressedEnter) C().goTimer--;
			}
			
			if(C().goTimer<=-C().ghostlyLimit) C().progress.dying=true;
			
			if(C().progress.dying){
				C().ghostX+=200;
				if(C().ghostX > C().size.width * 3){
					clearInterval(C().stepInterval);
					setTimeout(init,1000);
					return;
				}
			}
			
			
			
			
			
			
			
			
			
			
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
			}else{
				if(C().speed >= C().Xa)
					C().speed-=C().Xa;
				else
					C().speed=0;
			}
			if(C().speed > C().speedLimit) C().speed=C().speedLimit;
			C().X+=C().speed;
			
			// Draw ground
			var in_castle=C().castle_levels.indexOf(Math.ceil((C().level + 1) / 4))!=-1;
			D().globalAlpha=C().opacity;
			for(var y=0;y<(last=Math.ceil(C().size.height / (C().zoom * 5)));y++){for(var x=0;x<(C().size.width / (C().zoom * 5)) + 1;x++){
				D().drawImage(
					C().sprites,
					20,
					5,
					5,
					5,
					Math.floor(5 * x * C().zoom - (C().X % (5 * C().zoom))),
					5 * y * C().zoom,
					5 * C().zoom,
					5 * C().zoom
				);
			}}
			for(i=0;i<(C().size.width / (C().zoom * 5)) + 1;i++){
				D().globalAlpha=1;
				D().drawImage(
					C().sprites,
					20,
					0,
					5,
					5,
					Math.floor(5 * i * C().zoom - (C().X % (5 * C().zoom))),
					C().size.height - (5 * C().zoom),
					5 * C().zoom,
					5 * C().zoom
				);
				D().globalAlpha=C().opacity;
				D().drawImage(
					C().sprites,
					25,
					0,
					5,
					5,
					Math.floor(5 * i * C().zoom - (C().X % (5 * C().zoom))),
					C().size.height - (5 * C().zoom),
					5 * C().zoom,
					5 * C().zoom
				);
			}
			D().globalAlpha=1;
			
			if(C().opacity > 1) C().opacity=1;
			if(C().opacity < 0) C().opacity=0;
			
			if(in_castle && C().opacity < 1)
				C().opacity+=0.01;
			
			if(!in_castle && C().opacity > 0)
				C().opacity-=0.01;
			
			// Draw ghostly presence
			D().fillStyle='rgba(0,0,0,' + ((1 / (C().ghostlyLimit / 2 / -(C().goTimer - 0))) / 2) + ')';
			D().fillRect(
				0,
				0,
				C().size.width,
				C().size.height
			);
			
			// Draw mario
			if(!C().progress.dying || C().ghostX < (C().size.width / 2)){
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
			}
			
			// Draw ghost
			D().drawImage(
				C().sprites,
				10,
				0,
				10,
				10,
				C().ghostX - (10 * C().zoom),
				C().size.height - (15 * C().zoom),
				10 * C().zoom,
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
			
			// Draw text to write
			if(C().progress.pressedEnter && C().X >= 1280 && !C().progress.inBetween && !C().progress.dying){
				D().fillStyle='#FFF';
				D().font='48px Courier New';
				D().textAlign='center';
				D().fillText(
				C().phrases[C().level - 1],
					(C().size.width / 2),
					100,
					C().size.width - 200
				);
				D().fillStyle='#FF0';
				D().fillText(
					C().phrases[C().level - 1].substring(0,C().currentChar) + writeTimes(C().phrases[C().level - 1].length - C().currentChar,' '),
					(C().size.width / 2),
					100,
					C().size.width - 200
				);
				if(C().error){
					D().fillStyle='#F00';
					D().fillText(
						//
						writeTimes(C().currentChar - (C().currentChar==C().phrases[C().level - 1].length-1 ? 0 : 1),' ') +
						C().phrases[C().level - 1].substring(C().currentChar,C().currentChar + 1) +
						writeTimes(C().phrases[C().level - 1].length - C().currentChar - (C().currentChar==0 ? 1 : 2),' ')
						,
						//
						(C().size.width / 2),
						100,
						C().size.width - 200
					);
				}
			}
			
			// Draw level HUD
			if(C().level > 0){
				D().fillStyle='#FFF';
				D().textAlign='left';
				D().font='24px Courier New';
				var lD=Math.ceil((C().level + 1) / 4);
				var lN=(C().level % 4);
				D().fillText(
					lD + '-' + lN,
					4,
					20
				);
			}
			
			// Draw Game Over
			if(C().ghostX > C().size.width * 2){
				D().fillStyle='#F00';
				D().textAlign='center';
				D().font='48px Courier New';
				D().fillText(
					'Game Over',
					C().size.width / 2,
					200
				);
			}
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
		
		currentChar:0,
		
		ghostlyLimit:25,
		
		error:false,
		
		opacity:0,
		
		ghostX:0,
		
		castle_levels:[
			2
		],
		
		progress:{
			pressedEnter:false,
			inBetween:false,
			gotoX:0,
			dying:false,
		},
		level:0,
		
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
	C().init();
	C().stepInterval=setInterval(function(){
		C().step();
	},1000 / C().FPS);
	window.addEventListener('resize',function(){
		C().resize();
	});
	window.onkeydown=function(e){
		if(e.keyCode==8) e.preventDefault();
		
		if(C().progress.dying) return;
		
		if(!C().progress.pressedEnter && e.keyCode==13){
			C().progress.pressedEnter=true;
			C().level++;
			return;
		}
		
		if(!C().progress.pressedEnter) return;
		
		if(!C().progress.inBetween){
			if(C().X >= 1280 && C().phrases[C().level - 1].substring(C().currentChar,C().currentChar + 1)==e.key){
				C().currentChar++;
				C().speed+=C().speedLimit;
				C().error=false;
				if(C().currentChar==C().phrases[C().level - 1].length){
					C().go=true;
					C().currentChar=0;
					C().progress.inBetween=true;
					C().progress.gotoX=C().X + (C().size.width / 2);
					C().level++;
				}
				C().goTimer%=10;
			}else{
				if(e.key.length==1){
					C().error=true;
					C().goTimer-=5;
				}
			}
		}
	};
}




















// Useful functions

function writeTimes(x,str){
	var ret='';
	for(var i=0;i<x;i++){
		ret+=str;
	}
	return ret;
}