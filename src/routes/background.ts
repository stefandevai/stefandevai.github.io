import * as renderer from '$lib/renderer';
// import { buildQuad } from '$lib/renderer/util';
import { getBufferInfo } from '$lib/renderer/buffer';
import { getObjectInfo, rotateObject } from '$lib/renderer/object';
import type { ObjectInfo } from '$lib/renderer/types';
import {
	vertices as sphereVertices,
	indices as sphereIndices,
} from '$lib/renderer/cached-sphere-data';

type Position2D = {
	x: number;
	y: number;
};

const BACKGROUND_COLOR: [number, number, number] = [0.067, 0.067, 0.067]; // #111111

const objects: ObjectInfo[] = [];

const mousePosition: Position2D = {
	x: -1.0,
	y: -1.0,
};
const maxRotationSpeed = 0.002;

const applyMouseRotation = (
	object: ObjectInfo,
	mousePosition: Position2D,
	canvas: HTMLCanvasElement
) => {
	if (
		mousePosition.x < 0.0 ||
		mousePosition.x > canvas.width ||
		mousePosition.y < 0.0 ||
		mousePosition.y > canvas.height ||
		object.rotationInfo == null
	) {
		return;
	}

	const factorX = (mousePosition.x - canvas.width / 2.0) / (canvas.width / 2.0);
	const factorY = (mousePosition.y - canvas.height / 2.0) / (canvas.height / 2.0);
	const rotationY = maxRotationSpeed * factorX;
	const rotationX = maxRotationSpeed * factorY * -1.0;

	object.rotationInfo.rotation = [rotationX, rotationY, object.rotationInfo.rotation[2]];
};

const initObjects = (gl: WebGLRenderingContext, sphereSize: number) => {
	// const [quadVertices, quadIndices] = buildQuad(0.5, 0.5, [0.001, 0.001, 0.001]);
	// const quadBufferInfo = getBufferInfo(gl, quadVertices, quadIndices);
	const sphereBufferInfo = getBufferInfo(gl, sphereVertices, sphereIndices);

	// const quad = getObjectInfo(quadBufferInfo, gl.TRIANGLE_STRIP, [0.0, 0.0, -2.0], [10.0, 5.0, 1.0]);

	const sphere = getObjectInfo(
		sphereBufferInfo,
		gl.LINE_LOOP,
		new Float32Array([0.0, 0.0, -1.5]),
		new Float32Array([sphereSize, sphereSize, 1.0]),
		{
			rotation: [0.001, 0.0, 0.0],
		},
		false
	);

	// objects.push(quad);
	objects.push(sphere);
};

export const init = (gl: WebGLRenderingContext) => {
	renderer.init(gl, BACKGROUND_COLOR);

	if (window.innerWidth <= 768) {
		initObjects(gl, 1.0);
	} else {
		initObjects(gl, 2.0);
	}
};

export const resize = (gl: WebGLRenderingContext, entry: ResizeObserverEntry) => {
	renderer.resize(gl, entry);
};

export const animate = (gl: WebGLRenderingContext, delta: number) => {
	for (const object of objects) {
		if (object.rotationInfo) {
			applyMouseRotation(object, mousePosition, gl.canvas as HTMLCanvasElement);
			rotateObject(object, delta);
		}
	}

	renderer.render(gl, objects);
};

export const clear = () => {
	objects.length = 0;
};

export const setMousePosition = (x: number, y: number) => {
	mousePosition.x = x;
	mousePosition.y = y;
};
