/**
 * Created by thomas.roulin on 23.11.2015.
 */

var scene = null;
var molecules = [];

function initWebGL() {
    console.log("initWebGL");
    glContext = getGLContext('webgl-canvas');
    initProgram();
    initScene();
    renderLoop();
}

function drawScene() {
    scene.draw(glContext);

    var nMatrix = mat4.create();
    mat4.copy(nMatrix, mvMatrix);
    mat4.invert(nMatrix, nMatrix);
    mat4.transpose(nMatrix, nMatrix);
    glContext.uniformMatrix4fv(prg.nMatrixUniform, false, nMatrix);
}

function initShaderParameters(prg) {
    console.log("initShaderParameters");
    // Object
    prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
    glContext.enableVertexAttribArray(prg.vertexPositionAttribute);

    // View
    prg.pMatrixUniform = glContext.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');
    prg.nMatrixUniform = glContext.getUniformLocation(prg, 'uNMatrix');


    // Atoms
    prg.atomExplode = glContext.getUniformLocation(prg, "uAtomExplode");
    prg.atomPositionUniform = glContext.getUniformLocation(prg, "uAtomPosition");
    prg.atomColorUniform = glContext.getUniformLocation(prg, "uAtomColor");
    prg.atomRadiusUniform = glContext.getUniformLocation(prg, "uAtomRadius");

    // Lights
    prg.shininessUniform           = glContext.getUniformLocation(prg, 'uShininess');
    prg.lightAmbientUniform        = glContext.getUniformLocation(prg, 'uLightAmbient');
    prg.materialDiffuseUniform     = glContext.getUniformLocation(prg, 'uMaterialDiffuse');
    prg.materialSpecularUniform    = glContext.getUniformLocation(prg, 'uMaterialSpecular');
    prg.lightPositionUniform       = glContext.getUniformLocation(prg, 'uLightPosition');
}

function initLights(){
    console.log("initLights");
    glContext.uniform3f(prg.lightPositionUniform, 1, 1, 1);
    glContext.uniform3f(prg.lightAmbientUniform,0.7,0.3,0.1);
    glContext.uniform3f(prg.materialSpecularUniform, 0.5,0.5,0.5);
    glContext.uniform3f(prg.materialDiffuseUniform, 0.3,0.3,0.3);
    glContext.uniform1f(prg.shininessUniform, 12.0);
}

function initScene() {
    initLights();
    initMolecular();
    scene = new Scene();

    var ethane = [
        new Atom(ATOM_HYDROGEN, new Point3d(1.185080, -0.003838, 0.987524)),
        new Atom(ATOM_CARBON, new Point3d(0.751621, -0.022441, -0.020839)),
        new Atom(ATOM_HYDROGEN, new Point3d(1.166929, 0.833015, -0.569312)),
        new Atom(ATOM_HYDROGEN, new Point3d(1.115519, -0.932892, -0.514525)),
        new Atom(ATOM_CARBON, new Point3d(-0.751587, 0.022496, 0.020891)),
        new Atom(ATOM_HYDROGEN, new Point3d(-1.166882, -0.833372, 0.568699)),
        new Atom(ATOM_HYDROGEN, new Point3d(-1.115691, 0.932608, 0.515082)),
        new Atom(ATOM_HYDROGEN, new Point3d(-1.184988, 0.004424, -0.987522))

    ];

    var sulfuric_acid = [
        new Atom(ATOM_SULFUR, new Point3d(0.0, 0.0, 0.1248)),
        new Atom(ATOM_OXYGEN, new Point3d(1.251, -0.0349, 0.8)),
        new Atom(ATOM_OXYGEN, new Point3d(-1.251, 0.0349, 0.8)),
        new Atom(ATOM_OXYGEN, new Point3d(0.0, -1.2172, -0.8732)),
        new Atom(ATOM_OXYGEN, new Point3d(0.0, 1.2172, -0.8732)),
        new Atom(ATOM_HYDROGEN, new Point3d(-0.3548, 1.9933, -0.4121)),
        new Atom(ATOM_HYDROGEN, new Point3d(0.3548, -1.9933, -0.4121))
    ];

    var water = [
        new Atom(ATOM_HYDROGEN, new Point3d(-0.76357, 0.0, 0.19508)),
        new Atom(ATOM_HYDROGEN, new Point3d(0.76357, 0.0, 0.19508)),
        new Atom(ATOM_OXYGEN, new Point3d(0.0, 0.0, -0.39016))
    ];

    var methane = [
        new Atom(ATOM_CARBON, new Point3d(0.000000, 0.000000, 0.000000)),
        new Atom(ATOM_HYDROGEN, new Point3d(0.628736, 0.628736, 0.628736)),
        new Atom(ATOM_HYDROGEN, new Point3d(-0.628736, -0.628736, 0.628736)),
        new Atom(ATOM_HYDROGEN, new Point3d(-0.628736, 0.628736, -0.628736)),
        new Atom(ATOM_HYDROGEN, new Point3d(0.628736, -0.628736, -0.628736))
    ];

    var carbon_tetrachloride = [
        new Atom(ATOM_CARBON, new Point3d(0.0, 0.0, 0.0)),
        new Atom(ATOM_CHLORINE, new Point3d(0.0, 0.0, 1.75)),
        new Atom(ATOM_CHLORINE, new Point3d(1.649916, 0.0, -0.583333)),
        new Atom(ATOM_CHLORINE, new Point3d(-0.824958, -1.428869, -0.583333)),
        new Atom(ATOM_CHLORINE, new Point3d(-0.824958, 1.428869, -0.583333))
    ];


    molecules.push(new Molecule("Water (H2O)", water));
    molecules.push(new Molecule("Ethane (C2H6)", ethane));
    molecules.push(new Molecule("Sulfuric Acid (H2SO4)", sulfuric_acid));
    molecules.push(new Molecule("Methane (CH4)", methane));
    molecules.push(new Molecule("Carbon Tetrachloride (CCl4)", carbon_tetrachloride));

    initSelect();
    scene.set(molecules[0]);
}

function addMolecule(molecule)
{
    molecules.push(molecule);
    initSelect();
}

function setMolecule(id) {
    scene.set(molecules[id]);
}