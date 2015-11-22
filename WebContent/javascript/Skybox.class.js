function Skybox(gameObject, positionX, positionY, positionZ) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	
	var self = this;
	
	this.createBasicSkyboxObject = function(geometry, materials) {
	    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ), 0);
	    
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	    
	    self.gameObject.scene.add(mesh);
	}
}