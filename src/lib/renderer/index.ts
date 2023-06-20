import { mat4 } from 'gl-matrix';
import { getShaderProgram } from './shader';
import { getPositionBuffer, getElementBuffer } from './buffer';
import { buildCircle, buildSquare, resizeCanvasToDisplaySize } from './util';
import type { ProgramInfo, BufferInfo, ObjectInfo } from './types';

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

const computeMatrix = (
	modelViewMatrix: mat4,
	translation: number[],
	rotation: number[],
	scale: number[]
) => {
	mat4.translate(modelViewMatrix, modelViewMatrix, translation);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
	mat4.scale(modelViewMatrix, modelViewMatrix, scale);
	return modelViewMatrix;
};

const drawScene = (gl: WebGLRenderingContext, objects: ObjectInfo[]) => {
	gl.clearColor(0.067, 0.067, 0.067, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	let lastProgram = null;
	let lastBufferInfo = null;
	let lastProjectionMatrix = null;

	for (const object of objects) {
		let bindBuffers = false;

		if (lastProgram !== object.programInfo.program) {
			gl.useProgram(object.programInfo.program);
			lastProgram = object.programInfo.program;
			bindBuffers = true;
		}
		if (bindBuffers || lastBufferInfo !== object.bufferInfo) {
			gl.bindBuffer(gl.ARRAY_BUFFER, object.bufferInfo.position);
			gl.vertexAttribPointer(
				object.programInfo.attribLocations.vertexPosition,
				2,
				gl.FLOAT,
				false,
				0,
				0
			);
			gl.enableVertexAttribArray(object.programInfo.attribLocations.vertexPosition);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.bufferInfo.element);
			lastBufferInfo = object.bufferInfo;
		}
		if (lastProjectionMatrix !== object.uniforms.projectionMatrix) {
			gl.uniformMatrix4fv(
				object.programInfo.uniformLocations.projectionMatrix,
				false,
				object.uniforms.projectionMatrix
			);
			lastProjectionMatrix = object.uniforms.projectionMatrix;
		}

		gl.uniformMatrix4fv(
			object.programInfo.uniformLocations.modelViewMatrix,
			false,
			object.uniforms.modelViewMatrix
		);

		gl.drawElements(gl.LINE_LOOP, object.bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}
};

export const animateBackground = (gl: WebGLRenderingContext) => {
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	const [circleVertices, circleIndices] = buildCircle(0.5, 10);
	const circleBufferInfo = getBufferInfo(gl, circleVertices, circleIndices);

	const [squareVertices, squareIndices] = buildSquare();
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);

	const objects: ObjectInfo[] = [];

	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, 0.1, 100.0);

	const circle1ModelViewMatrix = mat4.create();
	objects.push({
		bufferInfo: circleBufferInfo,
		programInfo: programInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(
				circle1ModelViewMatrix,
				[400.0, 200.0, -10.0],
				[0.0, 0.0, 0.0],
				[200.0, 200.0, 0.0]
			),
			projectionMatrix
		}
	});

	const circle2ModelViewMatrix = mat4.create();
	objects.push({
		bufferInfo: circleBufferInfo,
		programInfo: programInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(
				circle2ModelViewMatrix,
				[700.0, 300.0, -10.0],
				[0.0, 0.0, 0.0],
				[100.0, 100.0, 0.0]
			),
			projectionMatrix
		}
	});

	const squareModelViewMatrix = mat4.create();
	objects.push({
		bufferInfo: squareBufferInfo,
		programInfo: programInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(
				squareModelViewMatrix,
				[300.0, 300.0, -10.0],
				[0.0, 0.0, 0.0],
				[80.0, 80.0, 0.0]
			),
			projectionMatrix
		}
	});

	drawScene(gl, objects);
};
