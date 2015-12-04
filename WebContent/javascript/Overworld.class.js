function Overworld(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 50, 0);
	this.skybox = new Skybox(gameObject, 0, 0, 0);
	this.levelOneTeleporter = new Teleporter(gameObject, gameObject.Level.One, 0, 0, 70);
	this.levelTwoTeleporter = new Teleporter(gameObject, gameObject.Level.Two, 0, 0, 110);
	this.testLevelTeleporter = new Teleporter(gameObject, gameObject.Level.TestLevel, 0, 0, 0);
	
	var self = this;
	
	Overworld.prototype.startLevel = function() {
	    self.setupLights();
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
		    self.setupCamera();
		}, 2000);
	}
	
	Overworld.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/overworld/testingArea.js", self.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.levelOneTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.levelTwoTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", self.testLevelTeleporter.createTeleporter);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", self.skybox.createBasicSkyboxObject);
	    
	    self.playerAvatar.createAvatar();
	}
	
	this.activate = function() {}
	
	this.deactivate = function() {}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
		self.gameObject.menu.initialize();
	}

	this.setupLights = function() {
//		var ambientLight = new THREE.AmbientLight(0xffffff);
//		self.gameObject.scene.add(ambientLight);
		
		var spotLight = new THREE.SpotLight(0xfffda0);
		spotLight.position.set(200, 4000, 200);
		spotLight.castShadow = true;
		var target = new THREE.Object3D();
		target.position.set(0, 0, 0);
		spotLight.target = target;
		spotLight.distance = 4800;
		spotLight.exponent = 0.0001;
		spotLight.intensity = 1;
		self.gameObject.scene.add(spotLight);
		
		var spotLight2 = new THREE.SpotLight(0xfffda0);
		spotLight2.position.set(0, 60, 0);
		spotLight2.castShadow = true;
		var target = new THREE.Object3D();
		target.position.set(0, 0, 0);
		spotLight2.target = target;
		spotLight2.distance = 200;
		spotLight2.exponent = 0;
		spotLight2.intensity = 2;
		spotLight2.angle = Math.PI/8;
		self.gameObject.scene.add(spotLight2);
		
		var pointLight = new THREE.PointLight(0x0000ff);
		pointLight.position.set(70, 50, -90);
		pointLight.distance = 50;
		pointLight.intensity = 15;
		pointLight.add(new THREE.Mesh( new THREE.SphereGeometry(2, 16, 8), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) ));
		self.gameObject.scene.add(pointLight);
		
		var pointLight2 = new THREE.PointLight(0xff0000);
		pointLight2.position.set(70, 50, 10);
		pointLight2.distance = 50;
		pointLight2.intensity = 15;
		self.gameObject.scene.add(pointLight2);
		
		
		var positionIncrement = 1;
		
		setInterval(function() {
			pointLight.__dirtyPosition = true;

			if (pointLight.position.z < -80)
				positionIncrement = 1;
			else if (pointLight.position.z > 80)
				positionIncrement = -1;
			
			pointLight.position.z += positionIncrement;
		}, 20);
		
		var intensityIncrement = 0.1;
		
		setInterval(function() {
			if (spotLight2.intensity < 0.2)
				intensityIncrement = 0.1;
			else if (spotLight2.intensity > 5)
				intensityIncrement = -0.1;
			
			spotLight2.intensity += intensityIncrement;
		}, 20);
		
//	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
//	    hemisphereLight.intensity = 0.95;
//	    self.gameObject.scene.add(hemisphereLight);
	}
}