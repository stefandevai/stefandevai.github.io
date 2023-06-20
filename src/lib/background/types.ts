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
