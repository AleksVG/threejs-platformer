function Teleporter(gameObject, levelToLoad, positionX, positionY, positionZ) {
	this.gameObject = gameObject;
	this.levelToLoad = levelToLoad;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	
	var self = this;
	
	/*
	 * Should be able to place teleporter where we want, and maybe have some particle effect 
	 * on the teleporter.
	 */
	
	this.createTeleporter = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	    mesh.position.set (self.positionX, self.positionY, self.positionZ);
	    
	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.gameObject.loadLevel(self.levelToLoad);
			}
	    });
	    
	    self.gameObject.scene.add(mesh);
	}
}