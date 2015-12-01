function EnemyOne(gameObject, positionX, positionY, positionZ, name, rotationY, attackRadius) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.rotationY = rotationY;
	this.name = name;
	
	this.attackRadius = attackRadius;
	this.movementSpeed = 50;
	
	var self = this;

	this.createEnemyOne = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/enemies/enemy_one/enemy_1.js", self.loadBody);
		jsonLoader.load("models/enemies/enemy_one/enemy_1_spikes.js", self.loadSpikes);
		
		setTimeout(self.attachPartsTogether, 500);
	}
	
	this.loadBody = function(geometry, materials) {
		self.enemy = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 25);
	    self.enemy.name = self.name;
		
		self.gameObject.scene.add(self.enemy);
	}
	
	this.loadSpikes = function(geometry, materials) {
		self.spikes = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ), 0);
		
		self.gameObject.scene.add(self.spikes);
	}
	
	this.attachPartsTogether = function() {
		self.enemy.add(self.spikes);
		
	    self.enemy.type = "enemy_one";
	    self.enemy.position.x = self.positionX;
	    self.enemy.position.y = self.positionY;
	    self.enemy.position.z = self.positionZ;
		self.enemy.rotateZ(self.rotationY); // Z is Y axis...
	    
	    self.gameObject.correctFor3dsMaxRotation(self.enemy);
	    self.gameObject.scene.add(self.enemy);
	    
		self.enemy.setDamping(0.9, 1);
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		
		self.enemy.deActivate = self.deActivate;
		self.addEventListeners();
	}
	
	this.addEventListeners = function() {
		self.enemy.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (self.enemy.position.y + 8)) {
					self.gameObject.playerAvatar.applyCentralImpulse(new THREE.Vector3(0, 500, 0));
					self.enemy.deActivate();
					self.gameObject.scene.remove(self.enemy);
				}
			}
			else if (other_object.name == "playerAvatar") {
				self.gameObject.playerAvatar.lives -= 1;
				
				if (self.gameObject.playerAvatar.lives <= 0)
					self.gameObject.playerAvatar.die();
			}
		});
	}
	
	this.activate = function() {
		setInterval(self.activateInterval, 20);
	}
	
	this.activateInterval = function() {
		if (isWithinRange(self.gameObject.playerAvatar))
			attack(self.gameObject.playerAvatar);
		else
			idle();
	}
	
	this.deActivate = function() {
		clearInterval(self.activateInterval);
	}

	function isWithinRange(objectToAttack) {
		var distanceBetweenObjects = Math.abs(Math.sqrt(Math.pow(self.enemy.position.x - objectToAttack.position.x, 2) + 
														Math.pow(self.enemy.position.y - objectToAttack.position.y, 2) + 
														Math.pow(self.enemy.position.z - objectToAttack.position.z, 2)));
		
		if (distanceBetweenObjects < self.attackRadius)
			return true;
		else
			return false;
	}

	function attack(objectToAttack) {
//		self.enemy.__dirtyRotation = true;
//		self.enemy.lookAt(objectToAttack.position);
		self.moveTowards(objectToAttack);
	}

	this.moveTowards = function(object) {
		var normalizedSpeedVector = vec3.fromValues(self.enemy.position.x - object.position.x,
													self.enemy.position.y - object.position.y,
													self.enemy.position.z - object.position.z);
		vec3.normalize(normalizedSpeedVector, normalizedSpeedVector);
		
		var speedVector = new THREE.Vector3(-normalizedSpeedVector[0] * self.movementSpeed,
										0,
										-normalizedSpeedVector[2] * self.movementSpeed);

		self.enemy.applyCentralImpulse(speedVector);
	}

	function idle() {
		// What does the enemy do when not attacking? Rolling aimlessly around...
		// Temporary: just rotate
		self.enemy.__dirtyRotation = true;
		self.enemy.rotation.z += 0.01;
	}
}

