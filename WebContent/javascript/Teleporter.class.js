function Teleporter(gameObject, levelToLoad, positionX, positionY, positionZ) {
	this.gameObject = gameObject;
	this.levelToLoad = levelToLoad;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	
	var self = this;
	
	this.createTeleporter = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	    mesh.position.set (self.positionX, self.positionY, self.positionZ);
	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	    
		var pointLight = new THREE.PointLight(0x0000ff);
		pointLight.distance = 50;
		pointLight.intensity = 5;
		pointLight.position.x = mesh.boundingBox.center().x;
		pointLight.position.y = mesh.boundingBox.center().y;
		pointLight.position.z = mesh.boundingBox.center().z;
		self.gameObject.scene.add(pointLight);
		
	    
	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.gameObject.loadLevel(self.levelToLoad);
			}
	    });
	    
	    self.gameObject.scene.add(mesh);
	}
}