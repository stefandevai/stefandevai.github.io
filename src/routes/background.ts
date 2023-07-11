import * as renderer from '$lib/renderer';
// import { buildQuad } from '$lib/renderer/util';
import { getBufferInfo } from '$lib/renderer/buffer';
import { getObjectInfo, rotateObject } from '$lib/renderer/object';
import type { ObjectInfo } from '$lib/renderer/types';
import {
	vertices as sphereVertices,
	indices as sphereIndices,
} from '$lib/renderer/cached-sphere-data';

const BACKGROUND_COLOR = [0.067, 0.067, 0.067]; // #111111

const objects: ObjectInfo[] = [];

const initObjects = (gl: WebGLRenderingContext, sphereSize: number) => {
	// const [quadVertices, quadIndices] = buildQuad(0.5, 0.5, [0.001, 0.001, 0.001]);
	// const quadBufferInfo = getBufferInfo(gl, quadVertices, quadIndices);
	const sphereBufferInfo = getBufferInfo(gl, sphereVertices, sphereIndices);

	// const quad = getObjectInfo(
	// 	quadBufferInfo,
	// 	[0.0, 0.0, -0.1],
	// 	[1.0, 1.0, 1.0],
	// 	{
	// 		rotation: [0.0, 0.0, 0.0],
	// 	},
	// 	gl.TRIANGLE_STRIP,
	// 	true
	// );

	const sphere = getObjectInfo(
		sphereBufferInfo,
		[0.0, -0.07, -1.5],
		[sphereSize, sphereSize, 1.0],
		{
			rotation: [0.001, 0.0, 0.0],
		},
		gl.LINE_LOOP
	);

	// objects.push(quad);
	objects.push(sphere);
};

export const init = (gl: WebGLRenderingContext) => {
	renderer.init(gl, BACKGROUND_COLOR);

	if (gl.canvas.width <= 768) {
		initObjects(gl, 1.0);
	} else {
		initObjects(gl, 2.0);
	}
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


