function LevelOne(gameObject) {
	this.name = "LevelOne";
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.fallCatcher = new FallCatcher(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 60, 0);
	this.skybox = new Skybox(gameObject, 0, 1000, 0, "blue_sky");
	this.tree = new Tree(gameObject);
	this.enemyOne_1 = new EnemyOne(gameObject, -570, 50, 205, "enemyOne_1", 90, 0, 50);
	this.enemyOne_2 = new EnemyOne(gameObject, -570, 50, 655, "enemyOne_2", 90, 85, 35);
	this.enemyTwo_1 = new EnemyTwo(gameObject, -570, 50, 850, "enemyTwo_1", 0, 160);
	this.key_1 = new Key(gameObject, -570, 65, 400, "level_1_key_1");
	this.key_2 = new Key(gameObject, -820, -140, 820, "level_1_key_2");
	this.levelOneFinishTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, 0, 0, 0);
	this.levelSounds = [];
	
	this.enemies = [this.enemyOne_1, this.enemyOne_2, this.enemyTwo_1];
	
	var self = this;
	
	LevelOne.prototype.startLevel = function() {
	    self.setupCamera();
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.activate();
		}, 1500);
	}
	
	LevelOne.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_2.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_fence_1.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_2.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_3.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_4.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_5.js", self.platform.createBasicObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_tree_1.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_2.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_3.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_4.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_5.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_6.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_7.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_8.js", self.tree.createTree);
	    jsonLoader.load("models/levels/level_one/level_1_tree_9.js", self.tree.createTree);
	    
	    jsonLoader.load("models/levels/level_one/level_1_plat_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_5.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_6.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_7.js", self.platform.createBasicPlatformObject);

	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_1.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_2.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_3.js", self.platform.createFallingPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_1.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_2.js", self.platform.createBasicObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_stairs_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_5.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_3.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_1.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_2.js", self.platform.createBasicPlatformObject);

	    jsonLoader.load("models/levels/level_one/level_1_finish_teleporter.js", self.levelOneFinishTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/level_one/level_1_finish_podium.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_pole_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_pole_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_flag.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_fall_catcher.js", self.fallCatcher.createFallCatcher);
	    
	    self.skybox.createBasicSkyboxObject();
	    
	    self.enemyOne_1.createEnemyOne();
	    self.enemyOne_2.createEnemyOne();
	    
	    self.enemyTwo_1.createEnemyTwo();
	    self.enemyTwo_1.constantIntervalWait = 3000;
	    
	    self.playerAvatar.createAvatar();
	    
	    self.createKeys();
	}
	
	this.createKeys = function() {
	    if (!self.gameObject.levelKeys["level_1_key_1"])
	    	self.key_1.createKey();
	    
	    if (!self.gameObject.levelKeys["level_1_key_2"])
	    	self.key_2.createKey();
	}
	
	this.activate = function() {
		for (var i = 0; i < self.enemies.length; i++)
			self.enemies[i].activate();
		
		self.activateKeys();
	}
	
	this.activateKeys = function() {
	    if (!self.gameObject.levelKeys["level_1_key_1"])
	    	self.key_1.activate();
	    if (!self.gameObject.levelKeys["level_1_key_2"])
	    	self.key_2.activate();
	}
	
	this.deactivate = function() {
		for (var i = 0; i < self.enemies.length; i++)
			self.enemies[i].deactivate();
		
		self.deactivateKeys();
		
		for (var i = 0; i < self.levelSounds.length; i++) {
			self.levelSounds[i].source.stop();
		}
	}
	
	this.deactivateKeys = function() {
	    if (!self.gameObject.levelKeys["level_1_key_1"])
			self.key_1.deactivate();
	    if (!self.gameObject.levelKeys["level_1_key_2"])
			self.key_2.deactivate();
	}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
		self.gameObject.menu.initialize();
		self.gameObject.hud.initialize();
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0x999999);
		self.gameObject.scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffec8b);
		directionalLight.position.set(2500, 2000, 600);
		
//		directionalLight.shadowCameraVisible = true;
		directionalLight.shadowCameraNear = 3000;
		directionalLight.shadowCameraFar = 5000;
		directionalLight.shadowCameraLeft = -1300;
		directionalLight.shadowCameraRight = 200;
		
		directionalLight.intensity = 2;
		directionalLight.castShadow = true;
		self.gameObject.scene.add(directionalLight);
		
		var fog = new THREE.Fog(0x0049ea, 0, 2000);
		self.gameObject.scene.fog = fog;
	
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.4;
	    self.gameObject.scene.add(hemisphereLight);
	}
}