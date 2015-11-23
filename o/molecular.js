/**
 * Created by thomas.roulin on 23.11.2015.
 */

/*
 STATICS
 */

// Consts
const ICO_SUBDIVISIONS = 3;
const X = 0.525731112119133696;
const Z = 0.850650808352039932;

// Icosahedron
var INDEX_CNT = 0;
var atomVertices = [];
var atomIndices = [];
var atomColors = [];

var ICO_VERTICES = [];
var ICO_INDICES = [];

ICO_VERTICES.push(-X, 0.0, Z);
ICO_VERTICES.push(X, 0.0, Z);
ICO_VERTICES.push(-X, 0.0, -Z);
ICO_VERTICES.push(X, 0.0, -Z);
ICO_VERTICES.push(0.0, Z, X);
ICO_VERTICES.push(0.0, Z, -X);
ICO_VERTICES.push(0.0, -Z, X);
ICO_VERTICES.push(0.0, -Z, -X);
ICO_VERTICES.push(Z, X, 0.0);
ICO_VERTICES.push(-Z, X, 0.0);
ICO_VERTICES.push(Z, -X, 0.0);
ICO_VERTICES.push(-Z, -X, 0.0);

ICO_INDICES.push(1, 4, 0);
ICO_INDICES.push(4, 9, 0);
ICO_INDICES.push(4, 5, 9);
ICO_INDICES.push(8, 5, 4);
ICO_INDICES.push(1, 8, 4);
ICO_INDICES.push(1, 10, 8);
ICO_INDICES.push(10, 3, 8);
ICO_INDICES.push(8, 3, 5);
ICO_INDICES.push(3, 2, 5);
ICO_INDICES.push(3, 7, 2);
ICO_INDICES.push(3, 10, 7);
ICO_INDICES.push(10, 6, 7);
ICO_INDICES.push(6, 11, 7);
ICO_INDICES.push(6, 0, 11);
ICO_INDICES.push(6, 1, 0);
ICO_INDICES.push(10, 1, 6);
ICO_INDICES.push(11, 0, 9);
ICO_INDICES.push(2, 11, 9);
ICO_INDICES.push(5, 2, 9);
ICO_INDICES.push(11, 2, 7);

// INIT
for (i = 0; i < ICO_INDICES.length; i += 3) {
    var v1 = [];
    var v2 = [];
    var v3 = [];

    var start = atomIndices[i] * 3;
    v1.push(atomVertices[start], atomVertices[start + 1], atomVertices[start + 2]);

    start = atomIndices[i + 1] * 3;
    v2.push(atomVertices[start], atomVertices[start + 1], atomVertices[start + 2]);

    start = atomIndices[i + 2] * 3;
    v3.push(atomVertices[start], atomVertices[start + 1], atomVertices[start + 2]);

    subdivise(v1, v2, v3, ICO_SUBDIVISIONS);
}

/**
 * Molecule
 *
 * Define a whole molecule
 *
 * @param name Molecule's name
 * @param atoms Array of every atoms that compose the molecule
 * @param links Array of every links between Atoms
 * @constructor
 */
function Molecule(name, atoms, links) {
    this.name = name;
    this.atoms = atoms;
    this.links = links;

    this.draw = function (context) {
        this.atoms.forEach(function (atom) {
            atom.draw(context);
        });
    }
}

/**
 * Atom
 *
 * Define an atom
 *
 * @param name Name of the atom
 * @param color Display color
 * @param radius Radius of the atom
 * @param position Position in 3D of the Atom
 * @constructor
 */
function Atom(name, color, radius, position) {

    this.name = name;
    this.color = color;
    this.radius = radius;
    this.position = position;

    console.log("[Atom:" + this.name + "] " + "Creating a vertices buffer with " + atomVertices.length + " vertices");
    console.log("[Atom:" + this.name + "] " + "Creating a colors buffer with " + atomColors.length + " colors");
    console.log("[Atom:" + this.name + "] " + "Creating an indices buffer with " + atomIndices.length + " indices");
    Atom.verticesBuffer = getVertexBufferWithVertices(atomVertices);
    Atom.colorsBuffer = getVertexBufferWithVertices(atomColors);
    Atom.indicesBuffer = getIndexBufferWithIndices(atomIndices);

    this.draw = function (context) {
        context.bindBuffer(context.ARRAY_BUFFER, Atom.verticesBuffer);
        context.vertexAttribPointer(prg.vertexPositionAttribute, 3, context.FLOAT, false, 0, 0);

        context.bindBuffer(context.ARRAY_BUFFER, Atom.colorsBuffer);
        context.vertexAttribPointer(prg.colorAttribute, 4, context.FLOAT, false, 0, 0);

        context.uniform3f(prg.atomPositionUniform, this.position.x, this.position.y, this.position.z);
        context.uniform4f(prg.atomColorUniform, this.color.r, this.color.g, this.color.b, this.color.a);

        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, Atom.indicesBuffer);
        context.drawElements(context.LINES, atomIndices.length, context.UNSIGNED_SHORT, 0);
    }
}


/**
 * Link
 *
 * Define a link between two atoms
 *
 * @param atom1
 * @param atom2
 * @constructor
 */
function Link(atom1, atom2) {
    this.atom1 = atom1;
    this.atom2 = atom2;
}

function Point3d(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

/*
 UTILS
 */

function normalize(v) {
    var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (d != 0.0) {
        v[0] /= d;
        v[1] /= d;
        v[2] /= d;
    }
    return v;
}
function subdivise(v1, v2, v3, depth) {
    var v12 = [];
    var v23 = [];
    var v31 = [];
    var i;

    if (depth == 0) {
        atomVertices.push(v1[0], v1[1], v1[2]);
        atomColors.push(1.0, 0.5, 0.0, 1.0);
        atomVertices.push(v2[0], v2[1], v2[2]);
        atomColors.push(1.0, 0.5, 0.0, 1.0);
        atomVertices.push(v3[0], v3[1], v3[2]);
        atomColors.push(1.0, 0.5, 0.0, 1.0);
        atomIndices.push(INDEX_CNT, INDEX_CNT + 1, INDEX_CNT + 1, INDEX_CNT + 2, INDEX_CNT + 2, INDEX_CNT);
        INDEX_CNT += 3;
    } else {
        for (i = 0; i < 3; i++) {
            v12.push((v1[i] + v2[i]) / 2.0);
            v23.push((v2[i] + v3[i]) / 2.0);
            v31.push((v3[i] + v1[i]) / 2.0);
        }
        v12 = normalize(v12);
        v23 = normalize(v23);
        v31 = normalize(v31);
        subdivise(v1, v12, v31, depth - 1);
        subdivise(v2, v23, v12, depth - 1);
        subdivise(v3, v31, v23, depth - 1);
        subdivise(v12, v23, v31, depth - 1);
    }
}