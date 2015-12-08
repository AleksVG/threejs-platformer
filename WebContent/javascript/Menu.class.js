function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.MenuListSize = 3;
	this.MenuList = {
			1:	{name: "newgame", value: 1, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}, 
			2:	{name: "savegame", value: 2, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}, 
			3:	{name: "loadgame", value: 3, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}
	};
	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, -10, 10 );
	
		// Setting default selected menuitem
		self.selectedMenuItem = 1;

		for (i = 1; i <= self.MenuListSize; i++) { 
			var sprite = self.MenuList[i];

			if (sprite.name == self.MenuList[self.selectedMenuItem].name) {
				var texture = sprite.btnselected;
			} else {
				var texture = sprite.btn;
			}
			
			createSprite(sprite.name, 476, 90, 1.0, false, 1.0, 0xffffff, texture, -1 * i * 100); 
		 }
		
		texture = "models/menu_background.png"
		createSprite("controls", 586, 374, 1.0, false, 1.0, 0xffffff, texture, -400);
		
		texture = "models/menu_background.png"
		createSprite("about", 586, 374, 1.0, false, 1.0, 0xffffff, texture, -400);
	}
	
	
	this.test = function (keyCode) {	
		setSpriteVisibility("all", false);
		
		if (self.selectedMenuItem == null) {
			self.selectedMenuItem = 1;
		}
		
		var oldSelectedItemNumber = self.selectedMenuItem;
		var oldSelectedItemName = self.MenuList[self.selectedMenuItem].name;
		
		if ( keyCode == self.gameObject.Key.ENTER ) {
			audio_sfx_menu_enter.play();
			

			
			switch (oldSelectedItemNumber) {
				case 1: 
					self.gameObject.loadLevel(self.gameObject.Level.Overworld);
					break;
				case 2: 
					self.selectedMenuItem = null;
					setSpriteVisibility("controls", true);
					break;
				case 3: 
					self.selectedMenuItem = null;
					setSpriteVisibility("about", true);
					break;
			}
			
			
			return;
		} 
		
		if (self.selectedMenuItem != null) {
			if ( (self.MenuList[self.selectedMenuItem].value == 1) && (keyCode == self.gameObject.Key.UP_ARROW) ) {
				self.selectedMenuItem = self.MenuListSize;
			} else if ( (self.MenuList[self.selectedMenuItem].value == self.MenuListSize) && (keyCode == self.gameObject.Key.DOWN_ARROW) ) {
				self.selectedMenuItem = 1;
			} else if (keyCode == self.gameObject.Key.UP_ARROW) {
				self.selectedMenuItem = self.selectedMenuItem - 1; 
			} else if (keyCode == self.gameObject.Key.DOWN_ARROW) {
				self.selectedMenuItem = self.selectedMenuItem + 1; 
			}
			
	
			var newSelectedItemNumber = self.selectedMenuItem;
			var newSelectedItemName = self.MenuList[self.selectedMenuItem].name;
			
			if (oldSelectedItemNumber != newSelectedItemNumber){
				self.gameObject.sceneMenu.traverse( function( node ) {		    
				    if ( (node instanceof THREE.Sprite) && (node.name == oldSelectedItemName) )  {
				    	setSpriteVisibility(node.name, true);
				    	texture = self.MenuList[newSelectedItemNumber].btn;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				    }
		
				    if ( (node instanceof THREE.Sprite) && (node.name == newSelectedItemName) )  {
				    	setSpriteVisibility(node.name, true);
						texture = self.MenuList[newSelectedItemNumber].btnselected;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				    }
				} );
				
				audio_sfx_menu_select.play();
			}
		}
	}
	
	function setSpriteVisibility(name, visibility) {
		self.gameObject.sceneMenu.traverse( function( node ) {		    
		    if ( (node instanceof THREE.Sprite) && ( (node.name == name) || (name == "all") ) )  {
		    	node.visible = visibility;
		    }
		} );
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