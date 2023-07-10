import { mat4 } from 'gl-matrix';
import { getProgramInfo } from './shader';
import { resizeCanvasToDisplaySize } from './util';
import type { ObjectInfo } from './types';

const vertexShaderSource = `
	attribute vec4 aVertexPosition;
	attribute vec3 aVertexColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;
	varying lowp vec4 vPosition;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = vec4(aVertexColor, 1.0);
		vPosition = gl_Position;
	}
`;

const fragmentShaderSource = `
	precision mediump float;

	varying lowp vec4 vColor;
	varying lowp vec4 vPosition;

	uniform float uIgnoreFog;

	#define PI 3.14159265358979323846

	vec2 rotate2D(vec2 _st, float _angle){
			_st -= 0.5;
			_st =  mat2(cos(_angle),-sin(_angle),
									sin(_angle),cos(_angle)) * _st;
			_st += 0.5;
			return _st;
	}

	vec2 tile(vec2 _st, float _zoom){
			_st *= _zoom;
			return fract(_st);
	}

	float box(vec2 _st, vec2 _size, float _smoothEdges){
			_size = vec2(0.5)-_size*0.5;
			vec2 aa = vec2(_smoothEdges*0.5);
			vec2 uv = smoothstep(_size,_size+aa,_st);
			uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
			return uv.x*uv.y;
	}

	void main() {
		float fogIntensity = 1.0;
		vec4 color = vColor;

		if (uIgnoreFog < 0.5) {
			fogIntensity = 1.0 - (vPosition.z / 1.8);
			color = vec4(color.xyz, fogIntensity);
		}
		else {
			vec2 st = gl_FragCoord.xy / vec2(50.0, 50.0);
			st = tile(st, 4.0);
			st = rotate2D(st, PI * 0.25);
			float box_color = box(st, vec2(0.7), 0.01);
			color = vec4(vec3(1.0, 0.0, 0.0) * box_color, 0.1);
		}

		gl_FragColor = color;
	}
`;

let programInfo: ProgramInfo = null;
const projectionMatrix = mat4.create();

export const resize = (gl: WebGLRenderingContext) => {
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	mat4.perspective(
		projectionMatrix,
		(45 * Math.PI) / 180,
		gl.canvas.width / gl.canvas.height,
		0.1,
		100.0
	);
};

export const init = (gl: WebGLRenderingContext, backgroundColor = [0.0, 0.0, 0.0]) => {
	resize(gl);
	programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	gl.enable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.clearColor(...backgroundColor, 1.0);
};

export const render = (gl: WebGLRenderingContext, objects: ObjectInfo[]) => {
	gl.clear(gl.COLOR_BUFFER_BIT);

	let lastProgram = null;
	let lastBufferInfo = null;
	let lastProjectionMatrix = null;

	for (const object of objects) {
		let bindBuffers = false;

		if (lastProgram !== programInfo.program) {
			gl.useProgram(programInfo.program);
			lastProgram = programInfo;
			bindBuffers = true;
		}
		if (bindBuffers || lastBufferInfo !== object.bufferInfo) {
			gl.bindBuffer(gl.ARRAY_BUFFER, object.bufferInfo.position);
			gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 24, 0);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

			gl.vertexAttribPointer(programInfo.attribLocations.colorPosition, 3, gl.FLOAT, false, 24, 12);
			gl.enableVertexAttribArray(programInfo.attribLocations.colorPosition);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.bufferInfo.element);
			lastBufferInfo = object.bufferInfo;
		}
		if (lastProjectionMatrix !== projectionMatrix) {
			gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
			lastProjectionMatrix = projectionMatrix;
		}

		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			object.uniforms.modelViewMatrix
		);
		gl.uniform1f(programInfo.uniformLocations.ignoreFog, object.uniforms.ignoreFog);

		gl.drawElements(object.drawingMode, object.bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}
};
