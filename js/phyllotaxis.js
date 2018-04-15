"use strict";

var renderer = {
  vertexSource: `
  attribute vec3 ipos;
  uniform mat4 transformation;

  varying vec4 frag_pos;
  
  void main() {
    gl_Position = transformation * vec4(ipos, 1.0);
    frag_pos = vec4(gl_Position.xy, ipos.z, 1.0);
    gl_PointSize = 10.0;
  }
  `,

  fragmentSource: `
  precision mediump float;
  varying vec4 frag_pos;

  void main() {
    float lside = pow(gl_PointCoord.x - 0.5, 2.0) + pow(gl_PointCoord.y - 0.5, 2.0);  

    float dist = sqrt(pow(frag_pos.x, 2.0) + pow(frag_pos.y, 2.0));
    float alpha = max(0.1, 1.0 - dist*3.0);

    vec4 pcolor = vec4(227.0/255.0, 46.0/255.0, 42.0/255.0, 1.0);

    if (lside >= 0.0625 && lside <= 0.0745)
      gl_FragColor = vec4(pcolor.xyz, frag_pos.z * alpha * 0.5);
    else if (lside <= 0.0625)
      gl_FragColor = vec4(pcolor.xyz, frag_pos.z * alpha);
    else
      discard;
  }
  `,

  numVertices: 0,
  point_alpha: 0.0,

  resizeCanvas: function(canvas) {
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  },

  createShaderProgram: function(vert_source, frag_source) {
    var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, vert_source);
    this.gl.compileShader(vertShader);
    var success = this.gl.getShaderParameter(vertShader, this.gl.COMPILE_STATUS);
    if (!success) {
      console.log(this.gl.getShaderInfoLog(vertShader));
      return undefined;
    }

    var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, frag_source);
    this.gl.compileShader(fragShader);
    success = this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS);
    if (!success) {
      console.log(this.gl.getShaderInfoLog(fragShader));
      return undefined;
    }

    var program = this.gl.createProgram();
    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);
    success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      console.log(this.gl.getProgramInfoLog(program));

      this.gl.deleteShader(fragShader);
      this.gl.deleteShader(vertShader);
      this.gl.deleteProgram(program);
      return undefined;
    }

    this.gl.deleteShader(fragShader);
    this.gl.deleteShader(vertShader);
    return program;
  },

  vertices: [],
  counter: 1,

  getPhyllotaxisVertices: function () {
    var spread = 0.02;
    var vertices = [];
    var phi = 137.5 * Math.PI/180.0;

    for (var i = 0; i < this.counter; ++i) {
      var theta = phi*i;
      var r = spread * Math.sqrt(i);

      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);

      if (i == this.counter - 1)
        vertices.push(x, y, this.point_alpha);
      else 
        vertices.push(x, y, 1.0);
    }

    this.vertices = vertices;

    if (this.counter == 400) window.clearInterval(this.intervalID);
    else if (this.point_alpha < 1.0) this.point_alpha += 0.08;
    else {
      this.point_alpha = 0.1;
      this.counter++;
    }

  },

  draw: function() {
    this.getPhyllotaxisVertices();

    var vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    var shaderProgram = this.createShaderProgram(this.vertexSource, this.fragmentSource);
    this.gl.useProgram(shaderProgram);

    var model = mat4.create();
    mat4.scale(model, model, vec3.fromValues(Math.min(this.gl.canvas.width, this.gl.canvas.height)/2 - 30, Math.min(this.gl.canvas.width, this.gl.canvas.height)/2 - 30, 1));
    var view = mat4.create();
    mat4.translate(view, view, vec3.fromValues(this.gl.canvas.width/2, this.gl.canvas.height/2, 0));
    mat4.rotate(view, view, 90*Math.PI/180, vec3.fromValues(0, 0, 1));
    var projection = mat4.create();
    mat4.ortho(projection, 0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1);

    var finalTransformation = mat4.create();
    mat4.multiply(finalTransformation, view, model);
    mat4.multiply(finalTransformation, projection, finalTransformation);
    
    var transformationLoc = this.gl.getUniformLocation(shaderProgram, "transformation");
    this.gl.uniformMatrix4fv(transformationLoc, false, finalTransformation);

    this.gl.clearColor(14/255, 15/255, 13/255, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.POINTS, 0, this.vertices.length/3);
  },

  main: function() {
    var canvas = document.getElementById("webgl-canvas");
    this.resizeCanvas(canvas);

    this.gl = canvas.getContext("webgl");
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.intervalID = setInterval(
      (function(self) {
        return function() {
          self.draw();
        }
      })(this), 16);
  },
};

renderer.main();
