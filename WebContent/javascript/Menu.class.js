function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.MenuListSize = 3;
	this.MenuList = {
			1:	{name: "btn_newgame", value: 1, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}, 
			2:	{name: "btn_controls", value: 2, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}, 
			3:	{name: "btn_about", value: 3, btn: "models/menu_btn_newgame.png", btnselected: "models/menu_btn_newgame_selected.png"}
	};
	
	this.initialize = function() {	
		self.camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, 0, 10 );
	
		// Setting default selected menuitem
		self.selectedMenuItem = 1;

		for (i = 1; i <= self.MenuListSize; i++) { 
			var sprite = self.MenuList[i];

			if (sprite.name == self.MenuList[self.selectedMenuItem].name) {
				var texture = sprite.btnselected;
			} else {
				var texture = sprite.btn;
			}
			
			createSprite(sprite.name, 476, 90, 1.0, false, 1.0, 0xffffff, texture, 200 +  (-1 * i * 100)); 
		 }
		
		texture = "controls_explanation.png"
		createSprite("window_controls", 586, 374, 1.0, false, 1.0, 0xffffff, texture, 0);
		setSpriteVisibility("window_controls", false);
		
		texture = "models/menu_background.png"
		createSprite("window_about", 600, 413, 1.0, false, 1.0, 0xffffff, texture, 0);
		setSpriteVisibility("window_about", false);
	}
	
	
	this.test = function (keyCode) {			

		if ( keyCode == self.gameObject.Key.ENTER ) {
			audio_sfx_menu_enter.play();
			

			if (self.selectedMenuItem != null) {
				setSpriteVisibility("btn_newgame", false);
				setSpriteVisibility("btn_controls", false);
				setSpriteVisibility("btn_about", false);
				switch (self.selectedMenuItem) {
					case 1: 
						audio_music_theme_menu.pause();
						self.gameObject.loadLevel(self.gameObject.Level.Overworld);
						break;
					case 2: 
						self.selectedMenuItem = null;
						setSpriteVisibility("window_controls", true);
						break;
					case 3: 
						self.selectedMenuItem = null;
						setSpriteVisibility("window_about", true);
						break;
				}
			} else {
				self.selectedMenuItem = 1;
				setSpriteVisibility("btn_newgame", true);
				setSpriteVisibility("btn_controls", true);
				setSpriteVisibility("btn_about", true);
				setSpriteVisibility("window_controls", false);
				setSpriteVisibility("window_about", false);
			}
			
			return;
		} 
				
		
		if ( self.selectedMenuItem != null ) {
			
			var oldSelectedItemNumber = self.selectedMenuItem;
			var oldSelectedItemName = self.MenuList[self.selectedMenuItem].name;
			
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
				    	texture = self.MenuList[newSelectedItemNumber].btn;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				    	setSpriteVisibility(node.name, true);
				    }
		
				    if ( (node instanceof THREE.Sprite) && (node.name == newSelectedItemName) )  {
						texture = self.MenuList[newSelectedItemNumber].btnselected;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				        setSpriteVisibility(node.name, true);
				    }
				} );
				
				audio_sfx_menu_select.play();
			}
		}
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