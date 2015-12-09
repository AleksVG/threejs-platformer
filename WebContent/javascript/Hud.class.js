function Hud(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	

	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, 0, 10 );
	
		for (i = 1; i <= self.gameObject.lives; i++) { 
			texture = "models/player_heart.png"
			createSprite("heart_" + i, 50, 44, 1.0, false, 1.0, 0xffffff, texture, 50 * (i - 1));
		 }
		

		//setSpriteVisibility("heart_01", false); 
	}
	
	
	function setSpriteVisibility(name, visibility) {
		var object = self.gameObject.sceneHud.getObjectByName( name, true );
		object.visible = visibility;
	}
	
		
	function createSpriteMaterial(name, transparent, opacity, color, texture) {
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
	
	function createSprite(name, scalex, scaley, scalez, transparent, opacity, color, texture, position) {
		var spriteMaterial = createSpriteMaterial(name, false, 1.0, 0xffffff, texture);
		var sprite = new THREE.Sprite(spriteMaterial);
		
		sprite.scale.set(scalex, scaley, scalez);		
		
		sprite.name = name;
		
		sprite.position.set(window.innerWidth-scalex, (window.innerHeight) - scaley - position, -10);

		self.gameObject.sceneHud.add(sprite);
	}
}