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

export type GLBuffers = {
	position: WebGLBuffer;
	element: WebGLBuffer;
	indicesCount: number;
};

const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);

	if (!shader) {
		console.error('Unable to create shader');
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
};

export const getShaderProgram = (gl: WebGLRenderingContext, vSource: string, fSource: string) => {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);

	const shaderProgram = gl.createProgram();

	if (!shaderProgram) {
		console.error('Unable to create shader program');
		return null;
	}

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error(
			`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`
		);
		return null;
	}

	return shaderProgram;
};

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

export const getBuffers = (gl: WebGLRenderingContext): GLBuffers => {
	const [vertices, indices] = buildCircle(0.5, 10);
	const positionBuffer = getPositionBuffer(gl, vertices);
	const elementBuffer = getElementBuffer(gl, indices);

	return {
		position: positionBuffer,
		element: elementBuffer,
		indicesCount: indices.length
	};
};

const buildCircle = (radius: number, segments: number) => {
	const angle = (2 * Math.PI) / segments;
	const vertices = [];
	const indices = [];

	for (let i = 0; i < segments; ++i) {
		const currentAngle = angle * i;
		const x = radius * Math.cos(currentAngle);
		const y = radius * Math.sin(currentAngle);

		vertices.push(x);
		vertices.push(y);
	}

	for (let i = 0; i < segments - 1; ++i) {
		indices.push(i);
		indices.push(i + 1);
	}

	return [vertices, indices];
};
