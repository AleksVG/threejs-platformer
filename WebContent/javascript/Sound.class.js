function Sound(name, filePath, loop)
{
	this.name = name;
	this.filePath = filePath;
	this.loop = loop;
}
{
	Sound.prototype.play = function()
	{
		var elementSound = document.createElement("audio");
		elementSound.autoplay = true;
		
		elementSound.name = this.name;
		elementSound.loop = "";

		var elementSoundSource = document.createElement("source");
		elementSoundSource.src = this.filePath;
		

		elementSound.appendChild(elementSoundSource);
	}
	
	Sound.prototype.stop = function()
	{
		document.getElementById(this.name).remove();
	}
}
