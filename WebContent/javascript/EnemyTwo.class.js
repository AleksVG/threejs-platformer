function EnemyTwo(gameObject, positionX, positionY, positionZ, name, rotationY, attackRadius) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.rotationY = rotationY;
	this.name = name;
	this.attackRadius = attackRadius;
	this.isAttacking = false;
	
	this.AttackType = {ConstantInterval: "ConstantInterval", TripleShot: "TripleShot", DoubleShot: "DoubleShot", Custom: "Custom"};
	this.constantIntervalWait = 2000; // Default interval in milliseconds
	this.customAttackInterval = -1; // 
	this.currentAttackType = this.AttackType.ConstantInterval;
	
	var self = this;

	this.createEnemyTwo = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/enemies/enemy_two/enemy_2.js", self.loadBody);
		jsonLoader.load("models/enemies/enemy_two/enemy_2_base.js", self.loadBase);
		
		setTimeout(self.attachPartsTogether, 500);
	}
	
	this.loadBody = function(geometry, materials) {
		self.enemy = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 250);
	    self.enemy.name = self.name;
	    self.enemy.boundingBox = new THREE.Box3().setFromObject(self.enemy);
		
		self.gameObject.scene.add(self.enemy);
	}
	
	this.loadBase = function(geometry, materials) {
		self.base = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 250);
		
		self.gameObject.scene.add(self.enemy);
	}
	
	this.attachPartsTogether = function() {
		self.enemy.add(self.base);
		
	    self.enemy.type = "enemy_two";
	    self.enemy.position.x = self.positionX;
	    self.enemy.position.y = self.positionY;
	    self.enemy.position.z = self.positionZ;
		self.enemy.rotateZ(self.rotationY); // Z is Y axis...
		
		self.enemy.receiveShadow = true;
		self.enemy.castShadow = true;
	    
	    self.gameObject.scene.add(self.enemy);
		self.enemy.setAngularFactor(new THREE.Vector3(0, 1, 0));
		self.enemy.setDamping(0.98, 1);
		
		self.enemy.deactivate = self.deactivate;
		self.addEventListeners();
	}
	
	this.addEventListeners = function() {
		self.enemy.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				console.log("player y: " + self.gameObject.playerAvatar.getBottomCollisionPointY() + ", enemy y: " + (self.enemy.position.y + 6));
				if ((self.gameObject.playerAvatar.getBottomCollisionPointY() > (self.enemy.position.y + 6)) && 
					!self.gameObject.playerAvatar.onGround) {
					
					self.gameObject.playerAvatar.applyCentralImpulse(new THREE.Vector3(0, 500, 0));
					self.enemy.deactivate();
					self.gameObject.scene.remove(self.enemy);
					audio_sfx_enemy_die.play();
				}
			}
		});
	}
	
	this.getLookAtPosition = function() {
		return new THREE.Vector3(self.gameObject.playerAvatar.position.x, self.enemy.position.y, self.gameObject.playerAvatar.position.z);
	}
	
	this.deactivate = function() {
		clearInterval(self.activateInterval);
		clearInterval(self.rotationInterval);
		clearInterval(self.shootInterval);
	}
	
	this.activate = function() {
		self.activateInterval = setInterval(function() {
			if (self.isWithinRange(self.gameObject.playerAvatar)) {
				if (!self.isAttacking)
					self.attack();
			}
			else
				self.idle();
		}, 100);
		
		// Shoot fireballs at certain premade intervals (or random?).
		// Should be able to choose between different firing sequences.
		
		// Fire in fixed direction, or aim at player?
		// Maybe we should be able to choose that too.
		
		// Fireballs should be fancy, with particle effects and cool lighting.
		// When fireball hits player, deduct life from player.
		// Fireballs should probably be a separate class.
	}
	
	this.isWithinRange = function(objectToAttack) {
		var distanceBetweenObjects = Math.abs(Math.sqrt(Math.pow(self.enemy.position.x - objectToAttack.position.x, 2) + 
														Math.pow(self.enemy.position.y - objectToAttack.position.y, 2) + 
														Math.pow(self.enemy.position.z - objectToAttack.position.z, 2)));
		
		if (distanceBetweenObjects < self.attackRadius)
			return true;
		else
			return false;
	}
	
	this.attack = function() {
		self.isAttacking = true;
		
		self.rotationInterval = setInterval(function() {
			self.enemy.__dirtyRotation = true;
			var lookAtPosition = self.getLookAtPosition();
			self.enemy.lookAt(lookAtPosition);
			}, 50);
		
		switch(self.currentAttackType) {
		case self.AttackType.ConstantInterval:
			self.shootInterval = setInterval(function() {
				new Projectile(self.gameObject, self).fire();
			}, self.constantIntervalWait);
			break;
			
		case self.AttackType.TripleShot:
			self.shootInterval = setInterval(function() {
				new Projectile(self.gameObject, self).fire();
				
				setTimeout(function() {
					new Projectile(self.gameObject, self).fire();
					
					setTimeout(function() {
						new Projectile(self.gameObject, self).fire();
					}, 500);
				}, 500);
			}, 3000);
			break;
			
		case self.AttackType.DoubleShot:
			self.shootInterval = setInterval(function() {
				new Projectile(self.gameObject, self).fire();
				
				setTimeout(function() {
					new Projectile(self.gameObject, self).fire();
				}, 500);
			}, 2000);
			break;
			
		default:
			self.shootInterval = setInterval(function() {
				new Projectile(self.gameObject, self).fire();
			}, self.constantIntervalWait);
			break;
		}
		

	}
	
	this.idle = function() {
		self.isAttacking = false;

		clearInterval(self.rotationInterval);
		clearInterval(self.shootInterval);
		
		self.enemy.__dirtyRotation = true;
		self.enemy.rotateY(0.01);
	}
	
	this.setAttackType = function(attackType) {
		self.currentAttackType = attackType;
		self.idle();
	}
}

