import { mat4 } from 'gl-matrix';
import type { ProgramInfo, BufferInfo, ObjectInfo, RotationInfo } from './types';
import { computeMatrix } from './util';

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
			modelViewMatrix: computeMatrix(mat4.create(), translation, [0.0, 0.0, 0.0], scale, true),
			projectionMatrix
		},
		rotationInfo: {
			...rotationInfo,
			movingTime: 0.0,
			pausedTime: 0.0
		}
	};
};

export const rotateObject = (object: ObjectInfo, delta: number) => {
	const modelViewMatrix = object.uniforms.modelViewMatrix;
	const rotation = object.rotationInfo.rotation;

	// Normal rotation without pauses
	if (
		object.rotationInfo.moveDuration === undefined &&
		object.rotationInfo.pauseDuration === undefined
	) {
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
		return;
	}

	// Pause and rotation behavior
	if (object.rotationInfo.movingTime > 0.0) {
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[2], [0, 0, 1]);
		object.rotationInfo.movingTime -= delta * 1000.0;

		if (object.rotationInfo.pausedTime <= 0.0) {
			object.rotationInfo.pausedTime = object.rotationInfo.pauseDuration;
		}
	} else if (object.rotationInfo.pausedTime > 0.0) {
		object.rotationInfo.pausedTime -= delta * 1000.0;
	}

	if (object.rotationInfo.pausedTime <= 0.0 && object.rotationInfo.movingTime <= 0.0) {
		object.rotationInfo.movingTime = object.rotationInfo.moveDuration;
	}
};
