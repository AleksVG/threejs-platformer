function PlayerAvatar(gameObject, positionX, positionY, positionZ) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	
	this.movementSpeed = 30;
	this.animationStep = 0;
	this.animationStepSpeed = 0.12;
	
	var self = this;

	this.createAvatar = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/player_avatar/player_head.js", loadHead);
		jsonLoader.load("models/player_avatar/player_body.js", loadBody);
		jsonLoader.load("models/player_avatar/player_arm_left.js", loadArmLeft);
		jsonLoader.load("models/player_avatar/player_arm_right.js", loadArmRight);
		jsonLoader.load("models/player_avatar/player_leg_left.js", loadLegLeft);
		jsonLoader.load("models/player_avatar/player_leg_right.js", loadLegRight);
		jsonLoader.load("models/player_avatar/player_base_box.js", loadBaseBox);
		
		setTimeout(attachPartsTogether, 100);
	}

	function loadHead(geometry, materials) {
	    head = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 10);
	    head.name = "playerHead";
	    
	    self.gameObject.scene.add(head);
	}

	function loadBody(geometry, materials) {
	    body = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 8);
	    body.name = "playerBody";
	    
	    self.gameObject.scene.add(body);
	}

	function loadArmLeft(geometry, materials) {
	    armLeft = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 2);
	    armLeft.name = "playerArmLeft";

	    self.gameObject.scene.add(armLeft);
	}

	function loadArmRight(geometry, materials) {
	    armRight = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 2);
	    armRight.name = "playerArmRight";
	    
	    self.gameObject.scene.add(armRight);
	}

	function loadLegLeft(geometry, materials) {
	    legLeft = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 2);
	    legLeft.name = "playerLegLeft";
	    
	    self.gameObject.scene.add(legLeft);
	}

	function loadLegRight(geometry, materials) {
	    legRight = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 2);
	    legRight.name = "playerLegRight";
	    
	    self.gameObject.scene.add(legRight);
	}

	function loadBaseBox(geometry, materials) {
	    baseBox = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 2);
	    baseBox.name = "playerBaseBox";
	    
	    self.gameObject.scene.add(baseBox);
		baseBox.visible = false;
	}

	function attachPartsTogether() {
		self.head = self.gameObject.scene.getObjectByName("playerHead");
		self.body = self.gameObject.scene.getObjectByName("playerBody");
		self.armLeft = self.gameObject.scene.getObjectByName("playerArmLeft");
		self.armRight = self.gameObject.scene.getObjectByName("playerArmRight");
		self.legLeft = self.gameObject.scene.getObjectByName("playerLegLeft");
		self.legRight = self.gameObject.scene.getObjectByName("playerLegRight");
		self.baseBox = self.gameObject.scene.getObjectByName("playerBaseBox");
		
		var pivotArmLeft = new THREE.Object3D();
		var pivotArmRight = new THREE.Object3D();
		var pivotLegLeft = new THREE.Object3D();
		var pivotLegRight = new THREE.Object3D();
		
		pivotArmLeft.add(self.armLeft);
		pivotArmRight.add(self.armRight);
		pivotLegLeft.add(self.legLeft);
		pivotLegRight.add(self.legRight);
		
		self.playerAvatar = self.head;
		self.playerAvatar.add(self.body);
		self.playerAvatar.add(pivotArmLeft);
		self.playerAvatar.add(pivotArmRight);
		self.playerAvatar.add(pivotLegLeft);
		self.playerAvatar.add(pivotLegRight);
		self.playerAvatar.add(self.baseBox);
		
		pivotArmLeft.position.set(1.8, -4, 0);
		pivotArmRight.position.set(-1.8, -4, 0);
		pivotLegLeft.position.set(0.8, -6, 0);
		pivotLegRight.position.set(-0.8, -6, 0);
		
		self.playerAvatar.position.set(self.positionX, self.positionY, self.positionZ);
		self.playerAvatar.name = "playerAvatar";
		
		self.gameObject.scene.add(self.playerAvatar);
		self.playerAvatar.setAngularFactor(new THREE.Vector3(0, 1, 0));
		
		attachMethods();
		self.playerAvatar.lastGroundY = 0;
	}

	function attachMethods() {
		self.playerAvatar.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.type == "basic_platform" && !self.playerAvatar.onGround) {
				linearDamping = 0.98;
				self.playerAvatar.onGround = true;
				self.playerAvatar.setDamping(linearDamping, 1.0);
			    moveCameraSmoothly();
			}
			else if (other_object.type == "slippery_platform") {
			    playerAvatar.setDamping(0.1, 1.0);
				playerAvatar.onGround = true;
			}
			else if (other_object.type == "melee_enemy") {
				
			}
		});
		
		self.playerAvatar.moveLeftInRelationToView = moveLeftInRelationToView;
		self.playerAvatar.moveRightInRelationToView = moveRightInRelationToView;
		self.playerAvatar.moveForwardInRelationToView = moveForwardInRelationToView;
		self.playerAvatar.moveBackwardInRelationToView = moveBackwardInRelationToView;
		self.playerAvatar.jump = jump;
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



	function rotateTowardsMovingDirection(vector) {
		var lookAt = new THREE.Vector3();
		lookAt.addVectors(vector, self.playerAvatar.position);	
		self.playerAvatar.lookAt(lookAt);
		self.playerAvatar.__dirtyRotation = true;
	}

	function animate() {
		self.animationStep += self.animationStepSpeed;
		
		if (self.animationStep > 0.8 || self.animationStep < -0.8)
			self.animationStepSpeed = -self.animationStepSpeed;
		
		self.armLeft.rotation.set(-self.animationStep, 0, 0);
		self.armRight.rotation.set(self.animationStep, 0, 0);
		self.legLeft.rotation.set(self.animationStep, 0, 0);
		self.legRight.rotation.set(-self.animationStep, 0, 0);
	}

	function moveLeftInRelationToView() {
		// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
		var vector = new THREE.Vector3(0, 0, -1);
		vector.applyQuaternion(self.gameObject.camera.quaternion);
		vector = new THREE.Vector3(self.movementSpeed * vector.x, 0, self.movementSpeed * vector.z);
		
		// http://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
		var newX = (vector.x * Math.cos(Math.PI/2)) + (vector.z * Math.sin(Math.PI/2));
		var newZ = (-vector.x * Math.sin(Math.PI/2)) + (vector.z * Math.cos(Math.PI/2));
		
		vector = new THREE.Vector3(newX, vector.y, newZ);

		rotateTowardsMovingDirection(vector);
		animate();
		
		if (!isOverTopSpeed() || !vectorWillIncreaseSpeed(vector))
			self.playerAvatar.applyCentralImpulse(vector);
	}

	function moveRightInRelationToView() {
		// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
		var vector = new THREE.Vector3(0, 0, -1);
		vector.applyQuaternion(self.gameObject.camera.quaternion);
		vector = new THREE.Vector3(self.movementSpeed * vector.x, 0, self.movementSpeed * vector.z);
		
		// http://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
		var newX = (vector.x * Math.cos(-Math.PI/2)) + (vector.z * Math.sin(-Math.PI/2));
		var newZ = (-vector.x * Math.sin(-Math.PI/2)) + (vector.z * Math.cos(-Math.PI/2));
		
		vector = new THREE.Vector3(newX, vector.y, newZ);
		
		rotateTowardsMovingDirection(vector);
		animate();
		
		if (!isOverTopSpeed() || !vectorWillIncreaseSpeed(vector))
			self.playerAvatar.applyCentralImpulse(vector);
	}

	function moveForwardInRelationToView() {
		// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
		var vector = new THREE.Vector3(0, 0, -1);
		vector.applyQuaternion(self.gameObject.camera.quaternion);
		vector = new THREE.Vector3(self.movementSpeed * vector.x, 0, self.movementSpeed * vector.z);
		
		rotateTowardsMovingDirection(vector);
		animate();
		
		if (!isOverTopSpeed() || !vectorWillIncreaseSpeed(vector))
			self.playerAvatar.applyCentralImpulse(vector);
	}

	function moveBackwardInRelationToView() {
		// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
		var vector = new THREE.Vector3(0, 0, -1);
		vector.applyQuaternion(self.gameObject.camera.quaternion);
		vector = new THREE.Vector3(self.movementSpeed * vector.x, 0, self.movementSpeed * vector.z);
		vector = new THREE.Vector3(-vector.x, -vector.y, -vector.z);
		
		rotateTowardsMovingDirection(vector);
		animate();

		if (!isOverTopSpeed() || !vectorWillIncreaseSpeed(vector))
			self.playerAvatar.applyCentralImpulse(vector);
	}

	function isOverTopSpeed() {
		var currentVelocity = self.playerAvatar.getLinearVelocity();
		var topSpeed = 35;
		var currentVelocityMagnitude = Math.sqrt(Math.pow(currentVelocity.x, 2) + Math.pow(currentVelocity.z, 2));
		
		if (currentVelocityMagnitude > topSpeed)
			return true;
		else
			return false;
	}

	function vectorWillIncreaseSpeed(vector) {
		var currentVelocity = self.playerAvatar.getLinearVelocity();
		var normalizedVelocity = vec3.fromValues(currentVelocity.x, currentVelocity.y, currentVelocity.z);
		vec3.normalize(normalizedVelocity, normalizedVelocity);
		
		var normalizedForce = vec3.fromValues(vector.x, vector.y, vector.z);
		vec3.normalize(normalizedForce, normalizedForce);
		
		var dotProduct = vec3.dot(normalizedVelocity, normalizedForce);
		
		if (Math.acos(dotProduct) < (Math.PI / 2))
			return true;
		else
			return false;
	}

	function jump(holdingSpace) {	
		var currentVelocityY = self.playerAvatar.getLinearVelocity().y;
		
		if (holdingSpace && self.playerAvatar.onGround) {
			self.playerAvatar.lastGroundY = self.playerAvatar.position.y;
			self.playerAvatar.onGround = false;
			self.playerAvatar.setDamping(0, 1);
			self.playerAvatar.applyCentralImpulse(new THREE.Vector3(0, 550, 0));
		}
		else if (!holdingSpace && !self.playerAvatar.onGround && currentVelocityY > 20) {
			self.playerAvatar.applyCentralImpulse(new THREE.Vector3(0, -40, 0));
		}
		
		if (currentVelocityY < -1 && self.playerAvatar.onGround) {
			self.playerAvatar.setDamping(0, 1);
			self.playerAvatar.onGround = false;
		}

	}
}

