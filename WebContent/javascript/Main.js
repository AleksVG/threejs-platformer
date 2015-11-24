function main() {
	var renderer = setupRenderer();
	
	//var myAudio = document.getElementById("backgroundmusic");
	//myAudio.play();
	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';
	
	var gameObject = new GameObject(renderer);
	gameObject.camera = new Camera(gameObject);
	
	gameObject.menu = new Menu(gameObject);
	gameObject.camera.setupInput();

	gameObject.loadLevel(gameObject.Level.Overworld);
	
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
