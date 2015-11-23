function GameObject(renderer) {
	this.renderer = renderer;
	
	this.currentlyPressedKeys = {};
	this.Key = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32};
	this.Level = {Overworld: "Overworld", One: "One", Two: "Two", Three: "Three", TestLevel: "TestLevel"};
	this.lastTime = 0;
	
	var self = this;
	
	this.loadLevel = function(level) {
		var scene = new Physijs.Scene;
	    scene.setGravity(new THREE.Vector3(0, -125, 0));
	    
	    self.scene = scene;
		
		switch (level) {
		case self.Level.Overworld:
			self.currentLevel = new Overworld(self);
			break;
		case self.Level.One:
			self.currentLevel = new LevelOne(self);
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
	    self.handleKeys(elapsed);

	    self.scene.simulate();
	    self.renderer.render(self.scene, self.camera.camera);
	}

	this.calculateElapsed = function(currentTime) {
		if (currentTime == undefined)
			currentTime = 0;
		
		var elapsed = (currentTime - self.lastTime);

	    self.lastTime = currentTime;
	    
	    return elapsed;
	}

	this.handleKeys = function(elapsed) {
		
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
	
	this.correctFor3dsMaxRotation = function(mesh) {
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	}
}