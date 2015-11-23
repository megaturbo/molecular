/**
 * Created by thomas.roulin on 23.11.2015.
 */

var scene = null;

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
}

function initScene(){
    initMolecular();
    scene = new Scene();

    // Creating a molecule
    var white = new Color(1.0, 1.0, 1.0, 1.0);
    var red = new Color(1.0, 0.0, 0.0, 1.0);

    var atoms = [
        new Atom("H", white, 0.2, new Point3d(-0.76537, 0.0, 0.19508)),
        new Atom("H", white, 0.2, new Point3d(0.76357, 0.0, 0.19508)),
        new Atom("O", red, 0.35, new Point3d(0.0, 0.7, -0.39016))
    ];

    var links = [
        new Link(atoms[0], atoms[2]),
        new Link(atoms[1], atoms[2])
    ];

    scene.add(new Molecule("Water (H2O)", atoms, links));
}