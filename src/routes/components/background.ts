import { mat4 } from 'gl-matrix';
import { initRenderer, render } from '$lib/renderer';
import { buildCircle } from '$lib/renderer/util';
import { getBufferInfo } from '$lib/renderer/buffer';
import { getObjectInfo, rotateObject } from '$lib/renderer/object';
import type { ObjectInfo } from '$lib/renderer/types';

const objects: ObjectInfo[] = [];

const initObjects = (gl: WebGLRenderingContext) => {
	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, -0.1, 100.0);

	const [circleVertices, circleIndices] = buildCircle(0.5, 10, [0.333, 0.333, 0.333]);
	const circleBufferInfo = getBufferInfo(gl, circleVertices, circleIndices);

	const [squareVertices, squareIndices] = buildCircle(0.5, 4, [0.89, 0.129, 0.063]);
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const radiusUnit = 15.0;
	const canvasCenterX = gl.canvas.width / 2.0;
	const canvasCenterY = gl.canvas.height / 2.0;

	const circle1 = getObjectInfo(
		projectionMatrix,
		circleBufferInfo,
		[canvasCenterX, canvasCenterY, 0.0],
		[radiusUnit * 24, radiusUnit * 24, 1.0],
		{ rotation: [0.0, 0.0, -0.002] }
	);

	const circle2 = getObjectInfo(
		projectionMatrix,
		circleBufferInfo,
		[canvasCenterX - radiusUnit * 2, canvasCenterY - radiusUnit * 2, 0.0],
		[radiusUnit * 12, radiusUnit * 12, 1.0],
		{ rotation: [0.0, 0.0, 0.01], pauseDuration: 500.0, moveDuration: 500.0 }
	);

	const square = getObjectInfo(
		projectionMatrix,
		squareBufferInfo,
		[canvasCenterX - radiusUnit * 12, canvasCenterY, 0.0],
		[radiusUnit * 1.3, radiusUnit * 1.3, 1.0],
		{ rotation: [0.0, 0.0, 0.005], rotationCenter: [9.25, 0.0, 0.0] }
	);

	objects.push(circle1, circle2, square);
};

export const init = (gl: WebGLRenderingContext) => {
	initRenderer(gl);
	initObjects(gl);
};

export const animate = (gl: WebGLRenderingContext, delta: number) => {
	for (const object of objects) {
		rotateObject(object, delta);
	}

	render(gl, objects);
};
