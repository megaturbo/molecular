/**
 * Created by thomas.roulin on 23.11.2015.
 */

/**
 * Molecule
 *
 * Define a whole molecule
 *
 * @param atoms Array of every atoms that compose the molecule
 * @param links Array of every links between Atoms
 * @constructor
 */
function Molecule(atoms, links) {
    this.atoms = atoms;
    this.links = links;
}

/**
 * Atom
 *
 * Define an atom
 *
 * @param context glContext
 * @param name Name of the atom
 * @param color Display color
 * @param radius Radius of the atom
 * @param position Position in 3D of the Atom
 * @constructor
 */
function Atom(context, name, color, radius, position) {

    this.context = context;

    this.name = name;
    this.color = color;
    this.radius = radius;
    this.position = position;
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
    v1.push(atomVertices[start],
        atomVertices[start + 1],
        atomVertices[start + 2]);

    start = atomIndices[i + 1] * 3;
    v2.push(atomVertices[start],
        atomVertices[start + 1],
        atomVertices[start + 2]);

    start = atomIndices[i + 2] * 3;
    v3.push(atomVertices[start],
        atomVertices[start + 1],
        atomVertices[start + 2]);

    subdivise(v1, v2, v3, ICO_SUBDIVISIONS);
}