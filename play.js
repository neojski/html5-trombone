window.onload = function(){
	var i, sounds = [], name, noteName = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];
	for(i = 0; i < noteName.length; i++){
		name = noteName[i];
		sounds[i] = new Audio("sounds/" + name + ".ogg"); // buffers automatically when created
	}

	function play(id){
		sounds[id].pause();
		sounds[id].currentTime = 0;
		sounds[id].play();
	}

	var time = 200;
	var tromboneBellWidth = 425;
	var tromboneSlideStart = 210;
	var tromboneSlideEnd = 610;
	var tromboneStart = tromboneSlideStart + tromboneBellWidth;
	var tromboneEnd = tromboneSlideEnd + tromboneBellWidth;
	var noteWidth = ((tromboneEnd - tromboneStart) / noteName.length);

	// trombone player
	var curSize = null, tm;
	window.onresize = function(){
		var size = Math.floor((window.innerWidth - tromboneStart) / noteWidth);

		if(size < 0 || size >= noteName.length){
			size = null;
		}

		if(size !== null && size !== curSize){
			clearTimeout(tm);

			curSize = size;
				
			tm = setTimeout(function(){
				play(curSize);
			}, time);	
		}
	}

	var note;
	for(i = 0; i < noteName.length; i++){
		note = document.getElementById(noteName[i]);
		note.name = i;
		note.onclick = function(){
			play(this.name);
		}
	}
}