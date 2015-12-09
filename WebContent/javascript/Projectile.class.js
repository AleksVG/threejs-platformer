// EnemyTwo uses this class to fire balls. 

function Projectile(gameObject, parentEnemy) {
	this.gameObject = gameObject;
	this.parentEnemy = parentEnemy;
	
	var self = this;
	
	this.fire = function() {
		var ballMaterial = self.createBallMaterial();
		
		var ball = new Physijs.SphereMesh(new THREE.SphereGeometry(2.5, 60, 60), ballMaterial, 0);
		
		ball.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.gameObject.playerAvatar.damage(1);
				self.gameObject.scene.remove(ball);
				clearInterval(self.updateInterval);
			}
			else {
				self.gameObject.scene.remove(ball);
				clearInterval(self.updateInterval);
			}
			

		});
		
//		audio_sfx_cannon.play();
		var cannonSound = new THREE.Audio(self.gameObject.audioListener);
		cannonSound.load("sounds/cannon_amplified.wav");
		cannonSound.setRefDistance(80);
		cannonSound.setRolloffFactor(2);
		cannonSound.setLoop(false);
		ball.add(cannonSound);
		
		var directionVector = self.getNormalizedDirectionVector();
		self.setBallStartPosition(ball, directionVector);
		self.gameObject.scene.add(ball);
		
		self.updateInterval = setInterval(function() {
			self.updateBall(ball, directionVector);
		}, 20);
		
		setTimeout(function() {
			self.gameObject.scene.remove(ball);
			clearInterval(self.updateInterval);
		}, 5000);
	}
	
	this.createBallMaterial = function() {
		var ballMaterial = Physijs.createMaterial(
				new THREE.MeshPhongMaterial(
	                    {
	                        color: 0x000000,
	                        ambient: 0x000000,
	                        specular: 0xffffff,
	                        shininess: 100,
	                        metal: true,
	                        opacity: 1,
	                        transparent: false
	                    }),
	            0.01,
	            0.01);
		
		return ballMaterial;
	}
	
	this.getNormalizedDirectionVector = function() {
		var lookAtPosition = self.parentEnemy.getLookAtPosition();
		var directionVector = new THREE.Vector3(lookAtPosition.x - self.parentEnemy.enemy.position.x,
												lookAtPosition.y - self.parentEnemy.enemy.position.y,
												lookAtPosition.z - self.parentEnemy.enemy.position.z);
		
		var directionMagnitude = Math.sqrt(Math.pow(directionVector.x, 2) + Math.pow(directionVector.y, 2) + Math.pow(directionVector.z, 2));
		var normalizationFactor = 1 / directionMagnitude;
		
		directionVector = new THREE.Vector3(normalizationFactor * directionVector.x,
											normalizationFactor * directionVector.y,
											normalizationFactor * directionVector.z);
		
		return directionVector;
	}
	
	this.setBallStartPosition = function(ball, directionVector) {
		ball.__dirtyPosition = true;
		ball.position.x = self.parentEnemy.enemy.position.x;
		ball.position.y = self.parentEnemy.enemy.position.y - 2;
		ball.position.z = self.parentEnemy.enemy.position.z;
		
		ball.position.x += directionVector.x * 10;
		ball.position.y += directionVector.y * 10;
		ball.position.z += directionVector.z * 10;
	}
	
	this.updateBall = function(ball, directionVector) {
		ball.__dirtyPosition = true;
		ball.position.x += directionVector.x;
		ball.position.y += directionVector.y;
		ball.position.z += directionVector.z;
	}
}