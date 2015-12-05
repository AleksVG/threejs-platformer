function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.MenuListSize = 4;
	this.MenuList = {
			1:	{name: "newgame", value: 1}, 
			2:	{name: "savegame", value: 2}, 
			3:	{name: "loadgame", value: 3}, 
			4:	{name: "exitgame", value: 4}
	};
	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, -10, 10 );
			
		self.selectedMenuItem = 1;
		
		texture = "models/menu_btn_newgame.png";
		createSprite("newgame", 476, 90, 1.0, false, 1.0, 0xffffff, texture, 0); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("savegame", 476, 90, 1.0, false, 1.0, 0xffffff, texture, -100); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("loadgame", 476, 90, 1.0, false, 1.0, 0xffffff, texture, -200); 
		
		texture = "models/menu_btn_newgame.png";
		createSprite("exitgame", 476, 90, 1.0, false, 1.0, 0xffffff, texture, -300); 
	}
	
	
	this.test = function () {	
		var oldSelectedItemName = this.MenuList[self.selectedMenuItem].name;
		
		if (this.MenuList[self.selectedMenuItem].value == 4) {
			self.selectedMenuItem = 1;
		} else {
			self.selectedMenuItem = self.selectedMenuItem + 1; 
		}
		
//		alert(self.selectedMenuItem + " " + this.MenuList[self.selectedMenuItem].name);
//		alert("nisse" );
		var newSelectedItemName = this.MenuList[self.selectedMenuItem].name;
		self.gameObject.sceneMenu.traverse( function( node ) {
		    if ( (node instanceof THREE.Sprite) && (node.name == newSelectedItemName) )  {
				texture = "models/menu_btn_newgame_selected.png";
		        node.material = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		    }
		    
		    if ( (node instanceof THREE.Sprite) && (node.name == oldSelectedItemName) )  {
				texture = "models/menu_btn_newgame.png";
		        node.material = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		    }

		} );
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
	
	function createSprite(name, scalex, scaley, scalez, transparent, opacity, color, texture, position) {
		var spriteMaterial = createSpriteMaterial(false, 1.0, 0xffffff, texture);
		var sprite = new THREE.Sprite(spriteMaterial);
		
		sprite.scale.set(scalex, scaley, scalez);		
		
		sprite.name = name;
		
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