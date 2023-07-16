import * as renderer from '$lib/renderer';
import { buildQuad } from '$lib/renderer/util';
import { getBufferInfo } from '$lib/renderer/buffer';
import { getObjectInfo } from '$lib/renderer/object';
import fragmentShaderSource from './main.fs';
import vertexShaderSource from './main.vs';
import type { ObjectInfo } from '$lib/renderer/types';

const BACKGROUND_COLOR: [number, number, number] = [0.851, 0.824, 0.792]; // #d9d2ca

const objects: ObjectInfo[] = [];

const initObjects = (gl: WebGLRenderingContext) => {
	const [quadVertices, quadIndices] = buildQuad(0.5, 0.5, [0.851, 0.824, 0.792]);
	const quadBufferInfo = getBufferInfo(gl, quadVertices, quadIndices);

	const quad = getObjectInfo(
		quadBufferInfo,
		gl.TRIANGLE_STRIP,
		new Float32Array([0.0, 0.0, -2.0]),
		new Float32Array([10.0, 5.0, 1.0])
	);

	objects.push(quad);
};

export const init = (gl: WebGLRenderingContext) => {
	gl.getExtension('OES_standard_derivatives');
	renderer.init(gl, vertexShaderSource, fragmentShaderSource, BACKGROUND_COLOR);
	initObjects(gl);
};

export const resize = (gl: WebGLRenderingContext, entry: ResizeObserverEntry) => {
	renderer.resize(gl, entry);
};

export const animate = (gl: WebGLRenderingContext) => {
	renderer.render(gl, objects);
};

export const clear = () => {
	objects.length = 0;
};
