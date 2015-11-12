function Platform() {
	this.createBasicPlatformObject = createBasicPlatformObject;
	this.createSlipperyPlatformObject = createSlipperyPlatformObject;
}

function correctFor3dsMaxRotation(mesh) {
    var rotation = -90 * (Math.PI / 180);
    mesh.rotation.x = rotation;
}

function createBasicPlatformObject(geometry, materials) {
    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
    
    mesh.type = "basic_platform";
    
    correctFor3dsMaxRotation(mesh);
    scene.add(mesh);
}

function createSlipperyPlatformObject(geometry, materials) {
    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
    
    mesh.type = "slippery_platform";
    
    correctFor3dsMaxRotation(mesh);
    scene.add(mesh);
}