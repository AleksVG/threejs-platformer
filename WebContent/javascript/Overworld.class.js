function Overworld(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 50, 0);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.levelOneTeleporter = new Teleporter(gameObject, gameObject.Level.One, 0, 0, 70);
	this.testLevelTeleporter = new Teleporter(gameObject, gameObject.Level.TestLevel, 0, 0, 0);
	
	var self = this;
	
	Overworld.prototype.startLevel = function() {
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.gameObject.playerAvatar = self.gameObject.scene.getObjectByName("playerAvatar");
		    self.setupCamera();
		}, 1000);
	}
	
	Overworld.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/overworld/testingArea.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.levelOneTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.testLevelTeleporter.createTeleporter);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    
	    self.playerAvatar.createAvatar();
	}
	
	this.activate = function() {}
	
	this.setupCamera = function() {
	    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);

	    self.gameObject.scene.add(camera);
	    
	    camera.position.x = -100;
	    camera.position.y = 45;
	    camera.position.z = 30;
	    
	    camera.lookAt(self.gameObject.playerAvatar.position);
	    
	    self.gameObject.camera = camera;
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0xffffff);
		self.gameObject.scene.add(ambientLight);
		
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.95;
	    self.gameObject.scene.add(hemisphereLight);
	}
}