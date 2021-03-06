function Camera(gameObject) {
	this.gameObject = gameObject;
	
	this.isMouseDown = false;
	this.rotateStart = new THREE.Vector2(); // mouse position when left mouse button is pressed
	this.rotateEnd = new THREE.Vector2();	// mouse position when left mouse button is released
	this.rotateDelta = new THREE.Vector2(); // difference between previous two
	this.cameraX = 100;
	this.cameraZ = 0;
	this.cameraY = 30;
	this.cameraRadius = 90;
	this.cameraXZAngle = Math.PI / 2;
	this.State = {Follow: "Follow", SmoothFollow: "SmoothFollow", FollowExceptY: "FollowExceptY"};
	this.rotationSpeed = 1;
	
	var self = this;
	
	this.initialize = function() {
		self.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
		
		self.gameObject.audioListener = new THREE.AudioListener();
		self.camera.add(self.gameObject.audioListener);
		
		self.camera.lookAt(self.gameObject.playerAvatar.position);
		self.gameObject.scene.add(self.camera);
		
		self.adjustForBrowserType();
	}
	
	this.adjustForBrowserType = function() {
		console.log(navigator.userAgent);
		
		if (navigator.userAgent.indexOf("Chrome") !== -1) {
			console.log("using chrome!");
			self.rotationSpeed = 4;
		}
		else if (navigator.userAgent.indexOf("Firefox") !== -1) {
			console.log("using firefox!");
			self.rotationSpeed = 1;
		}
		else {
		}
	}
	
	this.setupInput = function() {
		document.addEventListener('keyup', self.onKeyUp, false);
		document.addEventListener('keydown', self.onKeyDown, false);
	    document.addEventListener('mousemove', self.onMouseMove, false);
	    document.addEventListener('mouseup', self.onMouseUp, false);
	    document.addEventListener('mousedown', self.onMouseDown, false);
	}
	
	function moveCameraSmoothly(playerAvatar) {
		var difference = Math.abs(self.playerAvatar.lastGroundY - self.playerAvatar.position.y);
		var x = 0.5;
		var elapsedSeconds = 0.25;
		var decayFunction = 0.2 * (1/(4*elapsedSeconds));
		var startTime = new Date().getTime();
		
		smoother = setInterval(function() {
			elapsedSeconds = ((new Date().getTime() - startTime) / 1000) + 0.25;
			
			
			if (self.playerAvatar.lastGroundY < self.playerAvatar.position.y)
				self.playerAvatar.lastGroundY += decayFunction;
			else
				self.playerAvatar.lastGroundY -= decayFunction;
			
			if (Math.abs(self.playerAvatar.lastGroundY - self.playerAvatar.position.y) < 2) {
				self.playerAvatar.lastGround = self.playerAvatar.position.y;
				clearInterval(smoother);
			}
		}, 1);
	}
	
	this.update = function() {
		self.clampCameraHeight();
		
		self.positionCamera();
	}
	
	this.clampCameraHeight = function() {
		if (self.cameraY < -80)
			self.cameraY = -80;
		else if (self.cameraY > 80)
			self.cameraY = 80;
	}
	
	this.positionCamera = function() {
		if (self.camera != undefined) {
	    self.camera.position.set(self.gameObject.playerAvatar.position.x - self.cameraX, self.gameObject.playerAvatar.position.y + self.cameraY, self.gameObject.playerAvatar.position.z + self.cameraZ);
		self.camera.lookAt(new THREE.Vector3(self.gameObject.playerAvatar.position.x, self.gameObject.playerAvatar.position.y, self.gameObject.playerAvatar.position.z));
		}
	}
	
	this.onKeyDown = function(event) {

		if ( self.gameObject.showMenu ) {
			if ( (event.keyCode == self.gameObject.Key.UP_ARROW) || (event.keyCode == self.gameObject.Key.DOWN_ARROW) || (event.keyCode == self.gameObject.Key.ENTER) || (event.keyCode == self.gameObject.Key.SPACEBAR) ) {
				self.gameObject.menu.sendKeys(event.keyCode);
			}
		} else {
			self.gameObject.currentlyPressedKeys[event.keyCode] = true;
			
			if ( (event.keyCode == self.gameObject.Key.A) || (event.keyCode == self.gameObject.Key.W) || (event.keyCode == self.gameObject.Key.D) || (event.keyCode == self.gameObject.Key.S)) {
				audio_sfx_player_stepgrass.play();
			}
		}
		
		if ( (event.keyCode == self.gameObject.Key.ESCAPE) && (self.gameObject.newGame == false) ) {
			if (self.gameObject.showMenu) {
				self.gameObject.background_music.play();
				audio_music_theme_menu.pause();
			} else {
				self.gameObject.background_music.pause();
				audio_music_theme_menu.play();
			}
			self.gameObject.showMenu = !self.gameObject.showMenu;
		}
	}

	this.onKeyUp = function(event) {
		self.gameObject.currentlyPressedKeys[event.keyCode] = false;
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
	        
	        self.cameraXZAngle += (self.rotateDelta.x / 1200) * self.rotationSpeed;
	        
	        self.cameraX = Math.sin(self.cameraXZAngle) * self.cameraRadius;
	        self.cameraZ = Math.cos(self.cameraXZAngle) * self.cameraRadius;
	        
	        self.cameraY += (self.rotateDelta.y / 50) * self.rotationSpeed;

	        self.rotateStart.copy(self.rotateEnd);
	    }
	}

	this.onMouseUp = function(event) {
	    self.isMouseDown = false;
	}
}