function GameObject(renderer) {
	this.renderer = renderer;
		
	this.currentlyPressedKeys = {};
	this.Key = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32, ESCAPE: 27, ENTER: 13, LEFT_ARROW: 37, RIGHT_ARROW: 38, UP_ARROW: 38, DOWN_ARROW: 40 };
	this.Level = {Overworld: "Overworld", One: "One", Two: "Two", Three: "Three", TestLevel: "TestLevel"};
	this.lastTime = 0;
	this.playerInputEnabled = false;
	this.currentLevel = "notStarted";
	this.levelKeys = [];
	
	var self = this;
	
	self.background_music = audio_music_theme_overworld;
	
	this.loadLevel = function(level) {
		if (self.currentLevel != "notStarted")
			self.currentLevel.deactivate();
		
		self.playerInputEnabled = false;
		
		
		self.showMenu = false;
		
		var scene = new Physijs.Scene;
		var sceneMenu = new THREE.Scene();
		
	    scene.setGravity(new THREE.Vector3(0, -125, 0));
	    
	    self.scene = scene;
	    self.sceneMenu = sceneMenu;
		
		switch (level) {
		case self.Level.Overworld:
			self.background_music.pause();
			self.background_music = audio_music_theme_overworld;

			self.background_music.play();
			self.background_music.volume = 0.2;
			self.currentLevel = new Overworld(self);
			break;
		case self.Level.One:
			self.background_music.pause();
			self.background_music = audio_music_theme_level1;
			self.background_music.element.volume = 0.05;
			self.background_music.play();
			self.currentLevel = new LevelOne(self);
			break;
		case self.Level.Two:
			self.background_music.pause();
			self.background_music = audio_music_theme_level2;
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

	this.render = function(currentTime) {
	    requestAnimationFrame(self.render);
	    var elapsed = self.calculateElapsed(currentTime);
	    	
	    self.camera.update();
	    
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