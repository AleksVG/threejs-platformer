function EnemyOne(gameObject, positionX, positionY, positionZ, name, rotationY, attackRadius, movementSpeed) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.rotationY = rotationY;
	this.name = name;
	
	this.attackRadius = attackRadius;
	this.movementSpeed = movementSpeed;
	this.isAttacking = false;
	
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
		self.enemy.rotateY(self.rotationY);
		
		self.rotationSound = new THREE.Audio(self.gameObject.audioListener);
		self.rotationSound.load("sounds/rotating_robot.wav");
		self.rotationSound.setRefDistance(50);
		self.rotationSound.setLoop(true);
		self.rotationSound.setRolloffFactor(2);
		self.enemy.add(self.rotationSound);
		
		self.enemy.receiveShadow = true;
		self.enemy.castShadow = true;
	    
	    self.gameObject.scene.add(self.enemy);
	    
		self.enemy.setDamping(0.9, 1);
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		
		self.enemy.deactivate = self.deactivate;
		self.addEventListeners();
	}
	
	this.addEventListeners = function() {
		self.enemy.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				console.log("player y: " + self.gameObject.playerAvatar.getBottomCollisionPointY() + ", enemy y: " + (self.enemy.position.y + 3));
				if ((self.gameObject.playerAvatar.getBottomCollisionPointY() > (self.enemy.position.y + 3)) && 
					!self.gameObject.playerAvatar.onGround) {
					
					self.gameObject.playerAvatar.applyCentralImpulse(new THREE.Vector3(0, 500, 0));
					self.enemy.deactivate();
					self.gameObject.scene.remove(self.enemy);
					self.rotationSound.source.stop();
					audio_sfx_enemy_die.play();
				}
				else {
					self.gameObject.playerAvatar.damage(1);
					self.enemy.applyCentralImpulse(new THREE.Vector3(-contact_normal.x * 800, 0, -contact_normal.z * 800));
					self.gameObject.playerAvatar.applyCentralImpulse(new THREE.Vector3(contact_normal.x * 800, 0, contact_normal.z * 800));
					// play damage sound?
				}
			}

		});
	}
	
	this.activate = function() {
		self.activateInterval = setInterval(function() {
			if (isWithinRange(self.gameObject.playerAvatar))
				attack(self.gameObject.playerAvatar);
			else
				idle();
		}, 20);
	}
	
	this.deactivate = function() {
		clearInterval(self.activateInterval);
		self.rotationSound.source.stop();
	}

	function isWithinRange(objectToAttack) {
		var distanceBetweenObjects = Math.abs(Math.sqrt(Math.pow(self.enemy.position.x - objectToAttack.position.x, 2) + 
														Math.pow(self.enemy.position.y - objectToAttack.position.y, 2) + 
														Math.pow(self.enemy.position.z - objectToAttack.position.z, 2)));
		
		if (distanceBetweenObjects < self.attackRadius) {
//			audio_sfx_enemy_attack.play();
			return true;
		} else return false;
	}

	function attack(objectToAttack) {
		if (!self.isAttacking) {
			var attackSound = new THREE.Audio(self.gameObject.audioListener);
			attackSound.load("sounds/enemy_1_attack.wav");
			attackSound.setRefDistance(60);
			attackSound.setLoop(false);
			attackSound.setRolloffFactor(2);
			self.enemy.add(attackSound);
			
			self.rotationSound.source.stop();
			
			self.rotationSound = new THREE.Audio(self.gameObject.audioListener);
			self.rotationSound.load("sounds/rotating_robot_attacking.wav");
			self.rotationSound.setRefDistance(50);
			self.rotationSound.setLoop(true);
			self.rotationSound.setRolloffFactor(2);
			self.enemy.add(self.rotationSound);
			
			self.isAttacking = true;
		}
		
		self.enemy.__dirtyRotation = true;
		var lookAtPosition = new THREE.Vector3(objectToAttack.position.x, self.enemy.position.y, objectToAttack.position.z);
		self.enemy.lookAt(lookAtPosition);
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
		self.enemy.rotateY(0.01);
		
		if (self.isAttacking) {
			self.isAttacking = false;

			self.rotationSound.source.stop();
			
			self.rotationSound = new THREE.Audio(self.gameObject.audioListener);
			self.rotationSound.load("sounds/rotating_robot.wav");
			self.rotationSound.setRefDistance(50);
			self.rotationSound.setLoop(true);
			self.rotationSound.setRolloffFactor(2);
			self.enemy.add(self.rotationSound);
		}
	}
}

