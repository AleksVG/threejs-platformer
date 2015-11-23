function EnemyOne(gameObject, positionX, positionY, positionZ, name) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.name = name;
	
	this.attackRadius = 70;
	this.movementSpeed = 50;
	
	var self = this;

	this.createEnemyOne = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/enemies/enemy_one/enemy_1.js", self.loadBody);
		jsonLoader.load("models/enemies/enemy_one/enemy_1_spikes.js", self.loadSpikes);
//		jsonLoader.load("models/enemies/enemy_one/enemy_1_hitbox.js", self.loadHitbox);
		
		setTimeout(self.attachPartsTogether, 100);
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
	
	this.loadHitbox = function(geometry, materials) {
		self.hitbox = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
		self.hitbox.name = "enemy_one_hitbox";
		self.hitbox.parentEnemy = self.name;

	    self.gameObject.correctFor3dsMaxRotation(self.hitbox);
		self.gameObject.scene.add(self.hitbox);
	}
	
	this.attachPartsTogether = function() {
		self.enemy.add(self.spikes);
//		self.enemy.add(self.hitbox);
		
	    self.enemy.type = "enemy_one";
	    self.enemy.position.x = self.positionX;
	    self.enemy.position.y = self.positionY;
	    self.enemy.position.z = self.positionZ;
	    
	    self.gameObject.correctFor3dsMaxRotation(self.enemy);
	    self.gameObject.scene.add(self.enemy);
	    
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		self.enemy.setDamping(0.9, 1);
		
		self.enemy.deActivate = self.deActivate;
	}
	
	this.activate = function() {
		setInterval(self.activateInterval, 20);
	}
	
	this.activateInterval = function() {
		if (isWithinRange(self.gameObject.playerAvatar))
			attack(self.gameObject.playerAvatar);
		else
			idle();
		
//		self.hitbox.__dirtyPosition = true;
//		self.hitbox.position.x = self.enemy.position.x;
//		self.hitbox.position.y = self.enemy.position.y + 0.4;
//		self.hitbox.position.z = self.enemy.position.z;
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
	}
}

