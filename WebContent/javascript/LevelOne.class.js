function LevelOne(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 60, 0);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.enemyOne_1 = new EnemyOne(gameObject, -570, 50, 205, "enemyOne_1", 90, 0, 50);
	this.enemyOne_2 = new EnemyOne(gameObject, -570, 50, 655, "enemyOne_2", 90, 85, 35);
	this.enemyTwo_1 = new EnemyTwo(gameObject, -570, 50, 850, "enemyTwo_1", 0, 160);
	this.key_1 = new Key(gameObject, -570, 65, 400, "level_1_key_1");
	this.key_2 = new Key(gameObject, -820, -140, 820, "level_1_key_2");
	this.levelOneFinishTeleporter = new Teleporter(gameObject, gameObject.Level.Overworld, 0, 0, 0);
	
	this.enemies = [this.enemyOne_1, this.enemyOne_2, this.enemyTwo_1];
	
	var self = this;
	
	LevelOne.prototype.startLevel = function() {
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.activate();
		    self.setupCamera();
		}, 1500);
	}
	
	LevelOne.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_1_part_2.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_fence_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_fence_5.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_tree_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_5.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_6.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_7.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_8.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_9.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_plat_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_5.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_6.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_plat_7.js", self.platform.createBasicPlatformObject);

	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_1.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_2.js", self.platform.createFallingPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_falling_plat_3.js", self.platform.createFallingPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_obstacle_2.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_stairs_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_3.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_4.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_5.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_stairs_2_3.js", self.platform.createBasicPlatformObject);
	    
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_tree_slide_side_2.js", self.platform.createBasicPlatformObject);

	    jsonLoader.load("models/levels/level_one/level_1_finish_teleporter.js", self.levelOneFinishTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/level_one/level_1_finish_podium.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_pole_1.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_pole_2.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/level_one/level_1_finish_flag.js", self.platform.createBasicPlatformObject);
	    
	    self.skybox.createBasicSkyboxObject();
	    
	    self.enemyOne_1.createEnemyOne();
	    self.enemyOne_2.createEnemyOne();
	    
	    self.enemyTwo_1.createEnemyTwo();
	    self.enemyTwo_1.constantIntervalWait = 3000;
	    
	    self.playerAvatar.createAvatar();
	    
	    self.key_1.createKey();
	    self.key_2.createKey();
	}
	
	this.activate = function() {
		for (i = 0; i < self.enemies.length; i++)
			self.enemies[i].activate();
		
		self.key_1.activate();
		self.key_2.activate();
	}
	
	this.deactivate = function() {
		for (i = 0; i < self.enemies.length; i++)
			self.enemies[i].deactivate();
		
		self.key_1.deactivate();
		self.key_2.deactivate();
	}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0x999999);
		self.gameObject.scene.add(ambientLight);
		
		var directionalLight = new THREE.DirectionalLight(0xffec8b);
		directionalLight.position.set(40, 20, 10);
		directionalLight.intensity = 2;
		directionalLight.castShadow = true;
		self.gameObject.scene.add(directionalLight);
		
		var fog = new THREE.Fog(0x0049ea, 0, 2300);
		self.gameObject.scene.fog = fog;
		
//	    var spotLight = new THREE.SpotLight(0xffffff, 1.5);
//	    spotLight.position.set(0, 100, 100);
//	    spotLight.angle = 20 * (Math.PI / 180);
//	    spotLight.expontent = 1;
//	    spotLight.target.position.set(0, 0, 0);
//	    self.gameObject.scene.add(spotLight);
		
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