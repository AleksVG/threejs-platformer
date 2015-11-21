function EnemyOne(gameObject, positionX, positionY, positionZ, name) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.name = name;
	this.createEnemyOne = createEnemyOne;
	this.attackRadius = 70;
	this.movementSpeed = 500;
	this.activate = activate;
	var self = this;

	function createEnemyOne(geometry, materials) {
	    self.enemy = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 25);
	    
	    self.enemy.name = self.name;
	    self.enemy.type = "melee_enemy";
	    self.enemy.position.x = self.positionX;
	    self.enemy.position.y = self.positionY;
	    self.enemy.position.z = self.positionZ;
	    
	    self.gameObject.correctFor3dsMaxRotation(self.enemy);
	    self.gameObject.scene.add(self.enemy);
	    
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		self.enemy.setDamping(0.9, 1);
		attachEnemyOneMethods();
	}

	function attachEnemyOneMethods() {
		self.enemy.moveTowards = moveTowards;
	}

	function activate(playerAvatar) {
		// Use setInterval to execute 5 times per second instead of every frame
		setInterval(function() {
			if (isWithinRange(playerAvatar))
				attack(playerAvatar);
			else
				idle();
		}, 200);
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
		//enemy.lookAt(objectToAttack.position);
		self.enemy.moveTowards(objectToAttack);
	}

	function moveTowards(object) {
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
	}
}

