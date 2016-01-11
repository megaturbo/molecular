/**
 * Created by thomas.roulin on 23.11.2015.
 */

/**
 * Just a scene to handle every drawable objects
 *
 * @constructor Create a new Scene (you don't say)
 */
function Scene(){
    this.objects = [];

    this.add = function(object){
        this.objects.push(object);
    };

    this.set = function(object){
        this.objects = [];
        this.add(object);
    };

    this.draw = function(context){
        // init the context
        context.clearColor(0.0, 0.0, 0.0, 1.0);
        context.enable(context.DEPTH_TEST);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
        context.viewport(0, 0, c_width, c_height);
        mat4.perspective(pMatrix, degToRad(60), c_width / c_height, 0.1, 10000.0);

        // Handle user input
        translationMat = mat4.create();
        mat4.identity(translationMat);
        mat4.translate(translationMat, translationMat, [movX, movY, movZ]);
        mvtMatrix = mat4.create();
        mat4.multiply(mvtMatrix, translationMat, mvMatrix);

        rotateModelViewMatrixUsingQuaternion();

        context.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
        context.uniformMatrix4fv(prg.mvMatrixUniform, false, mvtMatrix);

        // And now draw the content of the scene
        this.objects.forEach(function (object){
            object.draw(context);
        });

        // Nice
        rotY = 0;
        rotX = 0;
    };
}
