export type ProgramInfo = {
	program: WebGLProgram;
	attribLocations: {
		vertexPosition: number;
	},
	uniformLocations: {
		projectionMatrix: WebGLUniformLocation | null;
		modelViewMatrix: WebGLUniformLocation | null;
	},
		
};

export type GLBuffers = {
	position: WebGLBuffer;
}

const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);

	if (!shader) {
		console.error("Unable to create shader");
		return null;
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

export const getShaderProgram = (gl: WebGLRenderingContext, vSource: string, fSource: string) => {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);

	const shaderProgram = gl.createProgram();

	if (!shaderProgram) {
		console.error("Unable to create shader program");
		return null;
	}

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
		return null;
	}

	return shaderProgram;
};

const getPositionBuffer = (gl: WebGLRenderingContext) => {
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	const positions = [0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	return positionBuffer;
}

export const getBuffers = (gl: WebGLRenderingContext): GLBuffers => {
	const positionBuffer = getPositionBuffer(gl);

	return {
		position: positionBuffer
	};
}
