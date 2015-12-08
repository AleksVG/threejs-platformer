function main() {
	var renderer = setupRenderer();

	//audiobackgroundmusic = new Sound("backgroundmusic", 'multimedia/theme.mp3', false);
	audio_sfx_menu_enter = new Sound("audio_sfx_menu_enter", 'sounds/menu_enter.wav', false);
	audio_sfx_menu_select = new Sound("audio_sfx_menu_select", 'sounds/menu_select.wav', false);
	audio_music_theme_menu = new Sound("audio_music_theme_menu", 'multimedia/theme_menu.mp3', false);
	audio_music_theme_overworld = new Sound("audio_music_theme_overworld", 'multimedia/theme_overworld.mp3', false);
	audio_music_theme_level1 = new Sound("audio_music_theme_level1", 'multimedia/theme_level1.mp3', false);
	audio_music_theme_level2 = new Sound("audio_music_theme_level2", 'multimedia/theme_level2.mp3', false);
	audio_sfx_stepgrass = new Sound("audio_sfx_stepgrass", 'sounds/step_grass.wav', false);
	audio_sfx_jump = new Sound("audio_sfx_jump", 'sounds/jump.wav', false);
	audio_sfx_cannon = new Sound("audio_sfx_cannon", 'sounds/cannon.wav', false);
	audio_sfx_player_die = new Sound("audio_sfx_player_die", 'sounds/player_die.wav', false);
	audio_sfx_enemy_attack = new Sound("audio_sfx_enemy_attack", 'sounds/enemy_attack.wav', false);
	audio_sfx_enemy_die = new Sound("audio_sfx_enemy_die", 'sounds/enemy_die.wav', false);
	audio_sfx_key_take = new Sound("audio_sfx_key_take", 'sounds/key_take.wav', false);
	audio_sfx_platform_falling = new Sound("audio_sfx_platform_falling", 'sounds/platform_falling.wav', false);
	audio_sfx_player_stepgrass = new Sound("audio_sfx_player_stepgrass", 'sounds/player_stepgrass.wav', false);

	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';
	
	var gameObject = new GameObject(renderer);
	gameObject.camera = new Camera(gameObject);
	
	gameObject.menu = new Menu(gameObject);
	gameObject.camera.setupInput();

	gameObject.loadLevel(gameObject.Level.Overworld);
	
	// Uncomment for debug mode (use OrbitControls to traverse levels)
	//useDebugMode(gameObject, renderer);
	
	// Wait for level to load
	setTimeout(function() {
		gameObject.render();
	}, 1200);
}

function setupRenderer() {
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    
    return renderer;
}

function useDebugMode(gameObject, renderer) {
	var controls = new THREE.OrbitControls(gameObject.camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	
	gameObject.usingDebugMode = true;
	gameObject.debugControls = controls;
}
