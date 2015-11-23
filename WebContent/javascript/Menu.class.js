function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.initialize = function() {	
		//TODO: Defining ORTHOCAMERA
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, -10, 10 );
		//self.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
		self.gameObject.sceneMenu.add(self.camera);
		createSprite1(p_size, p_transparent, p_opacity, p_color, p_sprite); 
	}
	
	
	var imageNo=0;
	var interval=0;
	var p_size = 50;
	var p_transparent = true;
	var p_opacity = 0.6;
	var p_color = 0xffffff;
	var p_sprite = 0;
	
	
	function getTexture() {
		  var texture = new THREE.ImageUtils.loadTexture("models/menu_background.png");
		  return texture;
		}
	
	function createSprite1(size, transparent, opacity, color, spriteNumber) {
		var spriteMaterial = new THREE.SpriteMaterial({
			opacity : opacity,
			color : color,
			transparent : transparent,
			map : getTexture()
		});

		// we have 1 row, with five sprites
//		spriteMaterial.map.offset = new THREE.Vector2(0, 0);
//		spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
//		spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
		spriteMaterial.depthTest = false;

		spriteMaterial.blending = THREE.AdditiveBlending;

		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(586, 285, 1.0);
		
		// Y = height
		sprite.position.set(window.innerWidth / 2, window.innerHeight / 2, -10);
		sprite.velocityX = 5;

		self.gameObject.sceneMenu.add(sprite);
	}
	
	this.update = function update(elapsed) {
//		interval+=elapsed;
//		if (interval>=.2) {
//			p_sprite+=1;
//			p_sprite=p_sprite%5;
//			interval=0;
//		}

		self.gameObject.sceneMenu.children.forEach(function (e) {
	        if (e instanceof THREE.Sprite) {
	            // move the sprite along the bottom
	            //e.position.x = e.position.x + e.velocityX;
	            //e.material.map.offset = new THREE.Vector2(0.2 * p_sprite, 0);
//	            if (e.position.x > window.innerWidth) {
//	                e.velocityX = -5;
//	                //e.material.map.offset = new THREE.Vector2(0.2 * p_sprite, 0); //.set(1 / 5 * (p_sprite % 4), 0);
//	            }
//	            if (e.position.x < 0) {
//	                e.velocityX = 5;
//	            }
	        }
	    });
	}
}