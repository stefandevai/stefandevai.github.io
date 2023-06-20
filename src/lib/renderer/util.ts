import { mat4 } from 'gl-matrix';

export const buildCircle = (radius: number, segments: number, color: number[]) => {
	const angle = (2 * Math.PI) / segments;
	const vertices = [];
	const indices = [];

	for (let i = 0; i < segments; ++i) {
		const currentAngle = angle * i;
		const x = radius * Math.cos(currentAngle);
		const y = radius * Math.sin(currentAngle);

		vertices.push(x);
		vertices.push(y);
		vertices.push(...color);
	}

	for (let i = 0; i < segments - 1; ++i) {
		indices.push(i);
		indices.push(i + 1);
	}

	return [vertices, indices];
};

export const buildSquare = (color: number[]) => {
	const vertices = [-0.5, -0.5, ...color, 0.5, -0.5, ...color, 0.5, 0.5, ...color, -0.5, 0.5, ...color];
	const indices = [0, 1, 2, 3];

	return [vertices, indices];
};

export const computeMatrix = (
	modelViewMatrix: mat4,
	translation: number[],
	rotation: number[],
	scale: number[],
	addHalfSize: boolean = false,
) => {
	let translateX = translation[0];
	let translateY = translation[1];

	if (addHalfSize) {
		translateX = translation[0] + 1.0 + scale[0] / 2.0;
		translateY = translation[1] + 1.0 + scale[1] / 2.0;
	}

	mat4.translate(modelViewMatrix, modelViewMatrix, [translateX, translateY, translation[2]]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
	mat4.scale(modelViewMatrix, modelViewMatrix, scale);
	return modelViewMatrix;
};

export const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		return true;
	}

	return false;
};
