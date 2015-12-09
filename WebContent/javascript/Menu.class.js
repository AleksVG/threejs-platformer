function Menu(gameObject) {
	this.gameObject = gameObject;
	
	var self = this;
	
	this.MenuListSize = 5;
	this.MenuList = {
			1:	{name: "btn_overworld", value: 1, btn: "multimedia/menu_overworld_1.png", btnselected: "multimedia/menu_overworld_2.png"},
			2:	{name: "btn_restart", value: 2, btn: "multimedia/menu_restart_1.png", btnselected: "multimedia/menu_restart_2.png"},
			3:	{name: "btn_settings", value: 3, btn: "multimedia/menu_settings_1.png", btnselected: "multimedia/menu_settings_2.png"}, 
			4:	{name: "btn_controls", value: 4, btn: "multimedia/menu_controls_1.png", btnselected: "multimedia/menu_controls_2.png"},
			5:	{name: "btn_about", value: 5, btn: "multimedia/menu_about_1.png", btnselected: "multimedia/menu_about_2.png"}
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
		
			createSprite(sprite.name, 269, 52, 1.0, false, 1.0, 0xffffff, texture, 200 +  (-1 * i * 70)); 
		 }
		
		self.menu_window = false;
		
		texture = "multimedia/menu_window_settings1.png"
		createSprite("window_settings", 940, 503, 1.0, false, 1.0, 0xffffff, texture, 0);
		setSpriteVisibility("window_settings", false);
		
		texture = "multimedia/menu_window_controls.png"
		createSprite("window_controls", 940, 503, 1.0, false, 1.0, 0xffffff, texture, 0);
		setSpriteVisibility("window_controls", false);
		
		texture = "multimedia/menu_window_about.png"
		createSprite("window_about", 940, 503, 1.0, false, 1.0, 0xffffff, texture, 0);
		setSpriteVisibility("window_about", false);
	}
	
	
	this.sendKeys = function (keyCode) {			

		if ( keyCode == self.gameObject.Key.ENTER ) {
			audio_sfx_menu_enter.play();
			

			if (self.menu_window == false) {
				setSpriteVisibility("btn_overworld", false);
				setSpriteVisibility("btn_restart", false);
				setSpriteVisibility("btn_settings", false);
				setSpriteVisibility("btn_controls", false);
				setSpriteVisibility("btn_about", false);
				switch (self.selectedMenuItem) {
					case 1: 
						audio_music_theme_menu.pause();
						self.gameObject.showMenu = false;
						self.gameObject.loadLevel(self.gameObject.Level.One);
						break;
					case 3: 
						self.menu_window = true;
						setSpriteVisibility("window_settings", true);
						break;
					case 4: 
						self.menu_window = true;
						setSpriteVisibility("window_controls", true);
						break;
					case 5: 
						self.menu_window = true;
						setSpriteVisibility("window_about", true);
						break;
				}
			} else {
				self.menu_window = false;
				setSpriteVisibility("btn_overworld", true);
				setSpriteVisibility("btn_restart", true);
				setSpriteVisibility("btn_settings", true);
				setSpriteVisibility("btn_controls", true);
				setSpriteVisibility("btn_about", true);
				setSpriteVisibility("window_settings", false);
				setSpriteVisibility("window_controls", false);
				setSpriteVisibility("window_about", false);
			}
			
			return;
		} 
				
		
		if ( self.menu_window == false ) {
			
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
				audio_sfx_menu_select.play();
				
				self.gameObject.sceneMenu.traverse( function( node ) {		    
				    if ( (node instanceof THREE.Sprite) && (node.name == oldSelectedItemName) )  {
				    	texture = self.MenuList[oldSelectedItemNumber].btn;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				    	setSpriteVisibility(node.name, true);
				    }
		
				    if ( (node instanceof THREE.Sprite) && (node.name == newSelectedItemName) )  {
						texture = self.MenuList[newSelectedItemNumber].btnselected;
				        node.material = createSpriteMaterial(node.name, false, 1.0, 0xffffff, texture);
				        setSpriteVisibility(node.name, true);
				    }
				} );
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