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

var pixels;

var shaderProgram2 = null; 

var x_clicked;
var y_clicked;

var colors = [];
var random_colors=[];

var cubeVertexPositionBuffer2 = null;

var cubeVertexIndexBuffer2 = null;

var cubeVertexColorBuffer1 = null;
var cubeVertexColorBuffer2 = null;
var cubeVertexColorBuffer3 = null;
var cubeVertexColorBuffer4 = null;
var cubeVertexColorBuffer5 = null;
var cubeVertexColorBuffer6 = null;
var cubeVertexColorBuffer7 = null;
var cubeVertexColorBuffer8 = null;
var cubeVertexColorBuffer9 = null;
var cubeVertexColorBuffer10 = null;
var cubeVertexColorBuffer11 = null;
var cubeVertexColorBuffer12 = null;
var cubeVertexColorBuffer13 = null;
var cubeVertexColorBuffer14 = null;
var cubeVertexColorBuffer15 = null;
var cubeVertexColorBuffer16 = null;
var cubeVertexColorBuffer17 = null;
var cubeVertexColorBuffer18 = null;
var cubeVertexColorBuffer19 = null;
var cubeVertexColorBuffer20 = null;
var cubeVertexColorBuffer21 = null;
var cubeVertexColorBuffer22 = null;
var cubeVertexColorBuffer23 = null;
var cubeVertexColorBuffer24 = null;
var cubeVertexColorBuffer25 = null;
var cubeVertexColorBuffer26 = null;
var cubeVertexColorBuffer27 = null;

var tmpRed;
var tmpGreen;
var tmpBlue;

for(var i =0 ; i<72*27; i+=3){
    if(i % 72 == 0){
        tmpRed = Math.random();
        tmpGreen = Math.random();
        tmpBlue = Math.random();
        random_colors.push((tmpRed, tmpGreen, tmpBlue));
    }
    colors.push(tmpRed);
    colors.push(tmpGreen);
    colors.push(tmpBlue);
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

function initBuffers2() {	
	
	// Coordinates
	cubeVertexPositionBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexPositionBuffer2);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
	cubeVertexPositionBuffer2.itemSize = 3;
	cubeVertexPositionBuffer2.numItems = vertices.length / 3;			

	// Colors


	cubeVertexColorBuffer1 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer1);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer1.itemSize = 3;
	cubeVertexColorBuffer1.numItems = vertices.length / 3;			
    
    colors.splice(0, 72);

	cubeVertexColorBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer2);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer2.itemSize = 3;
	cubeVertexColorBuffer2.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer3 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer3);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer3.itemSize = 3;
	cubeVertexColorBuffer3.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer4 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer4);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer4.itemSize = 3;
	cubeVertexColorBuffer4.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer5 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer5);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer5.itemSize = 3;
	cubeVertexColorBuffer5.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer6 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer6);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer6.itemSize = 3;
	cubeVertexColorBuffer6.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer7 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer7);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer7.itemSize = 3;
	cubeVertexColorBuffer7.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer8 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer8);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer8.itemSize = 3;
	cubeVertexColorBuffer8.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer9 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer9);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer9.itemSize = 3;
	cubeVertexColorBuffer9.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer10 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer10);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer10.itemSize = 3;
	cubeVertexColorBuffer10.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer11 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer11);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer11.itemSize = 3;
	cubeVertexColorBuffer11.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer12 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer12);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer12.itemSize = 3;
	cubeVertexColorBuffer12.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer13 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer13);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer13.itemSize = 3;
	cubeVertexColorBuffer13.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer14 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer14);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer14.itemSize = 3;
	cubeVertexColorBuffer14.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer15 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer15);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer15.itemSize = 3;
	cubeVertexColorBuffer15.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer16 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer16);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer16.itemSize = 3;
	cubeVertexColorBuffer16.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer17 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer17);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer17.itemSize = 3;
	cubeVertexColorBuffer17.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer18 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer18);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer18.itemSize = 3;
	cubeVertexColorBuffer18.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer19 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer19);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer19.itemSize = 3;
	cubeVertexColorBuffer19.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer20 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer20);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer20.itemSize = 3;
	cubeVertexColorBuffer20.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer21 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer21);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer21.itemSize = 3;
	cubeVertexColorBuffer21.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer22 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer22);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer22.itemSize = 3;
	cubeVertexColorBuffer22.numItems = vertices.length / 3;			

    colors.splice(0, 72);

	cubeVertexColorBuffer23 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer23);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer23.itemSize = 3;
	cubeVertexColorBuffer23.numItems = vertices.length / 3;			
 
    colors.splice(0, 72);

	cubeVertexColorBuffer24 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer24);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer24.itemSize = 3;
	cubeVertexColorBuffer24.numItems = vertices.length / 3;			
  
    colors.splice(0, 72);

	cubeVertexColorBuffer25 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer25);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer25.itemSize = 3;
	cubeVertexColorBuffer25.numItems = vertices.length / 3;			
   
    colors.splice(0, 72);

	cubeVertexColorBuffer26 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer26);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer26.itemSize = 3;
	cubeVertexColorBuffer26.numItems = vertices.length / 3;			
    
    colors.splice(0, 72);

	cubeVertexColorBuffer27 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer27);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);
	cubeVertexColorBuffer27.itemSize = 3;
	cubeVertexColorBuffer27.numItems = vertices.length / 3;			
	
	// Vertex indices
    cubeVertexIndexBuffer2 = gl2.createBuffer();
    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer2);
    gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl2.STATIC_DRAW);
    cubeVertexIndexBuffer2.itemSize = 1;
    cubeVertexIndexBuffer2.numItems = 36;
}

//----------------------------------------------------------------------------

//  Drawing the model
var drawModelCount = 1;
function drawModel2( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix) {

    // Pay attention to transformatio order !!
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

    switch(drawModelCount) {
    case 1:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer1);
        drawModelCount++;
        break;
    case 2:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer2);
        drawModelCount++;
        break;
    case 3:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer3);
        drawModelCount++;
        break;
    case 4:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer4);
        drawModelCount++;
        break;
    case 5:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer5);
        drawModelCount++;
        break;
    case 6:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer6);
        drawModelCount++;
        break;
    case 7:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer7);
        drawModelCount++;
        break;
    case 8:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer8);
        drawModelCount++;
        break;
    case 9:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer9);
        drawModelCount++;
        break;
    case 10:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer10);
        drawModelCount++;
        break;
    case 11:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer11);
        drawModelCount++;
        break;
    case 12:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer12);
        drawModelCount++;
        break;
    case 13:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer13);
        drawModelCount++;
        break;
    case 14:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer14);
        drawModelCount++;
        break;
    case 15:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer15);
        drawModelCount++;
        break;
    case 16:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer16);
        drawModelCount++;
        break;
    case 17:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer17);
        drawModelCount++;
        break;
    case 18:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer18);
        drawModelCount++;
        break;
    case 19:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer19);
        drawModelCount++;
        break;
    case 20:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer20);
        drawModelCount++;
        break;
    case 21:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer21);
        drawModelCount++;
        break;
    case 22:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer22);
        drawModelCount++;
        break;
    case 23:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer23);
        drawModelCount++;
        break;
    case 24:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer24);
        drawModelCount++;
        break;
    case 25:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer25);
        drawModelCount++;
        break;
    case 26:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer26);
        drawModelCount++;
        break;
    case 27:
        gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVertexColorBuffer27);
        drawModelCount = 1;
        break;
    default:
        drawModelCount = 1;
}
    
    gl2.vertexAttribPointer(shaderProgram2.vertexColorAttribute, cubeVertexColorBuffer1.itemSize, gl2.FLOAT, false, 0, 0);

    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer2);

	// Drawing the triangles --- NEW --- DRAWING ELEMENTS 
	
	gl2.drawElements(gl2.TRIANGLES, cubeVertexIndexBuffer2.numItems, gl2.UNSIGNED_SHORT, 0);	
}

//----------------------------------------------------------------------------

class Cube2 {
  constructor(tx, ty, tz,mvMatrix, tuple) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;
    this.tupleColor = tuple;

    drawModel2( -angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx , ty, tz,
	           mvMatrix);
    
  }
}


cube_array2 = new Array();

//  Drawing the 3D scene

var countRandom = 1;
function drawScene2() {
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing with the background color
	gl2.clearColor(255, 0, 0.2, 255);
	
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

	var number = 0;
	for (var i = 0; i < possible_values.length; i++) {
		for (var j = 0; j < possible_values.length; j++) {
			for (var k = 0; k < possible_values.length; k++)


				cube_array2.push(new Cube2( tx + possible_values[i],
										 	ty + possible_values[j],
										 	tz + possible_values[k],
										 	mvMatrix,
										 	random_colors[countRandom],
                                            countRandom)
				);
				number++;

		}
	}
    if(countRandom == 28)
        countRandom = 1;
    else
        countRandom++;




	var canvas = document.getElementById("my-canvas2");

    pixels = new Uint8Array(4);


   	gl2.readPixels( x_clicked, y_clicked, 1,1 , gl2.RGBA, gl2.UNSIGNED_BYTE, pixels);

   	console.log(x_clicked + "  " + y_clicked)

	           
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

