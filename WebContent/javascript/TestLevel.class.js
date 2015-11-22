function TestLevel(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 30, 0);
	this.enemyOne = new EnemyOne(gameObject, 30, 30, 0, "billy");
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.overworldTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, -50, -30, 0);
	
	var self = this;
	
	TestLevel.prototype.startLevel = function() {
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
		    self.gameObject.playerAvatar = self.gameObject.scene.getObjectByName("playerAvatar");
		    self.activate(self.gameObject.playerAvatar);
			setupCamera();
			setupLights();
		}, 500);
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
	    jsonLoader.load("models/enemy_1.js", self.enemyOne.createEnemyOne);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    
	    self.playerAvatar.createAvatar();
	}

	this.activate = function(playerAvatar) {
		self.enemyOne.activate(playerAvatar);
	}
	
	function setupCamera() {
	    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);

	    self.gameObject.scene.add(camera);
	    
	    camera.position.x = -100;
	    camera.position.y = 45;
	    camera.position.z = 30;
	    
	    camera.lookAt(self.gameObject.playerAvatar.position);
	    
	    self.gameObject.camera = camera;
	}

	function setupLights() {
		var ambientLight = new THREE.AmbientLight(0xffffff);
		self.gameObject.scene.add(ambientLight);
		
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.95;
	    self.gameObject.scene.add(hemisphereLight);
	}
}
