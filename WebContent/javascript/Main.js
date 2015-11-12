currentlyPressedKeys = {};
keys = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32};
onGround = true;
speed = 80;

function main() {
	setupRenderer();
	setupKeys();
	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -80, 0));
    
	loadModels();

	setTimeout(continueAfterLoading, 2000);
}

function continueAfterLoading() {
	//setupTestCube();
    testCube = scene.getObjectByName("testCube");
    
	camera = setupCamera(perspectiveView = true);
	scene.add(camera);
	
	controls = setupControls();
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
            5,
            0.01);
            
	testCube = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5, 5), testCubeMaterial, 15);

	testCube.position.y = 30;
	
	testCube.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
		if (other_object.type == "basic_platform")
			onGround = true;
	});
	
	scene.add(testCube);
	testCube.setAngularFactor(new THREE.Vector3(0, 0, 0));
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
	}
	
	if (currentlyPressedKeys[keys.D]) {
		moveRightInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.S]) {
		moveBackwardInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.W]) {
		moveForwardInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.SPACEBAR]) {
		jump();
	}
}

function moveLeftInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);
	
	// http://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
	var newX = (vector.x * Math.cos(Math.PI/2)) + (vector.z * Math.sin(Math.PI/2));
	var newZ = (-vector.x * Math.sin(Math.PI/2)) + (vector.z * Math.cos(Math.PI/2));
	
	vector = new THREE.Vector3(newX, vector.y, newZ);
	
	if (!isOverTopSpeed(testCube))
		testCube.applyCentralImpulse(vector);
}

function moveRightInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);
	
	// http://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
	var newX = (vector.x * Math.cos(-Math.PI/2)) + (vector.z * Math.sin(-Math.PI/2));
	var newZ = (-vector.x * Math.sin(-Math.PI/2)) + (vector.z * Math.cos(-Math.PI/2));
	
	vector = new THREE.Vector3(newX, vector.y, newZ);
	
	if (!isOverTopSpeed(testCube))
		testCube.applyCentralImpulse(vector);
}

function moveForwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);

	if (!isOverTopSpeed(testCube))
		testCube.applyCentralImpulse(vector);
}

function moveBackwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);
	vector = new THREE.Vector3(-vector.x, -vector.y, -vector.z);
	
	if (!isOverTopSpeed(testCube))
		testCube.applyCentralImpulse(vector);
}

function isOverTopSpeed(object) {
	var currentVelocity = object.getLinearVelocity();
	var topSpeed = 80;
	var currentVelocityMagnitude = Math.sqrt(Math.pow(currentVelocity.x, 2) + Math.pow(currentVelocity.y, 2) + Math.pow(currentVelocity.x, 2));
	
	if (currentVelocityMagnitude > topSpeed)
		return true;
	else
		return false;
}

function jump() {
	if (onGround) {
		testCube.applyCentralImpulse(new THREE.Vector3(0, 600, 0));
		onGround = false;
	}
}



