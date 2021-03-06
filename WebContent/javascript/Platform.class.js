function Platform(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;

	this.createBasicPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    
	    mesh.receiveShadow = true;

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 2.5)) {
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
	    
	    mesh.type = "platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    mesh.receiveShadow = true;

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 2.5)) {
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.1, 1.0);
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	}
	
	this.createFallingPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 1000000);
	    
	    mesh.type = "platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    mesh.receiveShadow = true;
	    mesh.castShadow = true;

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.gameObject.playerAvatar.onGround = true;
				self.gameObject.playerAvatar.setDamping(0.98, 1.0);
				self.platformFall(mesh);
			}
			else if (other_object.type == "platform") {
				self.gameObject.scene.remove(mesh);
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	    mesh.setDamping(1, 1);
	}
	
	self.platformFall = function(mesh) {
		setTimeout(function() {
			mesh.setDamping(0.1, 1);
			mesh.applyCentralImpulse(new THREE.Vector3(0, -10, 0));
			audio_sfx_platform_falling.play();
			
			setTimeout(function() {
				self.gameObject.scene.remove(mesh);
			}, 3000);
		}, 800);
	}
	
	this.createBasicObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "object";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    
	    mesh.receiveShadow = true;
	    mesh.castShadow = true;

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 2.5)) {
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.98, 1.0);
					
					self.gameObject.playerAvatar.onMovingPlatform = false;
				}
			}
		});
	    
	    self.gameObject.scene.add(mesh);
	}
	
	this.createCustomPlatform = function(positionX, positionY, positionZ, width, length, height, texture, repeatS, repeatT) {
		var texture = THREE.ImageUtils.loadTexture(texture);
		var material = new THREE.MeshPhongMaterial();
		material.map = texture;
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set(repeatS, repeatT);
		material.fog = true;
		
		var geometry = new THREE.BoxGeometry(length, height, width);
		
		var mesh = new Physijs.ConvexMesh(geometry, material, 0);
		
		mesh.position.set(positionX, positionY, positionZ);
		
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    
	    mesh.receiveShadow = true;
		
		mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar" && !self.gameObject.playerAvatar.onGround) {
				if (self.gameObject.playerAvatar.getBottomCollisionPointY() > (mesh.boundingBox.max.y - 2.5)) {
					self.gameObject.playerAvatar.onGround = true;
					self.gameObject.playerAvatar.setDamping(0.98, 1.0);
					
					self.gameObject.playerAvatar.onMovingPlatform = false;
				}
			}
		});
		
		self.gameObject.scene.add(mesh);
	}
}
