/**
 * Created by thomas.roulin on 23.11.2015.
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
        //colors.push(color.r, color.g, color.b, color.a);
        atomVertices.push(v2[0], v2[1], v2[2]);
        //colors.push(color.r, color.g, color.b, color.a);
        atomVertices.push(v3[0], v3[1], v3[2]);
        //colors.push(color.r, color.g, color.b, color.a);
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