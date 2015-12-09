// FallCatcher is an object below the levels which catches the player and other objects that falls off a platform

function FallCatcher(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.createFallCatcher = function(geometry, materials) {
	    var mesh = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
	    
	    mesh.type = "fall_catcher";
	    mesh._physijs.collision_flags = 4;
	    mesh.visible = false;
	    
	    self.gameObject.correctFor3dsMaxRotation(mesh);

	    mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			if (other_object.name == "playerAvatar") {
				self.gameObject.loadLevel(self.gameObject.currentLevelType);
				self.gameObject.playerAvatar.damage(1);
			}
			else
				other_object.deactivate();
		});
	    
	    self.gameObject.scene.add(mesh);
	}
}