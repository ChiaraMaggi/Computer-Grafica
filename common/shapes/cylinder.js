//DEFINIZIONE DEL CILINDRO con altezza 2.0 e raggio 1.0

//resolution: numero di facce utilizzate per tassellare il cilindro
function Cylinder(resolution){
    this.name = "cylinder";

    //definzione dei vertici
    this.vertices = new Float32Array(3*(2*resolution+2));

    var radius = 1.0;
    var angle; 
    var step = 6.28318530718 / resolution;

    var vertexoffset = 0;

    //cerchio inferiore
    for(var i=0; i<resolution; i++){
        
        angle = step*i;

        this.vertices[vertexoffset] = radius * Math.cos(angle);
        this.vertices[vertexoffset+1] = 0.0;
        this.vertices[vertexoffset+2] = radius * Math.sin(angle);
        vertexoffset += 3;
    }

    //cerchio superiore
    for(var i=0; i<resolution; i++){
        
        angle = step*i;

        this.vertices[vertexoffset] = radius * Math.cos(angle);
        this.vertices[vertexoffset+1] = 2.0;
        this.vertices[vertexoffset+2] = radius * Math.sin(angle);
        vertexoffset += 3;
    }
    
    this.vertices[vertexoffset] = 0.0;
    this.vertices[vertexoffset+1] = 0.0;
    this.vertices[vertexoffset+2] = 0.0;
    vertexoffset += 3;

    this.vertices[vertexoffset] = 0.0;
    this.vertices[vertexoffset+1] = 2.0;
    this.vertices[vertexoffset+2] = 0.0;

    //definzione triangoli
    this.triangleIndices = new Uint16Array(3 * 4 * resolution);

    //lateral surface
    var triangleoffset = 0;
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = i;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = (i % resolution) + resolution;
		triangleoffset += 3;
		
		this.triangleIndices[triangleoffset] = (i % resolution) + resolution;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = ((i+1) % resolution) + resolution;
		triangleoffset += 3;
	}
	
	// bottom of the cylinder
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = i;
		this.triangleIndices[triangleoffset+1] = (i+1) % resolution;
		this.triangleIndices[triangleoffset+2] = 2*resolution;
		triangleoffset += 3;
	}
	
	// top of the cylinder
	for (var i = 0; i < resolution; i++)
	{
		this.triangleIndices[triangleoffset] = resolution + i;
		this.triangleIndices[triangleoffset+1] = ((i+1) % resolution) + resolution;
		this.triangleIndices[triangleoffset+2] = 2*resolution+1;
		triangleoffset += 3;
	}
		
	this.numVertices = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length/3;
}
        