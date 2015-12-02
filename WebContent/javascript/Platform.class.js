function Platform(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;

	this.createBasicPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "basic_platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 2)) {
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.98, 1.0);
					
					self.gameObject.playerAvatar.onMovingPlatform = false;
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	}

	this.createSlipperyPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "slippery_platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 1.5)) {
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.1, 1.0);
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	}
	
	this.createFallingPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 1000000);
	    
	    mesh.type = "falling_platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 3)) {
					self.platformFall(mesh);
					
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.98, 1.0);
					console.log("on falling");
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	    mesh.setDamping(1, 1);
	}
	
	self.platformFall = function(mesh) {
		setTimeout(function() {
			console.log("now falling");
			mesh.setDamping(0.1, 1);
			mesh.applyCentralImpulse(new THREE.Vector3(0, -10, 0));
		}, 1500);
	}
}
