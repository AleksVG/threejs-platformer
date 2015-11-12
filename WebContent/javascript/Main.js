currentlyPressedKeys = {};
keys = {A: 65, S: 83, D: 68, W: 87, SPACEBAR: 32};

function main() {
	setupRenderer();
	setupKeys();
	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -80, 0));
    
	loadModels();

	setTimeout(continueAfterLoading, 500);
}

function continueAfterLoading() {
    playerAvatar = scene.getObjectByName("playerAvatar");
    
	camera = setupCamera(perspectiveView = true);
	scene.add(camera);
	
	controls = setupControls();
	setupLights();
    render();
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
        camera.lookAt(playerAvatar);
	}
    
    return camera;
}

function setupControls() {
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.userRotateSpeed = 0.5;
	controls.center = playerAvatar.position;
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
		playerAvatar.moveLeftInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.D]) {
		playerAvatar.moveRightInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.S]) {
		playerAvatar.moveBackwardInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.W]) {
		playerAvatar.moveForwardInRelationToView();
	}
	
	if (currentlyPressedKeys[keys.SPACEBAR]) {
		playerAvatar.jump();
	}
}



