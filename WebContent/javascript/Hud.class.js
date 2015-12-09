function Hud(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	

	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, 0, 10 );
	
		for (i = 1; i <= 3; i++) { 
			texture = i <= self.gameObject.lives ? "multimedia/player_heart1.png" : "multimedia/player_heart2.png";
			createSprite("heart_" + i, 50, 44, 1.0, false, 1.0, 0xffffff, texture, 0, 50 * (i - 1));
		 }
		
		for (i = 1; i <= 3; i++) { 
			texture = i <= self.gameObject.keys ? "multimedia/player_key1.png" : "multimedia/player_key2.png";
			createSprite("key_" + i, 27, 44, 1.0, false, 1.0, 0xffffff, texture, 75, 50 * (i - 1));
		 }
	}
	
	this.update = function() {	
		for (i = 1; i <= 3; i++) {
			texture = i <= self.gameObject.lives ? "multimedia/player_heart1.png" : "multimedia/player_heart2.png";
			object = self.gameObject.sceneHud.getObjectByName( "heart_" + i, true );
			object.material = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		 }
		
		for (i = 1; i <= 3; i++) { 
			texture = i <= self.gameObject.keys ? "multimedia/player_key1.png" : "multimedia/player_key2.png";
			object = self.gameObject.sceneHud.getObjectByName( "key_" + i, true );
			object.material = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		 }
	}
	
	
	function setSpriteVisibility(name, visibility) {
		var object = self.gameObject.sceneHud.getObjectByName( name, true );
		object.visible = visibility;
	}
	
		
	function createSpriteMaterial(transparent, opacity, color, texture) {
		var spriteMaterial = new THREE.SpriteMaterial({
			transparent : transparent,
			opacity : opacity,
			color : color,
			map : THREE.ImageUtils.loadTexture(texture)
		});
		
		spriteMaterial.depthTest = false;
		
		if (transparent) spriteMaterial.blending = THREE.AdditiveBlending;
		
		return spriteMaterial;
	}
	
	function createSprite(name, scalex, scaley, scalez, transparent, opacity, color, texture, positionX, positionY) {
		var spriteMaterial = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		var sprite = new THREE.Sprite(spriteMaterial);
		
		sprite.scale.set(scalex, scaley, scalez);		
		
		sprite.name = name;
		
		sprite.position.set(window.innerWidth-scalex - positionX, (window.innerHeight) - scaley - positionY, -10);

		self.gameObject.sceneHud.add(sprite);
	}
}