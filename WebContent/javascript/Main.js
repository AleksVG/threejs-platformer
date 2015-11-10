currentlyPressedKeys = {};
keys = {A: 65, S: 83, D: 68, W: 87};

function main() {
	setupRenderer();
	setupKeys();
	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -20, 0));

	setupTestCube();
	
	camera = setupCamera(perspectiveView = true);
	scene.add(camera);
	
	controls = setupControls();
	loadModels();
	setupLights();
    render();
}

function setupTestCube() {
	var testCubeMaterial = Physijs.createMaterial(
			new THREE.MeshPhongMaterial(
                    {
                        color: 0x000000,
                        ambient: 0x000000,
                        specular: 0x000000}),
            2,
            0.01);
            
	testCube = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5, 5), testCubeMaterial, 15);

	testCube.position.y = 30;
	
	scene.add(testCube);
	testCube.setAngularFactor(new THREE.Vector3(0, 1, 0));
}

function setupKeys() {
	document.addEventListener('keyup', handleKeyUp, false);
	document.addEventListener('keydown', handleKeyDown, false);
}

function handleKeyDown(event) {
	currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
	currentlyPressedKeys[event.keyCode] = false;
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
}

function setupCamera(perspectiveView) {
	if (perspectiveView) {
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        
        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 45;
        camera.position.z = 30;
        camera.lookAt(testCube);
	}
    
    return camera;
}

function setupControls() {
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.userRotateSpeed = 0.5;
	controls.center = testCube.position;
	controls.minDistance = 50;
	controls.maxDistance = 50;
	
	return controls;
}

function loadModels() {
	var modelLoader = new ModelLoader(scene);
	modelLoader.loadModels();
}

function setupLights() {
	var ambientLight = new THREE.AmbientLight(0x323232);
	scene.add(ambientLight);
	
    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
    hemisphereLight.intensity = 0.8;
    scene.add(hemisphereLight);
}

function render() {
    controls.update();
    handleKeys();
    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    scene.simulate();
}

function handleKeys() {
	
	if (currentlyPressedKeys[keys.A]) {
		moveLeftInRelationToView();
		//testCube.setLinearVelocity(new THREE.Vector3(-30, 0, 0));
	}
	
	if (currentlyPressedKeys[keys.D]) {
		//testCube.setLinearVelocity(new THREE.Vector3(30, 0, 0));
	}
	
	if (currentlyPressedKeys[keys.S]) {
		moveBackwardInRelationToView();
		//testCube.setLinearVelocity(new THREE.Vector3(0, 0, 30));
	}
	
	if (currentlyPressedKeys[keys.W]) {
		moveForwardInRelationToView();
		//testCube.setLinearVelocity(new THREE.Vector3(0, 0, -30));
	}
}

function moveLeftInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(20 * vector.x, 0, 20 * vector.z);
	
	testCube.setLinearVelocity(vector);
}

function moveForwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(20 * vector.x, 0, 20 * vector.z);
	console.log(camera.zoom);
	testCube.setLinearVelocity(vector);
}

function moveBackwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(20 * vector.x, 0, 20 * vector.z);
	vector = new THREE.Vector3(-vector.x, -vector.y, -vector.z);
	
	testCube.setLinearVelocity(vector);
}



