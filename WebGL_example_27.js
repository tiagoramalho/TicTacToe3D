//////////////////////////////////////////////////////////////////////////////
//
//  WebGL_example_27.js 
//
//  Simple mesh data structure
//
//  Adapted from learningwebgl.com
//
//  J. Madeira - November 2015
//
//////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------
//
// Global Variables
//
var matrixGlobal; 

var gl = null; // WebGL context

var shaderProgram = null; 

// NEW --- Buffers

var cubeVertexPositionBuffer = null;
	
var cubeVertexColorBuffer = null;

var cubeVertexIndexBuffer = null;

// The global transformation parameters

// The translation vector

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

var rotationXX_ON = 1;

var rotationXX_DIR = 1;

var rotationXX_SPEED = 1;
 
var rotationYY_ON = 1;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 1;
 
var rotationZZ_ON = 1;

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

// Vertex indices defining the triangles
        
var cubeVertexIndices = [

            0, 1, 2,      0, 2, 3,    // Front face

            4, 5, 6,      4, 6, 7,    // Back face

            8, 9, 10,     8, 10, 11,  // Top face

            12, 13, 14,   12, 14, 15, // Bottom face

            16, 17, 18,   16, 18, 19, // Right face

            20, 21, 22,   20, 22, 23  // Left face
];
         
// And their colour

var colors = [

		 // FRONT FACE - RED
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 1.00,  0.00,  0.00,
		 			 
		 // BACK FACE - BLACK
		 	
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,
		 		 
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,
		 			 
		 // TOP FACE - 
		 	
		 1.00,  1.00,  0.00,
		 
		 1.00,  1.00,  0.00,
		 
		 1.00,  1.00,  0.00,

		 1.00,  1.00,  0.00,

		 			 
		 // BOTTOM FACE
		 	
		 0.00,  1.00,  1.00,
		 
		 0.00,  1.00,  1.00,
		 
		 0.00,  1.00,  1.00,

		 0.00,  1.00,  1.00,

		 			 
		 // RIGHT FACE - BLUE
		 	
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,

		 0.00,  0.00,  1.00,
		 			 
		 			 
		 // LEFT FACE - GREEN
		 	
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,

		 0.00,  1.00,  0.00,
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
					console.log(game_matrix[i][j][k]);
					if(k == game_matrix[i][j].length-1)
						winner = game_matrix[i][j][k];
				}

				else
					break
			}
		}
	}
	if (winner != false)
		return winner



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
	if (winner != false)
		return winner




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
	if (winner != false)
		return winner


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

// Handling the Vertex and the Color Buffers

function initBuffers() {	
	
	// Coordinates
		
	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = vertices.length / 3;			

	// Colors
		
	cubeVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	cubeVertexColorBuffer.itemSize = 3;
	cubeVertexColorBuffer.numItems = vertices.length / 3;			

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
					primitiveType ) {

    // Pay attention to transformation order !!
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

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

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

//  Drawing the 3D scene

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



// Timer

function tick() {
	
	requestAnimFrame(tick);
	
	// NEW --- Processing keyboard events 
	
	handleKeys();
	
	drawScene();
	
	animate();
}




//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){
		
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
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
		
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas2");
	
	initWebGL( canvas2 );

	shaderProgram = initShaders( gl );
	
	setEventListeners( canvas );
	
	initBuffers();
	
	tick();		// A timer controls the rendering / animation    

	outputInfos();
}


