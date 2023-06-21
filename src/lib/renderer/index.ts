import { mat4 } from 'gl-matrix';
import { getProgramInfo } from './shader';
import { getBufferInfo } from './buffer';
import { getObjectInfo, rotateObject } from './object';
import { buildCircle, resizeCanvasToDisplaySize } from './util';
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

	const [squareVertices, squareIndices] = buildCircle(0.5, 4, [0.89, 0.129, 0.063]);
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);

	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, -0.1, 100.0);
	const radiusUnit = 15.0;
	const canvasCenterX = gl.canvas.width / 2.0;
	const canvasCenterY = gl.canvas.height / 2.0;

	const objects: ObjectInfo[] = [];

	const circle1 = getObjectInfo(
		projectionMatrix,
		circleBufferInfo,
		programInfo,
		[canvasCenterX, canvasCenterY, 0.0],
		[radiusUnit * 24, radiusUnit * 24, 1.0],
		{ rotation: [0.0, 0.0, -0.002] }
	);
	const circle2 = getObjectInfo(
		projectionMatrix,
		circleBufferInfo,
		programInfo,
		[canvasCenterX - radiusUnit * 2, canvasCenterY - radiusUnit * 2, 0.0],
		[radiusUnit * 12, radiusUnit * 12, 1.0],
		{ rotation: [0.0, 0.0, 0.01], pauseDuration: 500.0, moveDuration: 500.0 }
	);
	const square = getObjectInfo(
		projectionMatrix,
		squareBufferInfo,
		programInfo,
		[canvasCenterX - radiusUnit * 12, canvasCenterY, 0.0],
		[radiusUnit * 1.3, radiusUnit * 1.3, 1.0],
		{ rotation: [0.0, 0.0, 0.005], rotationCenter: [9.25, 0.0, 0.0] }
	);

	objects.push(circle1, circle2, square);

	const animate = () => {
		for (const object of objects) {
			rotateObject(object, 0.01667);
		}

		drawScene(gl, objects);
		requestAnimationFrame(animate);
	};

	animate();
};
