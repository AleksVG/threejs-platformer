function Overworld(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.fallCatcher = new FallCatcher(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 20, -200);
	this.levelOneTeleporter = new Teleporter(gameObject, gameObject.Level.One, 0, 0, 0);
	this.levelTwoTeleporter = new Teleporter(gameObject, gameObject.Level.Two, 0, 0, 0);
	this.testLevelTeleporter = new Teleporter(gameObject, gameObject.Level.TestLevel, 0, 0, 0);
	this.posterLightWaitTime = 2000;
	this.streetLight1WaitTime = 3000;
	this.streetLight2WaitTime = 2000;
	this.streetLight3WaitTime = 4000;
	this.streetLight4WaitTime = 7000;
	this.streetLightRandomTime = 20000;
	this.streetLightMinimumTime = 8000;
	this.isActive = false;
	
	var self = this;
	
	// Called by gameObject in loadLevel method
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
		self.platform.createCustomPlatform(0, 0, 0, 480, 140, 8, "models/levels/overworld/overworld_floor.png", 1, 3.5);
		self.platform.createCustomPlatform(-500, 100, 0, 400, 5, 400, "models/levels/overworld/Overworld_poster.png", 1, 1);

	    jsonLoader.load("models/levels/overworld/Overworld_street_light_1.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/overworld/Overworld_street_light_2.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/overworld/Overworld_street_light_3.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/overworld/Overworld_street_light_4.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/overworld/Overworld_street_light_5.js", self.platform.createBasicObject);

	    self.loadPrisons(jsonLoader);
	    
	    jsonLoader.load("models/levels/overworld/Overworld_access_level_1.js", self.levelOneTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/Overworld_access_level_2.js", self.levelTwoTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/Overworld_access_level_3.js", self.levelOneTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/Overworld_access_level_4.js", self.levelOneTeleporter.createTeleporter);
	    jsonLoader.load("models/levels/overworld/Overworld_access_level_5.js", self.levelOneTeleporter.createTeleporter);

	    jsonLoader.load("models/levels/overworld/Overworld_fall_catcher.js", self.fallCatcher.createFallCatcher);
	    
	    self.playerAvatar.createAvatar();
	}
	
	this.loadPrisons = function(jsonLoader) {
		if (self.gameObject.totalNumberOfKeys < 2) {
			console.log("loading prison 1. Number of keys: " + self.gameObject.totalNumberOfKeys);
		    jsonLoader.load("models/levels/overworld/Overworld_prison_1.js", self.platform.createBasicObject);
		}
		
		if (self.gameObject.totalNumberOfKeys < 4)
		    jsonLoader.load("models/levels/overworld/Overworld_prison_2.js", self.platform.createBasicObject);

	    jsonLoader.load("models/levels/overworld/Overworld_prison_3.js", self.platform.createBasicObject);
	    jsonLoader.load("models/levels/overworld/Overworld_prison_4.js", self.platform.createBasicObject);
	}
	
	this.activate = function() {
		self.isActive = true;
	}
	
	this.deactivate = function() {
		self.isActive = false;
	}
	
	this.setupCamera = function() {
		self.gameObject.camera.initialize();
		self.gameObject.menu.initialize();
		self.gameObject.hud.initialize();
	}

	this.setupLights = function() {
		self.spotLight1 = self.createSpotLight(50, 47.5, -218, 3, 0xff984d);
		self.spotLight2 = self.createSpotLight(50, 47.5, -140, 3, 0xff984d);
		self.spotLight3 = self.createSpotLight(50, 47.5, -65, 3, 0xff984d);
		self.spotLight3 = self.createSpotLight(50, 47.5, 10, 3, 0xff984d);
		self.spotLight4 = self.createSpotLight(50, 47.5, 85, 3, 0xff984d);
		
		setTimeout(self.streetLight1Flicker, 10);
		setTimeout(self.streetLight2Flicker, 200);
		setTimeout(self.streetLight3Flicker, 400);
		setTimeout(self.streetLight4Flicker, 600);
		
		self.posterPointLight = new THREE.PointLight(0xff0000);
		self.posterPointLight.position.set(-350, 150, 0);
		self.posterPointLight.distance = 500;
		self.posterPointLight.intensity = 4;
		self.gameObject.scene.add(self.posterPointLight);

		setTimeout(self.posterLightTimeout, self.posterLightWaitTime);
	}
	
	this.createSpotLight = function(positionX, positionY, positionZ, intensity, color) {
		var spotLight = new THREE.SpotLight(color);
		
//		spotLight.shadowCameraVisible = true;
		spotLight.shadowCameraNear = 2;
		spotLight.shadowCameraFar = 60;
		spotLight.shadowCameraFov = 90;
		spotLight.position.set(positionX, positionY, positionZ);
		spotLight.castShadow = true;
		
		var target = new THREE.Object3D();
		target.position.set(positionX - 10, 0, positionZ);
		self.gameObject.scene.add(target);
		spotLight.target = target;
		
		spotLight.distance = 100;
		spotLight.exponent = 1;
		spotLight.intensity = intensity;
		spotLight.angle = Math.PI/4;
		spotLight.add(new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 1), new THREE.MeshBasicMaterial({color: color})));
		self.gameObject.scene.add(spotLight);
		
		return spotLight;
	}
	
	// The following methods are used to simulate flickering of lights.
	
	this.posterLightTimeout = function() {
		if (self.isActive) {
			setTimeout(function() {
				self.posterPointLight.intensity = 3;
				
				self.posterLightWaitTime = (Math.random() * 2500) + 700;
				
				setTimeout(function() {
					self.posterPointLight.intensity = 0;
					
					setTimeout(self.posterLightTimeout, self.posterLightWaitTime);
				}, 200);
			}, self.posterLightWaitTime);
		}
	}
	
	this.streetLight1Flicker = function() {
		if (self.isActive) {
			setTimeout(function() {
				self.spotLight1.intensity = 0;
				
				self.streetLight1WaitTime = (Math.random() * self.streetLightRandomTime) + self.streetLightMinimumTime;
				
				setTimeout(function() {
					self.spotLight1.intensity = 3;
				}, 100);
				
				setTimeout(function() {
					self.spotLight1.intensity = 0;
				}, 500);
				
				setTimeout(function() {
					self.spotLight1.intensity = 3;
					
					setTimeout(self.streetLight1Flicker, self.streetLight1WaitTime);
				}, 700);
			}, self.streetLightWaitTime);
		}
	}
	
	this.streetLight2Flicker = function() {
		if (self.isActive) {
			setTimeout(function() {
				self.spotLight2.intensity = 0;
				
				self.streetLight2WaitTime = (Math.random() * self.streetLightRandomTime) + self.streetLightMinimumTime;
				
				setTimeout(function() {
					self.spotLight2.intensity = 3;
				}, 100);
				
				setTimeout(function() {
					self.spotLight2.intensity = 0;
				}, 500);
				
				setTimeout(function() {
					self.spotLight2.intensity = 3;
					
					setTimeout(self.streetLight2Flicker, self.streetLight2WaitTime);
				}, 700);
			}, self.streetLightWaitTime);
		}
	}
	
	this.streetLight3Flicker = function() {
		if (self.isActive) {
			setTimeout(function() {
				self.spotLight3.intensity = 0;
				
				self.streetLight3WaitTime = (Math.random() * self.streetLightRandomTime) + self.streetLightMinimumTime;
				
				setTimeout(function() {
					self.spotLight3.intensity = 3;
				}, 100);
				
				setTimeout(function() {
					self.spotLight3.intensity = 0;
				}, 500);
				
				setTimeout(function() {
					self.spotLight3.intensity = 3;
					
					setTimeout(self.streetLight3Flicker, self.streetLight3WaitTime);
				}, 700);
			}, self.streetLightWaitTime);
		}
	}
	
	this.streetLight4Flicker = function() {
		if (self.isActive) {
			setTimeout(function() {
				self.spotLight4.intensity = 0;
				
				self.streetLight3WaitTime = (Math.random() * self.streetLightRandomTime) + self.streetLightMinimumTime;
				
				setTimeout(function() {
					self.spotLight4.intensity = 3;
				}, 100);
				
				setTimeout(function() {
					self.spotLight4.intensity = 0;
				}, 500);
				
				setTimeout(function() {
					self.spotLight4.intensity = 3;
					
					setTimeout(self.streetLight4Flicker, self.streetLight3WaitTime);
				}, 700);
			}, self.streetLightWaitTime);
		}
	}
}