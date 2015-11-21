function ModelLoader(scene) {
	this.scene = scene;
	this.platform = new Platform();
	this.playerAvatar = new PlayerAvatar();
	this.testEnemy = new MeleeEnemy();
}

ModelLoader.prototype.loadModels = function() {
	var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load("models/testingArea.js", this.platform.createBasicPlatformObject);
    jsonLoader.load("models/slipperyTestingArea.js", this.platform.createSlipperyPlatformObject);
    jsonLoader.load("models/testCube.js", this.playerAvatar.createAvatar);
    jsonLoader.load("models/testEnemy.js", this.testEnemy.createTestEnemy);
    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", createObject);
}

function createObject(geometry, materials) {
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ), 0);
    
    mesh.position.y = 14;
    var rotation = -75 * (Math.PI / 180);
    mesh.rotation.x = rotation;
    
    this.scene.add(mesh);
}
