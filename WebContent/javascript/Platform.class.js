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
					self.playerAvatar.onGround = true;
					self.playerAvatar.setDamping(0.1, 1.0);
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	}
}
