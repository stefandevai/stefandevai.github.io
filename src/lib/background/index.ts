import { mat4 } from 'gl-matrix';
import { getShaderProgram } from './shader';
import { getPositionBuffer, getElementBuffer } from './buffer';
import { buildCircle, resizeCanvasToDisplaySize } from './util';
import type { ProgramInfo, BufferInfo } from './types';

const vertexShaderSource = `
	attribute vec4 aVertexPosition;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`;

const fragmentShaderSource = `
	void main() {
		gl_FragColor = vec4(0.333, 0.333, 0.333, 1.0);
	}
`;

const getBufferInfo = (
	gl: WebGLRenderingContext,
	vertices: number[],
	indices: number[]
): BufferInfo => {
	const positionBuffer = getPositionBuffer(gl, vertices);
	const elementBuffer = getElementBuffer(gl, indices);

	return {
		position: positionBuffer,
		element: elementBuffer,
		indicesCount: indices.length
	};
};

const getProgramInfo = (
	gl: WebGLRenderingContext,
	vSource: string,
	fSource: string
): ProgramInfo => {
	const shaderProgram = getShaderProgram(gl, vSource, fSource);

	return {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
		}
	};
};

const drawScene = (gl: WebGLRenderingContext, programInfo: ProgramInfo, bufferInfo: BufferInfo) => {
	gl.clearColor(0.067, 0.067, 0.067, 1.0);
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.clear(gl.COLOR_BUFFER_BIT);

	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, 0.1, 100.0);

	const modelViewMatrix = mat4.create();
	mat4.translate(modelViewMatrix, modelViewMatrix, [400.0, 200.0, -10.0]);
	mat4.scale(modelViewMatrix, modelViewMatrix, [200.0, 200.0, 0.0]);

	gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.position);
	gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

	gl.useProgram(programInfo.program);
	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	{
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.element);
		gl.drawElements(gl.LINE_LOOP, bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}
};

export const animateBackground = (gl: WebGLRenderingContext) => {
	const [circleVertices, circleIndices] = buildCircle(0.5, 10);
	const circleBufferInfo = getBufferInfo(gl, circleVertices, circleIndices);

	const programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);

	drawScene(gl, programInfo, circleBufferInfo);
};
