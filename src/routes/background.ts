import * as renderer from '$lib/renderer';
import { buildCircle, buildSphere } from '$lib/renderer/util';
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

	const [squareVertices, squareIndices] = buildCircle(0.5, 4, SQUARE_COLOR);
	const squareBufferInfo = getBufferInfo(gl, squareVertices, squareIndices);

	const sphere = getObjectInfo(sphereBufferInfo, [0.0, 0.0, -1.5], [1.0, 1.0, 1.0], {
		rotation: [0.001, 0.0, 0.0]
	});

	const square = getObjectInfo(
		squareBufferInfo,
		[0.6, 0.0, -1.5],
		[0.1, 0.1, 1.0],
		{ rotation: [0.0, 0.0, 0.02], pauseDuration: 500.0, moveDuration: 500.0 },
		true
	);

	// objects.push(sphere, square);
	objects.push(sphere);
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
