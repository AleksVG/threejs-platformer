function LevelTwo(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 90, 0);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
//	this.enemyOne_1 = new EnemyOne(gameObject, -570, 50, 205, "enemyOne_1", 90, 0, 50);
//	this.enemyOne_2 = new EnemyOne(gameObject, -570, 50, 655, "enemyOne_2", 90, 85, 35);
//	this.enemyTwo_1 = new EnemyTwo(gameObject, -570, 50, 850, "enemyTwo_1", 0, 160);
//	this.enemyTwo_2 = new EnemyTwo(gameObject, -570, 50, 850, "enemyTwo_1", 0, 160);
//	this.key_1 = new Key(gameObject, -570, 65, 400, "level_2_key_1");
//	this.key_2 = new Key(gameObject, -820, -140, 820, "level_2_key_2");
	this.levelTwoFinishTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, 0, 0, 0);
	
	this.enemies =[]; //[this.enemyOne_1, this.enemyOne_2, this.enemyTwo_1];
	
	var self = this;
	
	LevelTwo.prototype.startLevel = function() {
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.activate();
		    self.setupCamera();
		}, 4000);
	}
	
	LevelTwo.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/level_two/level_2_plat_start.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_plat_finish.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_finish_teleporter.js", self.levelTwoFinishTeleporter.createTeleporter);
	    
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_plat_", 1, 12, self.platform.createBasicPlatformObject);
	    
//	    jsonLoader.load("models/levels/level_two/level_2_plat_1.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_2.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_3.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_4.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_5.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_6.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_7.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_8.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_9.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_10.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_11.js", self.platform.createBasicPlatformObject);
//	    jsonLoader.load("models/levels/level_two/level_2_plat_12.js", self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_falling_plat_", 1, 35, self.platform.createFallingPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_stairs_", 1, 11, self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_sight_blocker_", 1, 3, self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_obstacle_", 1, 3, self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_EnemyTwo_plat_", 1, 6, self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_6.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_7.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_8.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_9.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_10.js", self.platform.createFallingPlatformObject);

	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_1.js", self.platform.createFallingPlatformObject);
		
		self.playerAvatar.createAvatar();
	}
	
	this.loadModelByLooping = function(loader, modelStringPrefix, modelStartNumber, modelEndNumber, callback) {
		for (i = modelStartNumber; i <= modelEndNumber; i++) {
			var modelString = modelStringPrefix + i + ".js";
			console.log(modelString);
			loader.load(modelString, callback);
		}
	}
	
	this.activate = function() {
		for (i = 0; i < self.enemies.length; i++)
			self.enemies[i].activate();
		
//		self.key_1.activate();
//		self.key_2.activate();
	}
	
	this.deactivate = function() {
		for (i = 0; i < self.enemies.length; i++)
			self.enemies[i].deactivate();
		
//		self.key_1.deactivate();
//		self.key_2.deactivate();
	}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
		self.gameObject.menu.initialize();
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0xfffff);
		self.gameObject.scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 20, 10);
		directionalLight.intensity = 1;
		self.gameObject.scene.add(directionalLight);
		
//		var spotLight = new THREE.SpotLight(0xfffda0);
//		spotLight.position.set(200, 4000, 200);
//		spotLight.castShadow = true;
//		var target = new THREE.Object3D();
//		target.position.set(0, 0, 0);
//		spotLight.target = target;
//		spotLight.distance = 4800;
//		spotLight.exponent = 0.0001;
//		spotLight.intensity = 4;
//		self.gameObject.scene.add(spotLight);
		
//		
//	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
//	    hemisphereLight.intensity = 0.95;
//	    self.gameObject.scene.add(hemisphereLight);
	}
}