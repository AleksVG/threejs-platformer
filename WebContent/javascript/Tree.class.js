function Tree(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.createTree = function(geometry, materials) {
		var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "tree";
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);
	    mesh.receiveShadow = true;
	    mesh.castShadow = true;

	    mesh.boundingBox = new THREE.Box3().setFromObject(mesh);
	     
	    var soundSource = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial(0x000000));
	    soundSource.position.x = mesh.boundingBox.center().x;
	    soundSource.position.y = mesh.boundingBox.center().y;
	    soundSource.position.z = mesh.boundingBox.center().z;
	    
	    // Simulate bird chittering in trees
	    var birdSound = new THREE.Audio(self.gameObject.audioListener);
	    birdSound.load("sounds/birds-chirping.wav");
	    birdSound.setRefDistance(30);
	    birdSound.setLoop(true);
	    birdSound.setRolloffFactor(2);
	    
	    soundSource.add(birdSound);
	    self.gameObject.currentLevel.levelSounds.push(birdSound);
	    
	    self.gameObject.scene.add(soundSource);
	    self.gameObject.scene.add(mesh);
	}
}