function Platform(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;

	this.createBasicPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "basic_platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    self.gameObject.scene.add(mesh);
	}

	this.createSlipperyPlatformObject = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "slippery_platform";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    self.gameObject.scene.add(mesh);
	}
}

