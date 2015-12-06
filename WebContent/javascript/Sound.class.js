function Sound(name, filePath, loop)
{
	this.name = name;
	this.filePath = filePath;
	this.loop = loop;
	
	var elementSound = document.createElement("audio");
	elementSound.autoplay = true
	
	this.element = elementSound;
	
	elementSound.name = this.name;
	elementSound.loop = "";

	var elementSoundSource = document.createElement("source");
	elementSoundSource.src = this.filePath;

	elementSound.appendChild(elementSoundSource);
	
	elementSound.pause();
}
{
	Sound.prototype.play = function()
	{
		this.element.play();
	}
	
	Sound.prototype.pause = function()
	{
		this.element.pause();
	}
}
