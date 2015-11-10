function ModelLoader(scene) {
	this.scene = scene;
}

ModelLoader.prototype.loadModels = function() {
	var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load("models/testingArea.js", createPhysicsObject);
}

function createPhysicsObject(geometry, materials) {
    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
    
    correctFor3dsMaxRotation(mesh);
    this.scene.add(mesh);
}

function correctFor3dsMaxRotation(mesh) {
    var rotation = -90 * (Math.PI / 180);
    mesh.rotation.x = rotation;
}