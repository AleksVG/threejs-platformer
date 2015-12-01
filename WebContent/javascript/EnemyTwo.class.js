function EnemyOne(gameObject, positionX, positionY, positionZ, name, rotationY, attackRadius) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.rotationY = rotationY;
	this.name = name;
	
	var self = this;

	this.createEnemyOne = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/enemies/enemy_one/enemy_2.js", self.loadBody);
		jsonLoader.load("models/enemies/enemy_one/enemy_2_base.js", self.loadBase);
		
		setTimeout(self.attachPartsTogether, 500);
	}
	
	this.loadBody = function(geometry, materials) {
		self.enemy = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 25);
	    self.enemy.name = self.name;
		
		self.gameObject.scene.add(self.enemy);
	}
	
	this.loadBase = function(geometry, materials) {
		self.base = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 25);
		
		self.gameObject.scene.add(self.enemy);
	}
	
	this.attachPartsTogether = function() {
		self.enemy.add(self.base);
		
	    self.enemy.type = "enemy_two";
	    self.enemy.position.x = self.positionX;
	    self.enemy.position.y = self.positionY;
	    self.enemy.position.z = self.positionZ;
		self.enemy.rotateZ(self.rotationY); // Z is Y axis...
	    
	    self.gameObject.correctFor3dsMaxRotation(self.enemy);
	    self.gameObject.scene.add(self.enemy);
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		
		self.enemy.deActivate = self.deActivate;
		self.addEventListeners();
	}
	
	this.addEventListeners = function() {
		self.enemy.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			
		});
	}
	
	this.activate = function() {
		// Shoot fireballs at certain premade intervals (or random?).
		// Should be able to choose between different firing sequences.
		
		// Fire in fixed direction, or aim at player?
		// Maybe we should be able to choose that too.
		
		// Fireballs should be fancy, with particle effects and cool lighting.
		// When fireball hits player, deduct life from player.
		// Fireballs should probably be a separate class.
	}
}

