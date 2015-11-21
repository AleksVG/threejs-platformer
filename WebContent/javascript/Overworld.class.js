function Overworld(gameObject) {
	this.gameObject = gameObject;
	this.platform = new Platform(gameObject);
	this.playerAvatar = new PlayerAvatar(gameObject, 0, 50, 0);
	
	var self = this;
	
	Overworld.prototype.startLevel = function() {
		self.loadModels();
		
		// Wait for models to load
		setTimeout(function() {
			self.gameObject.playerAvatar = self.gameObject.scene.getObjectByName("playerAvatar");
		    self.setupCamera();
		    self.setupLights();
			self.gameObject.render();
		}, 500);
	}
	
	Overworld.prototype.loadModels = function() {
		var jsonLoader = new THREE.JSONLoader();
	    jsonLoader.load("models/levels/overworld/testingArea.js", this.platform.createBasicPlatformObject);
	    jsonLoader.load("models/levels/overworld/overworld_access_level_one.js", this.createTeleporter);
	    jsonLoader.load("models/skyboxes/blue_sky/skybox_blue_sky.js", this.createObject);
	    
	    self.playerAvatar.createAvatar();
	}
	
	this.createObject = function(geometry, materials) {
	    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ), 0);
	    
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	    
	    self.gameObject.scene.add(mesh);
	}
	
	this.createTeleporter = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    var rotation = -90 * (Math.PI / 180);
	    mesh.rotation.x = rotation;
	    
	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				gameObject.loadLevel("One");
			}
	    });
	    
	    self.gameObject.scene.add(mesh);
	}
	
	this.activate = function() {}
	
	
	
	
	this.setupCamera = function() {
	    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);

	    self.gameObject.scene.add(camera);
	    
	    camera.position.x = -100;
	    camera.position.y = 45;
	    camera.position.z = 30;
	    
	    camera.lookAt(self.gameObject.playerAvatar.position);
	    
	    self.gameObject.camera = camera;
	}

	this.setupLights = function() {
		var ambientLight = new THREE.AmbientLight(0xffffff);
		self.gameObject.scene.add(ambientLight);
		
	    var hemisphereLight = new THREE.HemisphereLight(0xc08439, 0x7bcfe5);
	    hemisphereLight.intensity = 0.95;
	    self.gameObject.scene.add(hemisphereLight);
	}
}