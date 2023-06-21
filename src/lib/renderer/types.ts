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

export type RotationInfo = {
	rotation: number[];
	pauseDuration?: number;
	pausedTime?: number;
	moveDuration?: number;
	movingTime?: number;
	rotationCenter?: number[];
};

export type ObjectInfo = {
	bufferInfo: BufferInfo;
	modelViewMatrix: mat4;
	rotationInfo: RotationInfo;
};
