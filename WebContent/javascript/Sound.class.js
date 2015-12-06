function Sound(filePath)
{
	this.filePath = filePath;
}
{
	Sound.prototype.play = function()
	{
		var htmlElementForSound = document.createElement("audio");
		htmlElementForSound.autoplay = true;

		var htmlElementForSoundSource = document.createElement("source");
		htmlElementForSoundSource.src = this.filePath;
		
		var htmlElementForSoundSource = document.createElement("source");
		htmlElementForSoundSource.src = this.filePath;

		htmlElementForSound.appendChild(htmlElementForSoundSource);
	}
}
