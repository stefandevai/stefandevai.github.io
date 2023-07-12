import type { ProgramInfo } from './types';

const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);

	if (!shader) {
		console.error('Unable to create shader');
		return null;
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	// Commenting out error handling to increase load performance
	// if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	// 	console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
	// 	gl.deleteShader(shader);
	// 	return null;
	// }

	return shader;
};

const getShaderProgram = (gl: WebGLRenderingContext, vSource: string, fSource: string) => {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);

	const shaderProgram = gl.createProgram();

	if (!shaderProgram || !vertexShader || !fragmentShader) {
		console.error('Unable to create shader program');
		return;
	}

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	// Commenting out error handling to increase load performance
	// if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	// 	console.error(
	// 		`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`
	// 	);
	// 	return;
	// }

	return shaderProgram;
};

const getProgramInfo = (
	gl: WebGLRenderingContext,
	vSource: string,
	fSource: string
): null | ProgramInfo => {
	const shaderProgram = getShaderProgram(gl, vSource, fSource);

	if (shaderProgram == null) {
		return null;
	}

	return {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'a_vertex_position'),
			colorPosition: gl.getAttribLocation(shaderProgram, 'a_vertex_color'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'u_projection_matrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'u_model_view_matrix'),
			ignoreFog: gl.getUniformLocation(shaderProgram, 'u_ignore_fog'),
			time: gl.getUniformLocation(shaderProgram, 'u_time'),
		},
	};
};

export { getProgramInfo };
