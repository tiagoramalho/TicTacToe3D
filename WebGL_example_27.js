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
 
 
// From learningwebgl.com

// NEW --- Storing the vertices defining the cube faces
         
// And their colour

var primitiveType2 = null;

var gl2 = null; // WebGL context

var shaderProgram2 = null; 

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

		 0.00,  1.00,  0.00,];

var cubeVertexPositionBuffer2 = null;

var cubeVertexIndexBuffer2 = null;

var cubeVertexColorBuffer = null;

random_colors=[];


//for (var i = 0; i < .length; i++) {
//	[i]
//}


//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex and the Color Buffers

function initBuffers2() {	
	
	// Coordinates
	cubeVertexPositionBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexPositionBuffer2);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
	cubeVertexPositionBuffer2.itemSize = 3;
	cubeVertexPositionBuffer2.numItems = vertices.length / 3;			

	// Colors


	cubeVertexColorBuffer = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer.itemSize = 3;
	cubeVertexColorBuffer.numItems = vertices.length / 3;			

	// Vertex indices
	
    cubeVertexIndexBuffer2 = gl2.createBuffer();
    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer2);
    gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl2.STATIC_DRAW);
    cubeVertexIndexBuffer2.itemSize = 1;
    cubeVertexIndexBuffer2.numItems = 36;
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel2( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix) {

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
	
	var mvUniform = gl2.getUniformLocation(shaderProgram2, "uMVMatrix");
	
	gl2.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Passing the buffers
    	
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexPositionBuffer2);
    
    gl2.vertexAttribPointer(shaderProgram2.vertexPositionAttribute, cubeVertexPositionBuffer2.itemSize, gl2.FLOAT, false, 0, 0);

	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer);
    
    gl2.vertexAttribPointer(shaderProgram2.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl2.FLOAT, false, 0, 0);

    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer2);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	
	gl2.drawElements(gl2.TRIANGLES, cubeVertexIndexBuffer2.numItems, gl2.UNSIGNED_SHORT, 0);	
}

//----------------------------------------------------------------------------

class Cube2 {
  constructor(tx, ty, tz,mvMatrix) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;



    drawModel2( -angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx , ty, tz,
	           mvMatrix);
    
  }
}


cube_array2 = new Array();

//  Drawing the 3D scene

function drawScene2() {
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing with the background color
	
	gl2.clear(gl2.COLOR_BUFFER_BIT);
	
	// NEW --- Computing the Projection Matrix
	
    	// A standard view volume.
    
    	// Viewer is at (0,0,0)
    
    	// Ensure that the model is "inside" the view volume
    
    	pMatrix = perspective( 45, 1, near, far);
    
    	globalTz = -3;


	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl2.getUniformLocation(shaderProgram2, "uPMatrix");
	
	gl2.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// NEW --- Instantianting the same model more than once !!
	
	// And with diferent transformation parameters !!
	
	// Call the drawModel function !!
	var possible_values = [-0.5, 0, 0.5]
	cube_array2 = [];
	colors=[];

	var number = 0;

	for (var i = 0; i < possible_values.length; i++) {
		for (var j = 0; j < possible_values.length; j++) {
			for (var k = 0; k < possible_values.length; k++)


				cube_array2.push(new Cube2( tx + possible_values[i],
										 	ty + possible_values[j],
										 	tz + possible_values[k],
										 	mvMatrix,
										 	random_colors[number])
				);
				number++;

		}
	}

	           
}

//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters


function animate2() {
	
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


// Timer

function tick2() {
	
	requestAnimFrame(tick2);
	
	// NEW --- Processing keyboard events 
	
	handleKeys();
	
	drawScene2();
	
	animate2();
	

}




//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos2(){
	
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL2( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl2 = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		// DEFAULT: The viewport occupies the whole canvas 
		
		// DEFAULT: The viewport background color is WHITE
		
		// NEW - Drawing the triangles defining the model
		
		primitiveType2 = gl2.TRIANGLES;
		
		// DEFAULT: The Depth-Buffer is DISABLED
		
		// Enable it !
		
		gl2.enable( gl2.DEPTH_TEST );
		
	} catch (e) {

	}
	if (!gl2) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL2() {
	
	var canvas = document.getElementById("my-canvas2");
	initWebGL2( canvas );
	
	shaderProgram2 = initShadersColor( gl2 );
	
	initBuffers2();
	
	tick2();		// A timer controls the rendering / animation    

	outputInfos2();
	

}


function intersectCube(x, y){

    return x+y;
}
