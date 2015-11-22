function LevelOne(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 50, 0);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.enemyOne = new EnemyOne(gameObject, -705, -50, 0);
	
	var self = this;
	
	LevelOne.prototype.startLevel = function() {
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.gameObject.playerAvatar = self.gameObject.scene.getObjectByName("playerAvatar");
		    self.setupCamera();
		}, 1000);
	}
	
	LevelOne.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_5.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    jsonLoader.load("models/enemy_1.js", self.enemyOne.createEnemyOne);
	    
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
		
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 20, 10);
		directionalLight.intensity = 1;
		self.gameObject.scene.add(directionalLight);
//		
//	    var hemisphereLight = new THREE.HemisphereLight(0x3b8e30, 0x53cde1);
//	    hemisphereLight.intensity = 1;
//	    self.gameObject.scene.add(hemisphereLight);
	}
}