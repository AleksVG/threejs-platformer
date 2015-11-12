speed = 80;
    
function PlayerAvatar(modelLoader) {
	this.createAvatar = createAvatar;
}

function correctFor3dsMaxRotation(playerAvatar) {
    var rotation = -90 * (Math.PI / 180);
    playerAvatar.rotation.x = rotation;
}

function createAvatar(geometry, materials) {
    playerAvatar = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 15);
    
    playerAvatar.onGround = true;	
	playerAvatar.position.y = 20;
    playerAvatar.name = "playerAvatar";
    attachMethods(playerAvatar);
    
    correctFor3dsMaxRotation(playerAvatar);
    scene.add(playerAvatar);

	playerAvatar.setAngularFactor(new THREE.Vector3(0, 1, 0));
}

function attachMethods(playerAvatar) {
	playerAvatar.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
		if (other_object.type == "basic_platform") {
		    playerAvatar.setDamping(0.99, 1.0);
			playerAvatar.onGround = true;
		}
		else if (other_object.type == "slippery_platform") {
		    playerAvatar.setDamping(0.1, 1.0);
			playerAvatar.onGround = true;
		}
	});
	
	playerAvatar.moveLeftInRelationToView = moveLeftInRelationToView;
	playerAvatar.moveRightInRelationToView = moveRightInRelationToView;
	playerAvatar.moveForwardInRelationToView = moveForwardInRelationToView;
	playerAvatar.moveBackwardInRelationToView = moveBackwardInRelationToView;
	playerAvatar.jump = jump;
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
	
	if (!isOverTopSpeed(playerAvatar))
		playerAvatar.applyCentralImpulse(vector);
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
	
	if (!isOverTopSpeed(playerAvatar))
		playerAvatar.applyCentralImpulse(vector);
}

function moveForwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);

	if (!isOverTopSpeed(playerAvatar))
		playerAvatar.applyCentralImpulse(vector);
}

function moveBackwardInRelationToView() {
	// http://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking
	var vector = new THREE.Vector3(0, 0, -1);
	vector.applyQuaternion(camera.quaternion);
	vector = new THREE.Vector3(speed * vector.x, 0, speed * vector.z);
	vector = new THREE.Vector3(-vector.x, -vector.y, -vector.z);
	
	if (!isOverTopSpeed(playerAvatar))
		playerAvatar.applyCentralImpulse(vector);
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
	if (playerAvatar.onGround) {
		playerAvatar.applyCentralImpulse(new THREE.Vector3(0, 600, 0));
		playerAvatar.onGround = false;
	}
}