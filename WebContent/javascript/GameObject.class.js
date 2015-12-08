function GameObject(renderer) {
	this.renderer = renderer;
		
	this.currentlyPressedKeys = {};
	this.Key = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32, ESCAPE: 27, ENTER: 13, LEFT_ARROW: 37, RIGHT_ARROW: 38, UP_ARROW: 38, DOWN_ARROW: 40 };
	this.Level = {Overworld: "Overworld", One: "One", Two: "Two", Three: "Three", TestLevel: "TestLevel"};
	this.lastTime = 0;
	this.playerInputEnabled = false;
	this.currentLevel = "notStarted";
	this.levelKeys = [];
	this.showMenu = true;
	
	var self = this;
	
	self.background_music = audio_music_theme_overworld;
	
	this.loadLevel = function(level) {
		if (self.currentLevel != "notStarted")
			self.currentLevel.deactivate();
		
		self.playerInputEnabled = false;
		
		
		var scene = new Physijs.Scene;
		var sceneMenu = new THREE.Scene();
	    self.sceneMenu = sceneMenu;
	    
		var sceneHud = new THREE.Scene();
	    self.sceneHud = sceneHud;
		
		
	    scene.setGravity(new THREE.Vector3(0, -125, 0));
	    
	    self.scene = scene;
	
		switch (level) {
		case self.Level.Overworld:
			self.background_music.pause();
			self.background_music = audio_music_theme_overworld;
			self.background_music.play();
			self.background_music.element.volume = 0.05;
			self.currentLevel = new Overworld(self);
			break;
		case self.Level.One:
			self.background_music.pause();
			self.background_music = audio_music_theme_level1;
			self.background_music.element.volume = 0.05;
			self.background_music.play();
			self.currentLevel = new LevelOne(self);
			createParticles(5, true, 1, false, true, 0xffffff);
			break;
		case self.Level.Two:
			self.background_music.pause();
			self.background_music = audio_music_theme_level2;
			self.background_music.element.volume = 0.05;
			self.background_music.play();
			self.currentLevel = new LevelTwo(self);
			break;
		case self.Level.TestLevel:
			self.currentLevel = new TestLevel(self);
			break;
		default:
			self.currentLevel = new TestLevel(self);
			break;
		}
		self.currentLevel.startLevel();
	}
	
	function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {	
        var texture = THREE.ImageUtils.loadTexture("multimedia/firefly.png");
        var geom = new THREE.Geometry();

        var material = new THREE.PointCloudMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });


        var range = 4000;
        for (var i = 0; i < 10000; i++) {
            var particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    Math.random() * range * 1.5,
                    Math.random() * range - range / 2);
            particle.velocityY = 0.1 + Math.random() / 20;
            particle.velocityX = (Math.random() - 0.5) / 3;
            geom.vertices.push(particle);
        }

        cloud = new THREE.PointCloud(geom, material);
        cloud.sortParticles = true;

        self.scene.add(cloud);
	} 
	
	function updateParticles() {
		var vertices = cloud.geometry.vertices;
        vertices.forEach(function (v) {
            v.y = v.y - v.velocityY;
            v.x = v.x - v.velocityX;

//            if (v.y <= 0) v.y = 60;
//            if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
        });
	}

	this.render = function(currentTime) {
	    requestAnimationFrame(self.render);
	    var elapsed = self.calculateElapsed(currentTime);
	    	
	    self.camera.update();
	    if (self.currentLevel.name == "LevelOne")
	    	updateParticles();
	    
	    if (self.usingDebugMode)
	    	self.debugControls.update();
	    else
	    	self.handleKeys(elapsed);

	    self.scene.simulate();

	    self.renderer.render(self.scene, self.camera.camera);
	    self.renderer.autoClear = false;
	    
	    if (self.showMenu == true)
	    	self.renderer.render(self.sceneMenu, self.menu.camera);
	}

	this.calculateElapsed = function(currentTime) {
		if (currentTime == undefined)
			currentTime = 0;
		
		var elapsed = (currentTime - self.lastTime);

	    self.lastTime = currentTime;
	    
	    return elapsed;
	}

	this.handleKeys = function(elapsed) {
		if (self.playerInputEnabled) {
			if (self.currentlyPressedKeys[self.Key.A]) {
				self.playerAvatar.moveLeftInRelationToView(elapsed);
			}
			
			if (self.currentlyPressedKeys[self.Key.D]) {
				self.playerAvatar.moveRightInRelationToView(elapsed);
			}
			
			if (self.currentlyPressedKeys[self.Key.S]) {
				self.playerAvatar.moveBackwardInRelationToView(elapsed);
			}
			
			if (self.currentlyPressedKeys[self.Key.W]) {
				self.playerAvatar.moveForwardInRelationToView(elapsed);
			}
			
			if (self.currentlyPressedKeys[self.Key.SPACEBAR]) {
				self.playerAvatar.jump(holdingSpace = true);
			}
			else if (!self.currentlyPressedKeys[self.Key.SPACEBAR]) {
				self.playerAvatar.jump(holdingSpace = false);
			}
		}
	}
	
	this.correctFor3dsMaxRotation = function(mesh) {
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	}
}