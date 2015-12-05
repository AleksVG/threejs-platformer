function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.initialize = function() {	
		//TODO: Defining ORTHOCAMERA
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, -10, 10 );
		
		//texture = "models/menu_background.png";
		//createSprite(586, 485, 1.0, false, 1.0, 0xffffff, texture, 0); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("new", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 0); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("save", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 100); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("load", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 200); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("exit", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 300); 
	}
	
	
	this.test = function () {	
		texture = "models/menu_btn_newgame.png";
		createSprite("exit", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 300); 
		
		self.gameObject.sceneMenu.traverse( function( node ) {

		    if ( node instanceof THREE.Sprite ) {
				texture = "models/menu_btn_newgame_selected.png";
		        node.material = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		        alert(node);
		    }

		} );
	}
	
	
	function getTexture(texture) {
		  var texture = new THREE.ImageUtils.loadTexture(texture);
		  return texture;
		}
	
	function createSpriteMaterial(transparent, opacity, color, texture) {
		var spriteMaterial = new THREE.SpriteMaterial({
			transparent : transparent,
			opacity : opacity,
			color : color,
			map : getTexture(texture)
		});
		
		return spriteMaterial;
	}
	
	function createSprite(name, scalex, scaley, scalez, transparent, opacity, color, texture, position) {
		var spriteMaterial = new THREE.SpriteMaterial({
			transparent : transparent,
			opacity : opacity,
			color : color,
			map : getTexture(texture)
		});

		spriteMaterial.depthTest = false;

		if (transparent)
			spriteMaterial.blending = THREE.AdditiveBlending;

		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(scalex, scaley, scalez);		
		
		sprite.name = name;
		
		
		// Y = height
		sprite.position.set(window.innerWidth / 2, window.innerHeight / 2 + position, -10);

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