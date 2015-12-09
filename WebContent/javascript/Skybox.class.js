function Skybox(gameObject, positionX, positionY, positionZ, skyboxType) {
	this.gameObject = gameObject;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.scale = 1;
	this.skyboxType = skyboxType;
	
	var self = this;
	
	this.createBasicSkyboxObject = function() {
		self.createBottom();
		self.createTop();
		self.createWallOne();
		self.createWallTwo();
		self.createWallThree();
		self.createWallFour();
	}
	
	self.createBottom = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_bottom.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_bottom.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(5000 * self.scale, 1, 5000 * self.scale);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(0, -2500 + self.positionY, 0);
	}
	
	self.createTop = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_top.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_top.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(5000 * self.scale, 1, 5000 * self.scale);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(0, 2500 + self.positionY, 0);
	}

	self.createWallOne = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_wall_1.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_wall_1.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(5000 * self.scale, 5000 * self.scale, 1);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(0, 0 + self.positionY, 2500);
	}
	
	self.createWallTwo = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_wall_2.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_wall_4.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(1, 5000 * self.scale, 5000 * self.scale);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(2500, 0 + self.positionY, 0);
	}
	
	self.createWallThree = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_wall_3.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_wall_3.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(5000 * self.scale, 5000 * self.scale, 1);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(0, 0 + self.positionY, -2500);
	}
	
	self.createWallFour = function() {
		if (self.skyboxType == "blue_sky")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/blue_sky/skybox_wall_4.png");
		else if (self.skyboxType == "sunset")
			var texture = THREE.ImageUtils.loadTexture("models/skyboxes/sunset/skybox_sunset_wall_2.png");
		
		var material = new THREE.MeshBasicMaterial();
		material.map = texture;
		material.fog = false;
		
		var geometry = new THREE.BoxGeometry(1, 5000 * self.scale, 5000 * self.scale);
		
		var mesh = new THREE.Mesh(geometry, material);
		self.gameObject.scene.add(mesh);
		
		mesh.position.set(-2500, 0 + self.positionY, 0);
	}
}