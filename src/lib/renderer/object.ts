import { mat4 } from 'gl-matrix';
import type { BufferInfo, ObjectInfo, RotationInfo } from './types';

export const computeMatrix = (
	modelViewMatrix: mat4,
	translation: Float32Array,
	rotation: Float32Array,
	scale: Float32Array
) => {
	mat4.translate(modelViewMatrix, modelViewMatrix, translation);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
	mat4.scale(modelViewMatrix, modelViewMatrix, scale);
	return modelViewMatrix;
};

const computeRotation = (matrix: mat4, rotation: number[], rotationCenter?: Float32Array) => {
	if (rotationCenter) {
		mat4.translate(matrix, matrix, rotationCenter);
	}

	mat4.rotate(matrix, matrix, rotation[0], [1, 0, 0]);
	mat4.rotate(matrix, matrix, rotation[1], [0, 1, 0]);
	mat4.rotate(matrix, matrix, rotation[2], [0, 0, 1]);

	if (rotationCenter) {
		mat4.translate(matrix, matrix, [-rotationCenter[0], -rotationCenter[1], -rotationCenter[2]]);
	}
};

export const rotateObject = (object: ObjectInfo) => {
	if (!object.rotationInfo) {
		return;
	}

	const modelViewMatrix = object.uniforms.modelViewMatrix;
	const rotation = object.rotationInfo.rotation;
	const rotationCenter = object.rotationInfo.rotationCenter;

	computeRotation(modelViewMatrix, rotation, rotationCenter);
};

export const getObjectInfo = (
	bufferInfo: BufferInfo,
	drawingMode: number,
	translation: Float32Array,
	scale: Float32Array,
	rotationInfo?: RotationInfo,
	ignoreFog = true
): ObjectInfo => {
	return {
		bufferInfo: bufferInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(
				mat4.create(),
				translation,
				new Float32Array([0.0, 0.0, 0.0]),
				scale
			),
			ignoreFog: ignoreFog ? 1.0 : 0.0,
		},
		rotationInfo,
		drawingMode,
	};
};
