import { mat4 } from 'gl-matrix';
import { getShaderProgram } from './shader';
import { getPositionBuffer, getElementBuffer } from './buffer';
import { buildCircle, buildSquare, computeMatrix, resizeCanvasToDisplaySize } from './util';
import type { ProgramInfo, BufferInfo, ObjectInfo } from './types';

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
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			colorPosition: gl.getAttribLocation(shaderProgram, 'aVertexColor')
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
		}
	};
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
				20,
				0
			);
			gl.enableVertexAttribArray(object.programInfo.attribLocations.vertexPosition);

			gl.vertexAttribPointer(
				object.programInfo.attribLocations.colorPosition,
				3,
				gl.FLOAT,
				false,
				20,
				8
			);
			gl.enableVertexAttribArray(object.programInfo.attribLocations.colorPosition);
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

	const [circleVertices, circleIndices] = buildCircle(0.5, 10, [0.333, 0.333, 0.333]);
	const circleBufferInfo = getBufferInfo(gl, circleVertices, circleIndices);

	const [squareVertices, squareIndices] = buildSquare([0.89, 0.129, 0.063]);
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);

	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, -0.1, 100.0);
	const radiusUnit = 15.0;
	const bigCircleCenterX = gl.canvas.width / 2.0 - radiusUnit * 12;
	const bigCircleCenterY = gl.canvas.height / 2.0 - radiusUnit * 12;
	let frame = 0;

	const objects: ObjectInfo[] = [];

	const circle1ModelViewMatrix = mat4.create();
	objects.push({
		bufferInfo: circleBufferInfo,
		programInfo: programInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(
				circle1ModelViewMatrix,
				[bigCircleCenterX, bigCircleCenterY, 0.0],
				[0.0, 0.0, -frame * 0.002],
				[radiusUnit * 24, radiusUnit * 24, 0.0],
				true,
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
				[bigCircleCenterX + radiusUnit * 4, bigCircleCenterY + radiusUnit * 4, 0.0],
				[0.0, 0.0, frame * 0.01],
				[radiusUnit * 12, radiusUnit * 12, 0.0],
				true,
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
				[bigCircleCenterX, bigCircleCenterY, 0.0],
				[0.0, 0.0, frame * 0.005],
				[radiusUnit, radiusUnit, 0.0],
				true,
			),
			projectionMatrix
		}
	});

	const animate = () => {
		computeMatrix(
			objects[0].uniforms.modelViewMatrix,
			[0.0, 0.0, 0.0],
			[0.0, 0.0, -0.002],
			[1.0, 1.0, 1.0]
		);
		computeMatrix(
			objects[1].uniforms.modelViewMatrix,
			[0.0, 0.0, 0.0],
			[0.0, 0.0, 0.01],
			[1.0, 1.0, 1.0]
		);
		computeMatrix(
			objects[2].uniforms.modelViewMatrix,
			[0.0, 0.0, 0.0],
			[0.0, 0.0, 0.005],
			[1.0, 1.0, 1.0]
		);

		drawScene(gl, objects);

		++frame;
		requestAnimationFrame(animate);
	}

	animate();
};
