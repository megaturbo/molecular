/**
 * Created by thomas.roulin on 23.11.2015.
 */

var scene = null;
var molecules = [];

function initWebGL(){
    glContext = getGLContext('webgl-canvas');
    initProgram();
    initScene();
    renderLoop();
}

function drawScene(){
    scene.draw(glContext);
}

function initShaderParameters(prg) {
    prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
    glContext.enableVertexAttribArray(prg.vertexPositionAttribute);
    prg.colorAttribute = glContext.getAttribLocation(prg, "aColor");
    glContext.enableVertexAttribArray(prg.colorAttribute);

    prg.pMatrixUniform = glContext.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');

    prg.atomPositionUniform = glContext.getUniformLocation(prg, "uAtomPosition");
    prg.atomColorUniform = glContext.getUniformLocation(prg, "uAtomColor");
    prg.atomRadiusUniform = glContext.getUniformLocation(prg, "uAtomRadius");
}

function initScene(){
    initMolecular();
    scene = new Scene();

    var H_RADIUS = 1.2;
    var O_RADIUS = 1.52;
    var C_RADIUS = 1.70;

    // Creating a molecule
    var white = new Color(1.0, 1.0, 1.0, 1.0);
    var red = new Color(1.0, 0.0, 0.0, 1.0);
    var orange = new Color(1.0, 0.5, 0.0, 1.0);

    var ethanAtom = [
        new Atom("H", white, H_RADIUS, new Point3d(1.185080, -0.003838,  0.987524)),
        new Atom("C", orange, C_RADIUS, new Point3d(0.751621, -0.022441, -0.020839)),
        new Atom("H", white, H_RADIUS, new Point3d(1.166929,  0.833015, -0.569312)),
        new Atom("H", white, H_RADIUS, new Point3d(1.115519, -0.932892, -0.514525)),
        new Atom("C", orange, C_RADIUS, new Point3d(-0.751587,  0.022496,  0.020891)),
        new Atom("H", white, H_RADIUS, new Point3d(-1.166882, -0.833372,  0.568699)),
        new Atom("H", white, H_RADIUS, new Point3d(-1.115691,  0.932608,  0.515082)),
        new Atom("H", white, H_RADIUS, new Point3d(-1.184988,  0.004424, -0.987522))

    ];

    var atoms = [
        new Atom("H", white, H_RADIUS, new Point3d(-0.76357, 0.0, 0.19508)),
        new Atom("H", white, H_RADIUS, new Point3d(0.76357, 0.0, 0.19508)),
        new Atom("O", red, O_RADIUS, new Point3d(0.0, 0.0, -0.39016))
    ];

    var links = [
        new Link(atoms[0], atoms[2]),
        new Link(atoms[1], atoms[2])
    ];

    molecules.push(new Molecule("Water (H2O)", atoms, links));
    molecules.push(new Molecule("Ethane (C2H6)", ethanAtom, links));

    scene.set(molecules[0])
}

function setMolecule(id){
    scene.set(molecules[id]);
}