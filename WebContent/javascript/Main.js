function main() {
	var renderer = setupRenderer();
	
	Physijs.scripts.worker = 'libraries/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';
	
	var gameObject = new GameObject(renderer);
	gameObject.setupInput();
	gameObject.loadLevel(gameObject.Level.Overworld);
}

function setupRenderer() {
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    
    return renderer;
}
