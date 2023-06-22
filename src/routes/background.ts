import * as renderer from '$lib/renderer';
import { buildCircle, buildSphere, buildIcosahedron } from '$lib/renderer/util';
import { getBufferInfo } from '$lib/renderer/buffer';
import { getObjectInfo, rotateObject } from '$lib/renderer/object';
import type { ObjectInfo } from '$lib/renderer/types';

const BACKGROUND_COLOR = [0.067, 0.067, 0.067]; // #111111
const GEAR_COLOR = [0.333, 0.333, 0.333]; // #555555
const SQUARE_COLOR = [0.89, 0.129, 0.063]; // #e32110

const objects: ObjectInfo[] = [];

const initObjects = (gl: WebGLRenderingContext) => {
	const [sphereVertices, sphereIndices] = buildSphere(0.5, 10, GEAR_COLOR);
	const sphereBufferInfo = getBufferInfo(gl, sphereVertices, sphereIndices);

	const [icosahedronVertices, icosahedronIndices] = buildIcosahedron(0.3, GEAR_COLOR);
	const icosahedronBufferInfo = getBufferInfo(gl, icosahedronVertices, icosahedronIndices);

	const [circleVertices, circleIndices] = buildCircle(0.5, 10, SQUARE_COLOR);
	const circleBufferInfo = getBufferInfo(gl, circleVertices, circleIndices);

	const [squareVertices, squareIndices] = buildCircle(0.5, 4, SQUARE_COLOR);
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const radiusUnit = 15.0;
	const canvasCenterX = gl.canvas.width / 2.0;
	const canvasCenterY = gl.canvas.height / 2.0;

	const circle1 = getObjectInfo(
		sphereBufferInfo,
		// icosahedronBufferInfo,
		// [canvasCenterX, canvasCenterY, 0.0],
		// [radiusUnit * 24, radiusUnit * 24, 1.0],
		// { rotation: [0.0, 0.0, -0.002] }
		// { rotation: [0.001, 0.0, 0.0] }
		[0.0, 0.0, -1.5],
		[1.0, 1.0, 1.0],
		{ rotation: [0.001, 0.0, 0.0] }
		// { rotation: [0.01, 0.0, 0.007], pauseDuration: 500.0, moveDuration: 500.0 }
	);

	const circle2 = getObjectInfo(
		// circleBufferInfo,
		// [canvasCenterX - radiusUnit * 2, canvasCenterY - radiusUnit * 2, 0.0],
		// [radiusUnit * 12, radiusUnit * 12, 1.0],
		// { rotation: [0.0, 0.0, 0.01], pauseDuration: 500.0, moveDuration: 500.0 }
		circleBufferInfo,
		[0.0, 0.0, -1.5],
		[0.5, 0.5, 1.0],
		{ rotation: [0.0, 0.0, 0.01], pauseDuration: 500.0, moveDuration: 500.0 }
	);

	const square = getObjectInfo(
		squareBufferInfo,
		// [canvasCenterX - radiusUnit * 12, canvasCenterY, 0.0],
		// [radiusUnit * 1.3, radiusUnit * 1.3, 1.0],
		// { rotation: [0.0, 0.0, 0.005], rotationCenter: [9.25, 0.0, 0.0] }
		[-0.35, 0.0, -1.5],
		[0.1, 0.1, 1.0],
		// { rotation: [0.0, 0.0, 0.005] }
		{ rotation: [0.0, 0.0, 0.005], rotationCenter: [6.25, 0.0, 0.0] }
	);

	// objects.push(circle1, circle2, square);
	objects.push(circle1, square);
};

export const init = (gl: WebGLRenderingContext) => {
	renderer.init(gl, BACKGROUND_COLOR);
	initObjects(gl);
};

export const resize = (gl: WebGLRenderingContext) => {
	renderer.resize(gl);
};

export const animate = (gl: WebGLRenderingContext, delta: number) => {
	for (const object of objects) {
		rotateObject(object, delta);
	}

	renderer.render(gl, objects, BACKGROUND_COLOR);
};

export const clear = () => {
	objects.length = 0;
};
