function GameObject(renderer) {
	this.renderer = renderer;
	
	this.currentlyPressedKeys = {};
	this.Key = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32};
	this.isMouseDown = false;
	this.rotateStart = new THREE.Vector2();
	this.rotateEnd = new THREE.Vector2();
	this.rotateDelta = new THREE.Vector2();
	this.cameraX = 100;
	this.cameraZ = 0;
	this.cameraY = 30;
	this.cameraRadius = 90;
	this.cameraXZAngle = Math.PI / 2;
	this.lastTime = 0;
	this.Level = {Overworld: "Overworld", One: "One", Two: "Two", Three: "Three", TestLevel: "TestLevel"};
	
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
	
	this.setupInput = function() {
		document.addEventListener('keyup', self.handleKeyUp, false);
		document.addEventListener('keydown', self.handleKeyDown, false);
	    document.addEventListener( 'mousemove', self.onMouseMove, false );
	    document.addEventListener( 'mouseup', self.onMouseUp, false );
	    document.addEventListener( 'mousedown', self.onMouseDown, false );
	}

	this.handleKeyDown = function(event) {
		self.currentlyPressedKeys[event.keyCode] = true;
	}

	this.handleKeyUp = function(event) {
		self.currentlyPressedKeys[event.keyCode] = false;
	}

	this.onMouseDown = function(event) {

	    event.preventDefault();

	    if ( event.button === 0 ) { // if left mouse button
	    	self.isMouseDown = true;
	        self.rotateStart.set( event.clientX, event.clientY );
	    }
	}

	this.onMouseMove = function(event) {
		
	    event.preventDefault();

	    if (self.isMouseDown) {
	        self.rotateEnd.set(event.clientX, event.clientY);
	        self.rotateDelta.subVectors(self.rotateEnd, self.rotateStart);
	        
	        self.cameraXZAngle += self.rotateDelta.x / 1200;
	        
	        self.cameraX = Math.sin(self.cameraXZAngle) * self.cameraRadius;
	        self.cameraZ = Math.cos(self.cameraXZAngle) * self.cameraRadius;
	        
	        self.cameraY += self.rotateDelta.y / 50;

	        self.rotateStart.copy(self.rotateEnd);
	    }
	}

	this.onMouseUp = function(event) {
	    self.isMouseDown = false;
	}
	
	this.render = function(currentTime) {
	    requestAnimationFrame(self.render);
	    //var elapsed = calculateElapsed(currentTime);
	    	
	    self.updateCamera();
	    self.handleKeys();

	    self.scene.simulate();
	    self.renderer.render(self.scene, self.camera);
	}

	this.calculateElapsed = function(currentTime) {
		if (currentTime == undefined)
			currentTime = 0;
		
		var elapsed = (currentTime - self.lastTime)/1000;

	    self.lastTime = currentTime;
	    
	    return elapsed;
	}

	this.updateCamera = function() {
		if (self.cameraY < -80)
			self.cameraY = -80;
		else if (self.cameraY > 80)
			self.cameraY = 80;
		
	    self.camera.position.set(self.playerAvatar.position.x - self.cameraX, self.playerAvatar.lastGroundY + self.cameraY, self.playerAvatar.position.z + self.cameraZ);
		self.camera.lookAt(new THREE.Vector3(self.playerAvatar.position.x, self.playerAvatar.lastGroundY, self.playerAvatar.position.z));
	}

	this.handleKeys = function() {
		
		if (self.currentlyPressedKeys[self.Key.A]) {
			self.playerAvatar.moveLeftInRelationToView();
		}
		
		if (self.currentlyPressedKeys[self.Key.D]) {
			self.playerAvatar.moveRightInRelationToView();
		}
		
		if (self.currentlyPressedKeys[self.Key.S]) {
			self.playerAvatar.moveBackwardInRelationToView();
		}
		
		if (self.currentlyPressedKeys[self.Key.W]) {
			self.playerAvatar.moveForwardInRelationToView();
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