function Key(gameObject, positionX, positionY, positionZ, name) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.name = name;
	
	var self = this;
	
	this.createKey = function() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("models/key/key.js", self.loadKey);
	}
	
	this.loadKey = function(geometry, materials) {
		var keyMaterial = self.createKeyMaterial();
		
	    self.key = new Physijs.ConvexMesh(geometry, keyMaterial, 0);
	    
	    self.key.type = "key";
	    self.key.name = self.name;
	    
	    self.key.position.x = self.positionX;
	    self.key.position.y = self.positionY;
	    self.key.position.z = self.positionZ;
		
		self.key.receiveShadow = true;
		self.key.castShadow = true;
	    
	    self.gameObject.correctFor3dsMaxRotation(self.key);
	    self.gameObject.scene.add(self.key);
	    
	    self.addEventListeners();
	}
	
	this.createKeyMaterial = function() {
		var keyMaterial = Physijs.createMaterial(
				new THREE.MeshPhongMaterial( {
	                        color: 0xdfc146,
	                        ambient: 0x000000,
	                        emissive: 0x666666,
	                        specular: 0xffffff,
	                        shininess: 100,
	                        metal: true,
	                        opacity: 1,
	                        transparent: false
	                    }),
	            0.01,
	            0.01);
		
		return keyMaterial;
	}
	
	this.addEventListeners = function() {
		self.key.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.deactivate();
				self.gameObject.scene.remove(self.key);
				self.gameObject.levelKeys[self.name] = true;
				self.gameObject.totalNumberOfKeys += 1;
				self.gameObject.keys += 1;
				self.gameObject.hud.update();
				audio_sfx_key_take.play();
				console.log("key picked up: " + self.gameObject.levelKeys[self.name]);
			}
		});
	}
	
	this.activate = function() {
		self.activateInterval = setInterval(function() {
			self.key.__dirtyRotation = true;
			self.key.rotation.z += 0.01;
		}, 20);
	}
	
	this.deactivate = function() {
		clearInterval(self.activateInterval);
	}
}