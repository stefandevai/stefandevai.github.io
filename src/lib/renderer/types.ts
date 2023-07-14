import type { mat4 } from 'gl-matrix';

export type ProgramInfo = {
	program: WebGLProgram;
	attribLocations: {
		vertexPosition: number;
		colorPosition: number;
	};
	uniformLocations: {
		projectionMatrix: WebGLUniformLocation | null;
		modelViewMatrix: WebGLUniformLocation | null;
		time: WebGLUniformLocation | null;
		resolution: WebGLUniformLocation | null;
	};
};

export type BufferInfo = {
	position: null | WebGLBuffer;
	element: null | WebGLBuffer;
	indicesCount: number;
};

export type RotationInfo = {
	rotation: number[];
	rotationCenter?: Float32Array;
};

export type ObjectInfo = {
	bufferInfo: BufferInfo;
	uniforms: {
		modelViewMatrix: mat4;
	};
	rotationInfo?: RotationInfo;
	drawingMode: number;
};
