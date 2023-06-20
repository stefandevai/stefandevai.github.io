import type { BufferInfo } from './types';

const getPositionBuffer = (gl: WebGLRenderingContext, vertices: number[]) => {
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	return positionBuffer;
};

const getElementBuffer = (gl: WebGLRenderingContext, indices: number[]) => {
	const elementBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	return elementBuffer;
};

export const getBufferInfo = (
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
