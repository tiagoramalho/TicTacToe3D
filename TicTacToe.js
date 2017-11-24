//////////////////////////////////////////////////////////////////////////////
//
//  TicTacToe.js 
//
//  Adapted from WebGl_example28.js, by professor J.Madeira 
//
//-------------------------------------------------------------------------
//
// Global Variables
//

var matrixGlobal; 

var gl = null; // WebGL context

var shaderProgram = null; 

// NEW --- Buffers

var cubeVertexPositionBuffer = null;

var cubeVertexIndexBuffer = null;

var cubeVertexTextureCoordBuffer;

// The global transformation parameters

// The translation vector

var pixels;

var tx = 0.0;

var ty = 0.0;

var tz = 0.0;

// The GLOBAL transformation parameters

var globalAngleYY = 0.0;

var globalAngleXX = 0.0;

var globalTz = 0;

// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

// The scaling factors

var sx = 0.25;

var sy = 0.25;

var sz = 0.25;

// NEW - Animation controls

var rotationXX_ON = 0;

var rotationXX_DIR = 1;

var rotationXX_SPEED = 1;
 
var rotationYY_ON = 0;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 1;
 
var rotationZZ_ON = 0;

var rotationZZ_DIR = 1;

var rotationZZ_SPEED = 1;

var cube_array;

var player = "ramalho";


 // NEW - GLOBAL Animation controls

var globalRotationYY_ON = 0;

var globalRotationYY_DIR = 1;

var globalRotationYY_SPEED = 1;
// To allow choosing the way of drawing the model triangles

var primitiveType = null;
 
// From learningwebgl.com

// NEW --- Storing the vertices defining the cube faces
var debug = true;
vertices = [
            // Front face
            -0.35, -0.35,  0.35,
             0.35, -0.35,  0.35,
             0.35,  0.35,  0.35,
            -0.35,  0.35,  0.35,

            // Back face
            -0.35, -0.35, -0.35,
            -0.35,  0.35, -0.35,
             0.35,  0.35, -0.35,
             0.35, -0.35, -0.35,

            // Top face
            -0.35,  0.35, -0.35,
            -0.35,  0.35,  0.35,
             0.35,  0.35,  0.35,
             0.35,  0.35, -0.35,

            // Bottom face
            -0.35, -0.35, -0.35,
             0.35, -0.35, -0.35,
             0.35, -0.35,  0.35,
            -0.35, -0.35,  0.35,

            // Right face
             0.35, -0.35, -0.35,
             0.35,  0.35, -0.35,
             0.35,  0.35,  0.35,
             0.35, -0.35,  0.35,

            // Left face
            -0.35, -0.35, -0.35,
            -0.35, -0.35,  0.35,
            -0.35,  0.35,  0.35,
            -0.35,  0.35, -0.35
];

// Texture coordinates for the quadrangular faces

// Notice how they are assigne to the corresponding vertices

var textureCoords = [

          // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

          // Back face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          // Top face
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,

          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,

          // Right face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          // Left face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
];

// Vertex indices defining the triangles
        
var cubeVertexIndices = [

            0, 1, 2,      0, 2, 3,    // Front face

            4, 5, 6,      4, 6, 7,    // Back face

            8, 9, 10,     8, 10, 11,  // Top face

            12, 13, 14,   12, 14, 15, // Bottom face

            16, 17, 18,   16, 18, 19, // Right face

            20, 21, 22,   20, 22, 23  // Left face
];

var game_matrix = new Array();

for (var i = 0; i < 3; i++) {
	game_matrix[i]=new Array();
	for (var j = 0; j < 3; j++) {
		game_matrix[i][j]=new Array();
		for (var k = 0; k < 3; k++) {
			game_matrix[i][j][k] = 0;
		}
	}
}


function evaluate_win(){

	// TEsta LINHAS

	var winner = false;



	for (var i = 0; i < game_matrix.length; i++) {
		for (var j = 0; j < game_matrix[i].length; j++) {
			for (var k = 0; k < game_matrix[i][j].length; k++) {
				if (game_matrix[i][j][0] != 0 && game_matrix[i][j][k] == game_matrix[i][j][0]){
					//console.log(game_matrix[i][j][k]);
					if(k == game_matrix[i][j].length-1)
						winner = game_matrix[i][j][k];
				}

				else
					break
			}
		}
	}

	if (winner != false){
		console.log("1");
		return winner;
	}


	

	for (var i = 0; i < game_matrix.length; i++) {
		for (var j = 0; j < game_matrix[i].length; j++) {
			for (var k = 0; k < game_matrix[i][j].length; k++) {
				if (game_matrix[i][0][k] != 0 && game_matrix[i][j][k] == game_matrix[i][0][k])
					if(j == game_matrix[i][j].length-1)
						winner = game_matrix[i][j][k];
				else
					break
			}
		}
	}
	if (winner != false){
		console.log("2");
		return winner;
	}




	for (var i = 0; i < game_matrix.length; i++) {
		for (var j = 0; j < game_matrix[i].length; j++) {
			for (var k = 0; k < game_matrix[i][j].length; k++) {
				if (game_matrix[0][j][k] != 0 && game_matrix[i][j][k] == game_matrix[0][j][k])
					if(i == game_matrix[i][j].length-1)
						winner = game_matrix[i][j][k];
				else
					break
			}
		}
	}
	if (winner != false){
		console.log("3");
		return winner;
	}
	
	for (var i = 0; i < game_matrix.length; i++) {
		if (game_matrix[0][0][i] != 0 && game_matrix[0][0][i] ==  game_matrix[1][1][i] && game_matrix[1][1][i] == game_matrix[2][2][i]){
			winner = game_matrix[0][0][i];
			break;
		}

		if (game_matrix[2][0][i] != 0 && game_matrix[2][0][i] ==  game_matrix[1][1][i] && game_matrix[1][1][i] == game_matrix[0][2][i]){
			winner = game_matrix[2][0][i];
			break;
		}
		
	}
	if (winner != false){
		console.log("4");
		return winner;
	}
	
	/*
	for (var i = 0; i < game_matrix.length; i++) {
		if (game_matrix[2][0][i] != 0 && game_matrix[2][0][i] ==  game_matrix[1][1][i] && game_matrix[1][1][i] == game_matrix[0][2][i]){
			winner = game_matrix[0][0][i];
			break;
		}
		
	}
	*/

	return winner
	

}


//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Textures

// From www.learningwebgl.com

function handleLoadedTexture(texture) {
	
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

var ramalhoTexture;
var brancoTexture;

function initTexture() {
	ramalhoTexture = gl.createTexture();
	ramalhoTexture.image = new Image();
	ramalhoTexture.image.onload = function () {
		handleLoadedTexture(ramalhoTexture)
	}

	ramalhoTexture.image.src = "x.gif";


	brancoTexture = gl.createTexture();
	brancoTexture.image = new Image();
	brancoTexture.image.onload = function () {
		handleLoadedTexture(brancoTexture)
	}

	brancoTexture.image.src = "bola.png";


	neutralTexture = gl.createTexture();
	neutralTexture.image = new Image();
	neutralTexture.image.onload = function () {
		handleLoadedTexture(neutralTexture)
	}

	neutralTexture.image.src = "cinza.jpg";
}




//----------------------------------------------------------------------------

// Handling the Buffers
function initBuffers() {	
	
	// Coordinates
		
	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = vertices.length / 3;			

	// Textures
		
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;			

	// Vertex indices
	
    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;



}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType,
					texture_id) {

    
   	tmp = mult( rotationXXMatrix( globalAngleXX), rotationYYMatrix( globalAngleYY ));
   	mvMatrix = mult( translationMatrix( 0, 0, globalTz), tmp); 

  	matrixGlobal = mvMatrix;

	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Passing the buffers
    	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	// NEW --- Textures
	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    if (texture_id == 1)
   		gl.bindTexture(gl.TEXTURE_2D, ramalhoTexture);
    
    else if (texture_id == 0)
   		gl.bindTexture(gl.TEXTURE_2D, brancoTexture);

   	else
   		gl.bindTexture(gl.TEXTURE_2D, neutralTexture);

        
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    
    // The vertex indices
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);	
   
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene
//  variavel near para usar na perspectiva
var near = 0.05;
//
//  variavel far para usar na perspectiva
var far = 10;

class Cube {
  constructor(tx, ty, tz,mvMatrix, owner) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;

    var id = 3;
    if (owner == "ramalho")
    	id = 1;

   	else if(owner == "branco")
   		id = 0;

    drawModel( -angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx , ty, tz,
	           mvMatrix,
	           primitiveType,
	           id);
    
  }
}


cube_array = new Array();

function drawScene() {
	
	var pMatrix;
	
	
    	var mvMatrix = mat4();
	// Clearing with the background color
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// NEW --- Computing the Projection Matrix
	
    	// A standard view volume.
    
    	// Viewer is at (0,0,0)
    
    	// Ensure that the model is "inside" the view volume
    
    	pMatrix = perspective( 45, 1, near, far);
    
    	globalTz = -3;


	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// NEW --- Instantianting the same model more than once !!
	
	// And with diferent transformation parameters !!
	
	// Call the drawModel function !!

	var possible_values = [-0.5, 0, 0.5]
	cube_array = [];
	for (var i = 0; i < possible_values.length; i++) {
		for (var j = 0; j < possible_values.length; j++) {
			for (var k = 0; k < possible_values.length; k++)
				cube_array.push(new Cube(tx + possible_values[i],
										 ty + possible_values[j],
										 tz + possible_values[k],
										 mvMatrix,
										 game_matrix[i][j][k])
				);
		}
	}
	
}

/*function detect_intersection(x, y){

	var canvas = document.getElementById("my-canvas");
	var rect = canvas.getBoundingClientRect();	
    console.log("X:" + x + " Y:" + y);
    console.log(rect);
    console.log("X:" + (x - rect.left) + " Y:" + (y - rect.top));
    //aqui fico com as coordenadas do click
//   	var x_clicked = (x - rect.left) / rect.width * 2 - 1;
//   	var y_clicked = (y - rect.top) / rect.height * -2 + 1;

//    console.log("CLicked: X " + x_clicked + " - Y " + y_clicked);

    var idCubo = intersectCube( (x - rect.left) , (y - rect.top), rect.width, rect.height);
    console.log(idCubo);

    console.log("aquis");
    var pixels = new Uint8Array(4);
    gl2.readPixels((x - rect.left), (y - rect.top),1,1, gl2.RGBA, gl2.UNSIGNED_BYTE, pixels);
    
    console.log(pixels); // Uint8Array


}

*/

//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {
	
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
    if( globalRotationYY_ON ) {

			globalAngleYY += globalRotationYY_DIR * globalRotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }
		
		if( rotationXX_ON ) {

			angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationYY_ON ) {

			angleYY += rotationYY_DIR * rotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationZZ_ON ) {

			angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
	    }
	}
	
	lastTime = timeNow;
}

//----------------------------------------------------------------------------

// Handling keyboard events

// Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {
	
	if (currentlyPressedKeys[33]) {
		
		// Page Up
		
		sx *= 0.9;
		
		sz = sy = sx;
	}
	if (currentlyPressedKeys[34]) {
		
		// Page Down
		
		sx *= 1.1;
		
		sz = sy = sx;
	}
	if (currentlyPressedKeys[37]) {
		
		// Left cursor key
		
		if( rotationYY_ON == 0 ) {
			
			rotationYY_ON = 1;
		}  
		
		rotationYY_SPEED -= 0.25;
	}
	if (currentlyPressedKeys[39]) {
		
		// Right cursor key
		
		if( rotationYY_ON == 0 ) {
			
			rotationYY_ON = 1;
		}  
		
		rotationYY_SPEED += 0.25;
	}
	if (currentlyPressedKeys[38]) {
		
		// Up cursor key
		
		if( rotationXX_ON == 0 ) {
			
			rotationXX_ON = 1;
		}  
		
		rotationXX_SPEED -= 0.25;
	}
	if (currentlyPressedKeys[40]) {
		
		// Down cursor key
		
		if( rotationXX_ON == 0 ) {
			
			rotationXX_ON = 1;
		}  
		
		rotationXX_SPEED += 0.25;
	}
}

//----------------------------------------------------------------------------

// Handling mouse events

// Adapted from www.learningwebgl.com

var moveImage = false;

var mouseDown = false;

var lastMouseX = null;

var lastMouseY = null;

function handleMouseDown(event) {
	
    mouseDown = true;
    //verificar se depois do click o rato move ou nao
    moveImage = false;



    lastMouseX = event.clientX;
  
    lastMouseY = event.clientY;




}

function change_player() {
	if (player == "ramalho"){
		player = "branco";
	}
	else if (player == "branco"){
		player = "ramalho";
	}
	else
		console.log("problemas");
}

function set_variables(x, y){

	var canvas = document.getElementById("my-canvas");
	var rect = canvas.getBoundingClientRect();	

    //aqui fico com as coordenadas do click
    
   	x_clicked = (x - rect.left);
   	y_clicked = (rect.bottom - y);
}


function user_play(){
	console.log(pixels);
    
    for(var i = 0; i < cube_array2.length; i++){
        if(pixels[0]/255 == cube_array2[i].tupleColor[0] && pixels[1]/255 == cube_array2[i].tupleColor[1]  && pixels[2]/255 == cube_array2[i].tupleColor[2] ){
            console.log(cube_array2[i].position);
		    game_matrix[cube_array2[i].position[0]][ cube_array2[i].position[1]][ cube_array2[i].position[2]] = player;
		    change_player();
            break;

        }
     
    }
}

function handleMouseUp(event) {

    var newX = event.clientX;
  
    var newY = event.clientY;

    // se entrar no if nao se moveu logo se clicou num cubo e a jogada
    if(moveImage == false && newX == lastMouseX && newY == lastMouseY){
		set_variables(newX, newY);
		drawScene2();

       	user_play()

    }
    console.log("Winner: "+evaluate_win());
    mouseDown = false;
}

function handleMouseMove(event) {

    if (!mouseDown) {
        return;
    } 
    //caso o rato mova tem de passar a true
    moveImage = true; 
    // Rotation angles proportional to cursor displacement
    
    var newX = event.clientX;
  
    var newY = event.clientY;

    var deltaX = newX - lastMouseX;
    
    globalAngleYY += radians( 10 * deltaX  )

    var deltaY = newY - lastMouseY;
    
    globalAngleXX += radians( 10 * deltaY  )
    
    lastMouseX = newX
    
    lastMouseY = newY;
  }

// Timer

function tick() {
	requestAnimFrame(tick);
	
	// NEW --- Processing keyboard events 
	
	drawScene();
	//drawScene2();

	handleKeys();
	
	animate();
}




//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){
		
}

//----------------------------------------------------------------------------

function setEventListeners( canvas ){
	
	// NEW ---Handling the mouse
	
	// From learningwebgl.com

    canvas.onmousedown = handleMouseDown;
    
    document.onmouseup = handleMouseUp;
    
    document.onmousemove = handleMouseMove;
    
    // NEW ---Handling the keyboard
	
	// From learningwebgl.com

    function handleKeyDown(event) {
		
        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {
		
        currentlyPressedKeys[event.keyCode] = false;
    }

	document.onkeydown = handleKeyDown;
    
    document.onkeyup = handleKeyUp;
	
	// Dropdown list
	


	// Button events
	
	document.getElementById("XX-on-off-button").onclick = function(){
		
		// Switching on / off
		
		if( rotationXX_ON ) {
			
			rotationXX_ON = 0;
		}
		else {
			
			rotationXX_ON = 1;
		}  
	};

	document.getElementById("XX-direction-button").onclick = function(){
		
		// Switching the direction
		
		if( rotationXX_DIR == 1 ) {
			
			rotationXX_DIR = -1;
		}
		else {
			
			rotationXX_DIR = 1;
		}  
	};      

	document.getElementById("XX-slower-button").onclick = function(){
		
		rotationXX_SPEED *= 0.75;  
	};      

	document.getElementById("XX-faster-button").onclick = function(){
		
		rotationXX_SPEED *= 1.25;  
	};      

	document.getElementById("YY-on-off-button").onclick = function(){
		
		// Switching on / off
		
		if( rotationYY_ON ) {
			
			rotationYY_ON = 0;
		}
		else {
			
			rotationYY_ON = 1;
		}  
	};

	document.getElementById("YY-direction-button").onclick = function(){
		
		// Switching the direction
		
		if( rotationYY_DIR == 1 ) {
			
			rotationYY_DIR = -1;
		}
		else {
			
			rotationYY_DIR = 1;
		}  
	};      

	document.getElementById("YY-slower-button").onclick = function(){
		
		rotationYY_SPEED *= 0.75;  
	};      

	document.getElementById("YY-faster-button").onclick = function(){
		
		rotationYY_SPEED *= 1.25;  
	};      

	document.getElementById("ZZ-on-off-button").onclick = function(){
		
		// Switching on / off
		
		if( rotationZZ_ON ) {
			
			rotationZZ_ON = 0;
		}
		else {
			
			rotationZZ_ON = 1;
		}  
	};

	document.getElementById("ZZ-direction-button").onclick = function(){
		
		// Switching the direction
		
		if( rotationZZ_DIR == 1 ) {
			
			rotationZZ_DIR = -1;
		}
		else {
			
			rotationZZ_DIR = 1;
		}  
	};      

	document.getElementById("ZZ-slower-button").onclick = function(){
		
		rotationZZ_SPEED *= 0.75;  
	};      

	document.getElementById("ZZ-faster-button").onclick = function(){
		
		rotationZZ_SPEED *= 1.25;  
	};      

	document.getElementById("reset-button").onclick = function(){
		
		// The initial values

		tx = 0.0;

		ty = 0.0;

		tz = 0.0;

		angleXX = 0.0;

		angleYY = 0.0;

		angleZZ = 0.0;

		sx = 0.25;

		sy = 0.25;

		sz = 0.25;
		
		rotationXX_ON = 0;
		
		rotationXX_DIR = 1;
		
		rotationXX_SPEED = 1;

		rotationYY_ON = 0;
		
		rotationYY_DIR = 1;
		
		rotationYY_SPEED = 1;

		rotationZZ_ON = 0;
		
		rotationZZ_DIR = 1;
		
		rotationZZ_SPEED = 1;
	};      
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas, canvas2 ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		// DEFAULT: The viewport occupies the whole canvas 
		
		// DEFAULT: The viewport background color is WHITE
		
		// NEW - Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
		
		// DEFAULT: The Depth-Buffer is DISABLED
		
		// Enable it !
		
		gl.enable( gl.DEPTH_TEST );



		gl2 = canvas2.getContext("webgl") || canvas2.getContext("experimental-webgl");
		primitiveType2 = gl2.TRIANGLES;
		gl2.enable( gl2.DEPTH_TEST );

		
	} catch (e) {
	}
	if (!gl || !gl2) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	var canvas2 = document.getElementById("my-canvas2");

	initWebGL( canvas, canvas2 );
	shaderProgram = initShadersTexture( gl );
	shaderProgram2 = initShadersColor( gl2 );
	

	setEventListeners( canvas );
	
	
	initBuffers();
	initBuffers2();


	initTexture();
	
	tick();		// A timer controls the rendering / animation    

	outputInfos();
}
