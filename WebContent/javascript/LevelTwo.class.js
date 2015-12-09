function LevelTwo(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 30, 50, 0);
	this.fallCatcher = new FallCatcher(gameObject);
	this.skybox = new Skybox(gameObject, 0, 0, 0, "sunset");
	this.tree = new Tree(gameObject);
	this.levelSounds = [];
	this.enemyTwo_1 = new EnemyTwo(gameObject, -300, 50, 0, "enemyTwo_1", 0, 200);
	this.enemyTwo_2 = new EnemyTwo(gameObject, -400, 150, -740, "enemyTwo_2", 0, 200);
	this.enemyOne_1 = new EnemyOne(gameObject, -350, 50, -280, "enemyOne_1", 90, 50, 50);
	this.enemyOne_2 = new EnemyOne(gameObject, -370, 50, -270, "enemyOne_2", 90, 50, 50);
	
	this.levelTwoFinishTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, 0, 0, 0);
	
	this.enemies = [this.enemyTwo_1, this.enemyOne_1, this.enemyOne_2, this.enemyTwo_2]; //[this.enemyOne_1, this.enemyOne_2, this.enemyTwo_1];
	
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
		
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_falling_plat_", 1, 35, self.platform.createFallingPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_stairs_", 1, 11, self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_sight_blocker_", 1, 3, self.platform.createBasicPlatformObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_obstacle_", 1, 3, self.platform.createBasicObject);
		self.loadModelByLooping(jsonLoader, "models/levels/level_two/level_2_EnemyTwo_plat_", 1, 6, self.platform.createBasicPlatformObject);
		
	    jsonLoader.load("models/levels/level_two/level_2_tree_1.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_2.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_3.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_4.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_5.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_6.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_7.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_two/level_2_tree_9.js", self.tree.createTree);
	    
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_6.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_7.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_8.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_9.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_10.js", self.platform.createFallingPlatformObject);

	    jsonLoader.load("models/levels/level_two/level_2_falling_plat_1.js", self.platform.createFallingPlatformObject);

	    jsonLoader.load("models/levels/level_two/level_2_fall_catcher.js", self.fallCatcher.createFallCatcher);
		
	    self.skybox.createBasicSkyboxObject();
		self.playerAvatar.createAvatar();
		
	    self.enemyOne_1.createEnemyOne();
	    self.enemyOne_2.createEnemyOne();
	    
	    self.enemyTwo_1.createEnemyTwo();
	    self.enemyTwo_1.constantIntervalWait = 3000;
	    self.enemyTwo_2.createEnemyTwo();
	}
	
	this.loadModelByLooping = function(loader, modelStringPrefix, modelStartNumber, modelEndNumber, callback) {
		for (var i = modelStartNumber; i <= modelEndNumber; i++) {
			var modelString = modelStringPrefix + i + ".js";
			console.log(modelString);
			loader.load(modelString, callback);
		}
	}
	
	this.activate = function() {
		for (var i = 0; i < self.enemies.length; i++)
			self.enemies[i].activate();

		self.enemyTwo_1.setAttackType(self.enemyTwo_1.AttackType.TripleShot);
	}
	
	this.deactivate = function() {
		for (var i = 0; i < self.enemies.length; i++)
			self.enemies[i].deactivate();
		
		for (var i = 0; i < self.levelSounds.length; i++) {
			self.levelSounds[i].source.stop();
		}
	}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
		self.gameObject.menu.initialize();
		self.gameObject.hud.initialize();
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0x444444);
		self.gameObject.scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffec8b);
		directionalLight.position.set(-2500, 600, -600);
		
//		directionalLight.shadowCameraVisible = true;
		directionalLight.shadowCameraNear = 1500;
		directionalLight.shadowCameraFar = 3000;
		directionalLight.shadowCameraLeft = -1300;
		directionalLight.shadowCameraRight = 200;
		directionalLight.shadowCameraTop = 1000;
		
		directionalLight.intensity = 2;
		directionalLight.castShadow = true;
		self.gameObject.scene.add(directionalLight);
		
		var fog = new THREE.Fog(0xff6630, 0, 1600);
		self.gameObject.scene.fog = fog;
	
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.4;
	    self.gameObject.scene.add(hemisphereLight);
	}
}