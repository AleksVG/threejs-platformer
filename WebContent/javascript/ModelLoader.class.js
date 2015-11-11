function ModelLoader(scene) {
	this.scene = scene;
}

ModelLoader.prototype.loadModels = function() {
	var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load("models/testingArea.js", createBasicPlatformObject);
    jsonLoader.load("models/testCube.js", createTestCube);
}

function correctFor3dsMaxRotation(mesh) {
    var rotation = -90 * (Math.PI / 180);
    mesh.rotation.x = rotation;
}

function createBasicPlatformObject(geometry, materials) {
    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
    
    mesh.type = "basic_platform";
    
    correctFor3dsMaxRotation(mesh);
    this.scene.add(mesh);
}

function createTestCube(geometry, materials) {
    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
    
    mesh.name = "testCube";
    correctFor3dsMaxRotation(mesh);
    this.scene.add(mesh);

	mesh.setAngularFactor(new THREE.Vector3(0, 1, 0));
}
