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

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = vec4(aVertexColor, 1.0);
	}
`;

const fragmentShaderSource = `
	varying lowp vec4 vColor;

	void main() {
		gl_FragColor = vColor;
	}
`;

let programInfo: ProgramInfo = null;
const projectionMatrix = mat4.create();

export const resize = (gl: WebGLRenderingContext) => {
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, -0.1, 100.0);
};

export const init = (gl: WebGLRenderingContext, backgroundColor = [0.0, 0.0, 0.0]) => {
	resize(gl);
	programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);
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
			gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 20, 0);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

			gl.vertexAttribPointer(programInfo.attribLocations.colorPosition, 3, gl.FLOAT, false, 20, 8);
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

		gl.drawElements(gl.LINE_LOOP, object.bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}
};
