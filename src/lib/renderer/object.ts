import { mat4 } from 'gl-matrix';
import type { ProgramInfo, BufferInfo, ObjectInfo, RotationInfo } from './types';

export const computeMatrix = (
	modelViewMatrix: mat4,
	translation: number[],
	rotation: number[],
	scale: number[]
) => {
	mat4.translate(modelViewMatrix, modelViewMatrix, translation);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
	mat4.scale(modelViewMatrix, modelViewMatrix, scale);
	return modelViewMatrix;
};

const computeRotation = (matrix: mat4, rotation: number[], rotationCenter?: number[]) => {
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

export const rotateObject = (object: ObjectInfo, delta: number) => {
	const modelViewMatrix = object.uniforms.modelViewMatrix;
	const rotation = object.rotationInfo.rotation;
	const moveDuration = object.rotationInfo.moveDuration;
	const pauseDuration = object.rotationInfo.pauseDuration;
	const rotationCenter = object.rotationInfo.rotationCenter;

	// Normal rotation without pauses
	if (moveDuration === undefined && pauseDuration === undefined) {
		computeRotation(modelViewMatrix, rotation, rotationCenter);
		return;
	}

	// Pause and rotation behavior
	if (object.rotationInfo.movingTime > 0.0) {
		computeRotation(modelViewMatrix, rotation, rotationCenter);
		object.rotationInfo.movingTime -= delta * 1000.0;

		if (object.rotationInfo.pausedTime <= 0.0) {
			object.rotationInfo.pausedTime = pauseDuration;
		}
	} else if (object.rotationInfo.pausedTime > 0.0) {
		object.rotationInfo.pausedTime -= delta * 1000.0;
	}

	if (object.rotationInfo.pausedTime <= 0.0 && object.rotationInfo.movingTime <= 0.0) {
		object.rotationInfo.movingTime = moveDuration;
	}
};

export const getObjectInfo = (
	projectionMatrix: mat4,
	bufferInfo: BufferInfo,
	programInfo: ProgramInfo,
	translation: number[],
	scale: number[],
	rotationInfo: RotationInfo
): ObjectInfo => {
	return {
		bufferInfo: bufferInfo,
		programInfo: programInfo,
		uniforms: {
			modelViewMatrix: computeMatrix(mat4.create(), translation, [0.0, 0.0, 0.0], scale),
			projectionMatrix
		},
		rotationInfo: {
			...rotationInfo,
			movingTime: 0.0,
			pausedTime: 0.0
		}
	};
};
