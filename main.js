angle = 0.0;

    function setupWebGL() {
		 canvas = document.getElementById("OUTPUT-CANVAS");
		gl = canvas.getContext('webgl');
	  }

    function createObjectBuffers(gl, obj) {
      
    	obj.vertexBuffer = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
    	gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
    	gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    	obj.indexBuffer = gl.createBuffer();
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBuffer);
    	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };

  	function setupWhatToDraw() {  
    cube = new Cube(10);
    createObjectBuffers(gl,cube);
    
    cylinder = new Cylinder(100);
    createObjectBuffers(gl,cylinder );
    }

    function drawObject(gl, obj, fillColor) {  
  	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
  	gl.enableVertexAttribArray(this.simpleShader.aPositionIndex);
  	gl.vertexAttribPointer(this.simpleShader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);
    
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBuffer);
  	gl.uniform3fv(this.simpleShader.uColorLocation, fillColor);
  	gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);
  
  
  	gl.disableVertexAttribArray(this.simpleShader.aPositionIndex);
  	gl.bindBuffer(gl.ARRAY_BUFFER, null);
  };

  function setupHowToDraw() {
    simpleShader = new simpleShader(gl);
  }

  function draw(){
    gl.enable(gl.DEPTH_TEST);
    angle+=0.01;
    
    gl.clearColor(0.8,0.8,0.8,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT,gl.DEPTH_BUFFER_BIT);

    // setup the view transform
    view_transform = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(view_transform,[0.0,2.0,10.0],[0.0,0.0,0.0],[0,1,0]);

    // setup the projection transform
    projection_transform = glMatrix.mat4.create();
    glMatrix.mat4.perspective(projection_transform, 3.14/4.0, 1.0, 0.001, 15.0);

    // rotation aroun Y
    rotate_transform = glMatrix.mat4.create();
    glMatrix.mat4.fromRotation(rotate_transform,angle,[0,1,0]);

    gl.useProgram(simpleShader);
    gl.uniformMatrix4fv(simpleShader.uProjectionMatrixLocation,false,projection_transform);
    gl.uniformMatrix4fv(simpleShader.uViewMatrixLocation,false,view_transform);
    gl.uniformMatrix4fv(simpleShader.uRotationMatrixLocation,false,rotate_transform);

    scale_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scale_matrix,[0.1,0.1,0.1]);
    
    translate_matrix = glMatrix.mat4.create();
    axis_matrix = glMatrix.mat4.create();

    for(var i=0; i < 3; ++i){
      var color_translate   = [0.0,0.0,0.0];
      var scaling = [0.01,0.01,0.01]; 
      color_translate[i] = 1.0;
      scaling[i] = 2;
      glMatrix.mat4.fromScaling(scale_matrix,scaling);
      glMatrix.mat4.fromTranslation(translate_matrix,color_translate);
      glMatrix.mat4.mul(translate_matrix,translate_matrix,scale_matrix);
      gl.uniformMatrix4fv(simpleShader.uM,false,translate_matrix);
      drawObject(gl,cube,color_translate);
    }
    
    // Here setup the transformation matrices and the render call to draw your car
    gl.uniformMatrix4fv(simpleShader.uM,false,glMatrix.mat4.create());

    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.9, 0.3, 0.5]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.0, 1.2, 0.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.56,1.0,0.04]);
    
    //PARTE SOPRA
    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.55, 0.3, 0.5]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.4, 2.5, 0.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.56,1.0,0.04]);

    //NERO
    gl.uniformMatrix4fv(simpleShader.uM,false,glMatrix.mat4.create());

    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.7, 0.2, 0.3]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [-0.3, 2.5, 0.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.0,0.0,0.0]);
    
    //poltrona
    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.3, 0.1, 0.3]);
    
    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.8, 11.0, 0.0]);
    
    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);
    
    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.67 ,0.58,0.38]);
    
    //schienale
      
    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.1, 0.5, 0.3]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.6, 1.2, 0.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, translateCube_matrix, scaleCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.67, 0.58, 0.38]);
    
    //bracciolo 1
    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.3, 0.1, 0.1]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.8, 13.0, 2.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.67, 0.58, 0.38]);
    
    //bracciolo 2
    scaleCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCube_matrix, [0.3, 0.1, 0.1]);

    translateCube_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCube_matrix, [0.8, 13.0, -2.0]);

    MCube = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCube, scaleCube_matrix, translateCube_matrix);

    gl.uniformMatrix4fv(simpleShader.uM,false, MCube);
    drawObject(gl,cube,[0.67,0.58, 0.38]);


    //RUOTA 1
    scaleCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCylinder_matrix, [0.2, 0.05, 0.2]);

    rotationangle = 90;
    rotationCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromRotation(rotationCylinder_matrix, rotationangle, [1, 1, 1]);

    translateCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCylinder_matrix, [0.6, 0.15, 0.5]);

    MCylinder = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCylinder, rotationCylinder_matrix, scaleCylinder_matrix);
    glMatrix.mat4.mul(MCylinder, translateCylinder_matrix, MCylinder);  

    gl.uniformMatrix4fv(simpleShader.uM, false, MCylinder);

    drawObject(gl,cylinder,[0.0,0.0,0.0]);
    
    //RUOTA 2
    scaleCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCylinder_matrix, [0.2, 0.05, 0.2]);

    rotationangle = 90;
    rotationCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromRotation(rotationCylinder_matrix, rotationangle, [1, 1, 1]);

    translateCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCylinder_matrix, [-0.6, 0.15, 0.5]);

    MCylinder = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCylinder, rotationCylinder_matrix, scaleCylinder_matrix);
    glMatrix.mat4.mul(MCylinder, translateCylinder_matrix, MCylinder);  

    gl.uniformMatrix4fv(simpleShader.uM, false, MCylinder);

    drawObject(gl,cylinder,[0.0,0.0,0.0]);    
    //RUOTA 3
    scaleCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCylinder_matrix, [0.2, 0.05, 0.2]);

    rotationangle = 90;
    rotationCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromRotation(rotationCylinder_matrix, rotationangle, [1, 1, 1]);

    translateCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCylinder_matrix, [-0.6, 0.15, -0.6]);

    MCylinder = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCylinder, rotationCylinder_matrix, scaleCylinder_matrix);
    glMatrix.mat4.mul(MCylinder, translateCylinder_matrix, MCylinder);  

    gl.uniformMatrix4fv(simpleShader.uM, false, MCylinder);

    drawObject(gl,cylinder,[0.0,0.0,0.0]);

    //RUOTA 4
    scaleCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromScaling(scaleCylinder_matrix, [0.2, 0.05, 0.2]);

    rotationangle = 90;
    rotationCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromRotation(rotationCylinder_matrix, rotationangle, [1, 1, 1]);

    translateCylinder_matrix = glMatrix.mat4.create();
    glMatrix.mat4.fromTranslation(translateCylinder_matrix, [0.6, 0.15, -0.6]);

    MCylinder = glMatrix.mat4.create();
    glMatrix.mat4.mul(MCylinder, rotationCylinder_matrix, scaleCylinder_matrix);
    glMatrix.mat4.mul(MCylinder, translateCylinder_matrix, MCylinder);  

    gl.uniformMatrix4fv(simpleShader.uM, false, MCylinder);

    drawObject(gl,cylinder,[0.0,0.0,0.0]);
    // ---------------------------------------------------------------------------
  }

  function setup(){
    setupWebGL();
    setupWhatToDraw();
    setupHowToDraw();
  }

  function helloRotations(){
    setup();
    id = setInterval(draw, 20);
    }
window.onload = helloRotations;