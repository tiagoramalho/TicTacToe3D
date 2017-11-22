//////////////////////////////////////////////////////////////////////////////
//
//  Mathematical functions 
//
//  Ref. Original code from the Angel / Shreiner examples
//	
//	Additional functions by J. Madeira - Sep./Oct. 2015
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

//----------------------------------------------------------------------------

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}

function vec3()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}

function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec2( v[0],  0.0 ),
            vec2(  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec2(v) );  v.splice( 0, 2 );
        m.push( vec2(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat3()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec3( v[0],  0.0,  0.0 ),
            vec3(  0.0, v[0],  0.0 ),
            vec3(  0.0,  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat4()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec4( v[0], 0.0,  0.0,   0.0 ),
            vec4( 0.0,  v[0], 0.0,   0.0 ),
            vec4( 0.0,  0.0,  v[0],  0.0 ),
            vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if ( u.length != v.length ) { return false; }
   
    if ( u.matrix && v.matrix ) {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) { return false; }
            for ( var j = 0; j < u[i].length; ++j ) {
                if ( u[i][j] !== v[i][j] ) { return false; }
            }
        }
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        return false;
    }
    else {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i] !== v[i] ) { return false; }
        }
    }

    return true;
}

//----------------------------------------------------------------------------

function add( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "add(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "add(): trying to add matrices of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] + v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "add(): trying to add matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "add(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] + v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "subtract(): trying to subtract matrices" +
                " of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "subtract(): trying to subtact matrices" +
                    " of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] - v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "subtract(): vectors are not the same length";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] - v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( [] );

            for ( var j = 0; j < v.length; ++j ) {
                var sum = 0.0;
                for ( var k = 0; k < u.length; ++k ) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push( sum );
            }
        }

        result.matrix = true;

        return result;
    }
    else {
        if ( u.length != v.length ) {
            throw "mult(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] * v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;
    
    return result;
}

//----------------------------------------------------------------------------
//
//  Helper function: Column-major 1D representation
//

function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}

//----------------------------------------------------------------------------
//
//  To get the number of bytes
//

var sizeof = {
    'vec2' : new Float32Array( flatten(vec2()) ).byteLength,
    'vec3' : new Float32Array( flatten(vec3()) ).byteLength,
    'vec4' : new Float32Array( flatten(vec4()) ).byteLength,
    'mat2' : new Float32Array( flatten(mat2()) ).byteLength,
    'mat3' : new Float32Array( flatten(mat3()) ).byteLength,
    'mat4' : new Float32Array( flatten(mat4()) ).byteLength
};

//----------------------------------------------------------------------------
//
//  Constructing the 4 x 4 transformation matrices - J. Madeira 
//

function rotationXXMatrix( degrees )
{
	m = mat4();
	
	m[1][1] = Math.cos( radians( degrees ) );
	
	m[1][2] = -Math.sin( radians( degrees ) );
	
	m[2][1] = Math.sin( radians( degrees ) );
	
	m[2][2]	= Math.cos( radians( degrees ) )
	
	return m;	
}

function rotationYYMatrix( degrees )
{
	m = mat4();
	
	m[0][0] = Math.cos( radians( degrees ) );
	
	m[0][2] = Math.sin( radians( degrees ) );
	
	m[2][0] = -Math.sin( radians( degrees ) );
	
	m[2][2]	= Math.cos( radians( degrees ) )
	
	return m;	
}

function rotationZZMatrix( degrees )
{
	m = mat4();
	
	m[0][0] = Math.cos( radians( degrees ) );
	
	m[0][1] = -Math.sin( radians( degrees ) );
	
	m[1][0] = Math.sin( radians( degrees ) );
	
	m[1][1]	= Math.cos( radians( degrees ) )
	
	return m;	
}

function scalingMatrix( sx, sy, sz )
{
	m = mat4();
	
	m[0][0] = sx;
	
	m[1][1] = sy;
	
	m[2][2] = sz;	
	
	return m;	
}

function translationMatrix( tx, ty, tz )
{
	m = mat4();
	
	m[0][3] = tx;
	
	m[1][3] = ty;
	
	m[2][3] = tz;	
	
	return m;	
}


function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}


function normalize( v )
{
    var squaresSum = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    
    var norm = Math.sqrt( squaresSum );
    
    v[0] /= norm;
    
    v[1] /= norm;
    
    v[2] /= norm;
}

//----------------------------------------------------------------------------

// NEW --- Symmetric vector

function symmetric( v )
{
    var result = vec3();
    
    for( i = 0; i < 3; i++ ) {
        
        result[i] = - v[i];
    }
        
    return result;
}

//----------------------------------------------------------------------------

// NEW --- Dot product

function dotProduct( v1, v2 )
{
    var result = 0.0;
    
    for( i = 0; i < 3; i++ ) {
        
        result += v1[i] * v2[i];
    }
        
    return result;
}

//----------------------------------------------------------------------------

// NEW --- Vector product

function vectorProduct( v1, v2 )
{
    var res = vec3();

	res[0] = v1[1] * v2[2] - v1[2] * v2[1];

	res[1] = - ( v1[0] * v2[2] - v1[2] * v2[0] );

	res[2] = v1[0] * v2[1] - v1[1] * v2[0];

	return res;
}

//----------------------------------------------------------------------------

// NEW --- Compute unit normal vector to triangle defined by p1, p2 and p3 (CCW)

function computeNormalVector( p0, p1, p2 )
{
	var v1 = vec3();

	var v2 = vec3();

	var result = vec3();

    v1[0] = p1[0] - p0[0];

    v1[1] = p1[1] - p0[1];

    v1[2] = p1[2] - p0[2];

    v2[0] = p2[0] - p0[0];

    v2[1] = p2[1] - p0[1];

    v2[2] = p2[2] - p0[2];

    result = vectorProduct( v1, v2 );

    normalize( result );

    return result;
}

//----------------------------------------------------------------------------

// NEW --- Multiplying using homogeneous coordinates

function multiplyPointByMatrix( m, p )
{
	var result = vec4();
	
	for( var i = 0; i < 4; i++ ) {
		
		for( var j = 0; j < 4; j++ ) {
		
				result[i] += m[i][j] * p[j];
		}
	}
	
	return result;
}

function multiplyVectorByMatrix( m, p )
{
	var result = vec4();
	
	for( var i = 0; i < 4; i++ ) {
		
		for( var j = 0; j < 4; j++ ) { 	// Can stop earlier; 4th coord is ZERO !!
		
				result[i] += m[i][j] * p[j];
		}
	}
	
	return result;
}
/*
function minor(matrixT, row, column) {
    if(matrixT.length -1 == 3){
        minorM = mat3()
    } 
    if(matrixT.length -1 == 2){
        minorM = mat2()
    } 
    for (var i = 0; i < matrixT.length-1; i++){
        for (var j = 0; j < matrixT.length-1; j++){
            minorM[i][j] = 0;
        }
    } 
    for (var i = 0; i < matrixT.length; i++){
        for (var j = 0; i != row && j < matrixT[i].length; j++){
            if (j != column){
                minorM[i < row ? i : i - 1][j < column ? j : j - 1] = matrixT[i][j];}}}
    return minorM;
}

function determinant(matrixT) {
    if (matrixT.length != matrixT[0].length)
        throw new IllegalStateException("invalid dimensions");

    if (matrixT.length == 2)
        return matrixT[0][0] * matrixT[1][1] - matrixT[0][1] * matrixT[1][0];

    var det = 0;
    for (var i = 0; i < matrixT[0].length; i++){
        det += Math.pow(-1, i) * matrixT[0][i] * determinant(minor(matrixT, 0, i));
   }
    return det;
}

function inverse(matrixT) {
    var inverseM; 

    if(matrixT.length == 4){
        inverseM= mat4()
    } 
    if(matrixT.length == 3){
        inverseM= mat3()
    } 
    if(matrixT.length == 2){
        inverseM= mat2()
    } 
    for (var i = 0; i < matrixT.length; i++){
        for (var j = 0; j < matrixT.length; j++){
            inverseM[i][j] = 0;
        }
    } 
    // minors and cofactors
    for (var i = 0; i < matrixT.length; i++){
        for (var j = 0; j < matrixT[i].length; j++){
            inverseM[i][j] = Math.pow(-1, i + j) * determinant(minor(matrixT, i, j));}}

    // adjugate and determinant
    var det = 1.0 / determinant(matrixT);
    for (var i = 0; i < inverseM.length; i++) {
        for (var j = 0; j <= i; j++) {
            var temp = inverseM[i][j];
            inverseM[i][j] = inverseM[j][i] * det;
            inverseM[j][i] = temp * det;
        }
    }

    return inverseM;
}
function inverse(m)
{
    inv = Array(16);
    invOut = mat4();
    var det;

    var tmp = Array(16);

    for(var i=0; i < 4; i++){
        for(var j=0; j < 4; j++){
            tmp[i*4+j] = m[i][j];
        }
    }

    m = tmp;

    inv[0] = m[5]  * m[10] * m[15] - 
             m[5]  * m[11] * m[14] - 
             m[9]  * m[6]  * m[15] + 
             m[9]  * m[7]  * m[14] +
             m[13] * m[6]  * m[11] - 
             m[13] * m[7]  * m[10];

    inv[4] = -m[4]  * m[10] * m[15] + 
              m[4]  * m[11] * m[14] + 
              m[8]  * m[6]  * m[15] - 
              m[8]  * m[7]  * m[14] - 
              m[12] * m[6]  * m[11] + 
              m[12] * m[7]  * m[10];

    inv[8] = m[4]  * m[9] * m[15] - 
             m[4]  * m[11] * m[13] - 
             m[8]  * m[5] * m[15] + 
             m[8]  * m[7] * m[13] + 
             m[12] * m[5] * m[11] - 
             m[12] * m[7] * m[9];

    inv[12] = -m[4]  * m[9] * m[14] + 
               m[4]  * m[10] * m[13] +
               m[8]  * m[5] * m[14] - 
               m[8]  * m[6] * m[13] - 
               m[12] * m[5] * m[10] + 
               m[12] * m[6] * m[9];

    inv[1] = -m[1]  * m[10] * m[15] + 
              m[1]  * m[11] * m[14] + 
              m[9]  * m[2] * m[15] - 
              m[9]  * m[3] * m[14] - 
              m[13] * m[2] * m[11] + 
              m[13] * m[3] * m[10];

    inv[5] = m[0]  * m[10] * m[15] - 
             m[0]  * m[11] * m[14] - 
             m[8]  * m[2] * m[15] + 
             m[8]  * m[3] * m[14] + 
             m[12] * m[2] * m[11] - 
             m[12] * m[3] * m[10];

    inv[9] = -m[0]  * m[9] * m[15] + 
              m[0]  * m[11] * m[13] + 
              m[8]  * m[1] * m[15] - 
              m[8]  * m[3] * m[13] - 
              m[12] * m[1] * m[11] + 
              m[12] * m[3] * m[9];

    inv[13] = m[0]  * m[9] * m[14] - 
              m[0]  * m[10] * m[13] - 
              m[8]  * m[1] * m[14] + 
              m[8]  * m[2] * m[13] + 
              m[12] * m[1] * m[10] - 
              m[12] * m[2] * m[9];

    inv[2] = m[1]  * m[6] * m[15] - 
             m[1]  * m[7] * m[14] - 
             m[5]  * m[2] * m[15] + 
             m[5]  * m[3] * m[14] + 
             m[13] * m[2] * m[7] - 
             m[13] * m[3] * m[6];

    inv[6] = -m[0]  * m[6] * m[15] + 
              m[0]  * m[7] * m[14] + 
              m[4]  * m[2] * m[15] - 
              m[4]  * m[3] * m[14] - 
              m[12] * m[2] * m[7] + 
              m[12] * m[3] * m[6];

    inv[10] = m[0]  * m[5] * m[15] - 
              m[0]  * m[7] * m[13] - 
              m[4]  * m[1] * m[15] + 
              m[4]  * m[3] * m[13] + 
              m[12] * m[1] * m[7] - 
              m[12] * m[3] * m[5];

    inv[14] = -m[0]  * m[5] * m[14] + 
               m[0]  * m[6] * m[13] + 
               m[4]  * m[1] * m[14] - 
               m[4]  * m[2] * m[13] - 
               m[12] * m[1] * m[6] + 
               m[12] * m[2] * m[5];

    inv[3] = -m[1] * m[6] * m[11] + 
              m[1] * m[7] * m[10] + 
              m[5] * m[2] * m[11] - 
              m[5] * m[3] * m[10] - 
              m[9] * m[2] * m[7] + 
              m[9] * m[3] * m[6];

    inv[7] = m[0] * m[6] * m[11] - 
             m[0] * m[7] * m[10] - 
             m[4] * m[2] * m[11] + 
             m[4] * m[3] * m[10] + 
             m[8] * m[2] * m[7] - 
             m[8] * m[3] * m[6];

    inv[11] = -m[0] * m[5] * m[11] + 
               m[0] * m[7] * m[9] + 
               m[4] * m[1] * m[11] - 
               m[4] * m[3] * m[9] - 
               m[8] * m[1] * m[7] + 
               m[8] * m[3] * m[5];

    inv[15] = m[0] * m[5] * m[10] - 
              m[0] * m[6] * m[9] - 
              m[4] * m[1] * m[10] + 
              m[4] * m[2] * m[9] + 
              m[8] * m[1] * m[6] - 
              m[8] * m[2] * m[5];

    det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

    if (det == 0)
        return null;

    det = 1.0 / det;

    
    for(var i=0; i < 4; i++){
        for(var j=0; j < 4; j++){
            invOut[i][j] = inv[i*4+j] * det; 
        }
    }

    return invOut;
}*/
