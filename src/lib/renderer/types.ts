import { mat4 } from 'gl-matrix';

export type ProgramInfo = {
	program: WebGLProgram;
	attribLocations: {
		vertexPosition: number;
	};
	uniformLocations: {
		projectionMatrix: WebGLUniformLocation | null;
		modelViewMatrix: WebGLUniformLocation | null;
	};
};

export type BufferInfo = {
	position: WebGLBuffer;
	element: WebGLBuffer;
	indicesCount: number;
};

export type ObjectInfo = {
	programInfo: ProgramInfo;
	bufferInfo: BufferInfo;
	modelViewMatrix: mat4;
};
