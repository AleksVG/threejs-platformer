function Hud(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	

	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, 0, 10 );
	

		texture = "models/player_heart.png"
		createSprite("heart_01", 525, 441, 1.0, false, 1.0, 0xffffff, texture, 0);
		//setSpriteVisibility("heart_01", false); 
	}
	
	
	function setSpriteVisibility(name, visibility) {
		var object = self.gameObject.sceneMenu.getObjectByName( name, true );
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
		
		sprite.position.set(window.innerWidth / 2, (window.innerHeight / 2) + position, -10);

		self.gameObject.sceneMenu.add(sprite);
	}
}