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

	void main() {
		float fogIntensity = 1.0;

		if (uIgnoreFog < 0.5) {
			fogIntensity = 1.0 - (vPosition.z / 1.8);
		}

		gl_FragColor = vec4(vColor.xyz, fogIntensity);
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

		gl.drawElements(gl.LINE_LOOP, object.bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}
};
