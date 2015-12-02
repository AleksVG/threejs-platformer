function TestLevel(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 30, 0);
	this.enemyOne = new EnemyOne(gameObject, 30, 30, 0, "billy", 0, 50);
	this.enemyTwo = new EnemyTwo(gameObject, 30, 40, 20, "bill", 0, 180);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.overworldTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, -50, -30, 0);
	
	var self = this;
	
	TestLevel.prototype.startLevel = function() {
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
		    self.activate();
			setupCamera();
			setupLights();
		}, 2000);
	}
	
	TestLevel.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/test_level/testLevel_plat1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat5.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat6.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat7.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/test_level/testLevel_plat8.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.overworldTeleporter.createTeleporter);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    
	    self.enemyOne.createEnemyOne();
	    self.enemyTwo.createEnemyTwo();
	    self.playerAvatar.createAvatar();
	}

	this.activate = function() {
		self.enemyOne.activate();
		self.enemyTwo.activate();
	}
	
	this.deactivate = function() {
		self.enemyOne.deactivate();
		self.enemyTwo.deactivate();
	}
	
	function setupCamera() {
		self.gameObject.camera.initialize();
	}

	function setupLights() {
		var ambientLight = new THREE.AmbientLight(0xffffff);
		self.gameObject.scene.add(ambientLight);
		
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.95;
	    self.gameObject.scene.add(hemisphereLight);
	}
}
