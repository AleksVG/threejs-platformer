function ModelLoader(scene) {
	this.scene = scene;
	this.platform = new Platform();
	this.playerAvatar = new PlayerAvatar();
}

ModelLoader.prototype.loadModels = function() {
	var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load("models/testingArea.js", this.platform.createBasicPlatformObject);
    jsonLoader.load("models/slipperyTestingArea.js", this.platform.createSlipperyPlatformObject);
    jsonLoader.load("models/testCube.js", this.playerAvatar.createAvatar);
}


