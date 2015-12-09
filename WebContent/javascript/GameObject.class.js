// GameObject is the object representing the game. Every other object is given an
// instance of GameObject. Through that instance, they can manipulate most aspects
// of the game. GameObject operates as the glue between all other parts of the game.

function GameObject(renderer) {
	this.renderer = renderer;
		
	this.currentlyPressedKeys = {}; 
	this.Key = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32, ESCAPE: 27, ENTER: 13, LEFT_ARROW: 37, RIGHT_ARROW: 38, UP_ARROW: 38, DOWN_ARROW: 40 };
	this.Level = {Overworld: "Overworld", One: "One", Two: "Two", Three: "Three", TestLevel: "TestLevel"};
	this.lastTime = 0;
	this.playerInputEnabled = false; // if false, keyboard input does not affect player avatar
	this.currentLevel = "notStarted"; // currentLevel holds the instance of the currently loaded level
	this.currentLevelType = ""; // the level type of currentLevel. E.g this.Level.One, this.Level.Overworld
	this.levelKeys = [];	// key objects inside the game world are stored in this array when they are picked up by player
	this.totalNumberOfKeys = 0; // total number of keys the player has picked up
	this.showMenu = true;
	
	this.lives = 3;
	this.keys = 0;
	this.graphicDetails = true;
	
	var self = this;
	
	self.background_music = audio_music_theme_menu;
	
	// loadLevel is called by teleporters, e.g. in Overworld when you walk onto level 1 teleporter, loadLevel is called
	// with the argument Level.One
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
			self.background_music.element.volume = 0.05;
			self.currentLevel = new Overworld(self);
			self.currentLevelType = self.Level.Overworld;
			break;
		case self.Level.One:
			self.background_music.pause();
			self.background_music = audio_music_theme_level1;
			self.background_music.element.volume = 0.05;
			self.currentLevel = new LevelOne(self);
			if (self.graphicDetails) 
			self.currentLevelType = self.Level.One;
			createParticles(5, true, 1, false, true, 0xffffff);
			break;
		case self.Level.Two:
			self.background_music.pause();
			self.background_music = audio_music_theme_level2;
			self.background_music.element.volume = 0.05;;
			self.currentLevel = new LevelTwo(self);
			self.currentLevelType = self.Level.Two;
			break;
		case self.Level.TestLevel:
			self.currentLevel = new TestLevel(self);
			self.currentLevelType = self.Level.TestLevel;
			break;
		default:
			self.currentLevel = new TestLevel(self);
			self.currentLevelType = self.Level.TestLevel;
			break;
		}
		
		if (self.showMenu == false)
			self.background_music.play(); else audio_music_theme_menu.play();
		
		self.currentLevel.startLevel();
	}
	
	// Create "angle dust" particles in level 1
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
        });
	}

	this.render = function(currentTime) {
	    requestAnimationFrame(self.render);
	    var elapsed = self.calculateElapsed(currentTime);
	    	
	    self.camera.update();
	    if (( self.currentLevel.name == "LevelOne") && (self.graphicDetails) )
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
	    
	    self.renderer.render(self.sceneHud, self.hud.camera);
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
	
	// In 3dsmax, the z and y axes are switched. This method corrects for that.
	this.correctFor3dsMaxRotation = function(mesh) {
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	}
}