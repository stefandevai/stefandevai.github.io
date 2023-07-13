import { mat4 } from 'gl-matrix';
import { createTimer, updateTimer } from '$lib/helpers/timer';
import { getProgramInfo } from './shader';
import { resizeCanvasToDisplaySize } from './util';
import type { ObjectInfo, ProgramInfo } from './types';

const timer = createTimer();
let programInfo: null | ProgramInfo = null;
const projectionMatrix = mat4.create();

export const resize = (gl: WebGLRenderingContext, entry: ResizeObserverEntry) => {
	resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement, entry);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	mat4.perspective(
		projectionMatrix,
		(45 * Math.PI) / 180,
		gl.canvas.width / gl.canvas.height,
		0.1,
		100.0
	);
};

export const init = (
	gl: WebGLRenderingContext,
	vertexShaderSource: string,
	fragmentShaderSource: string,
	backgroundColor: [number, number, number] = [0.0, 0.0, 0.0],
	sFactor: number = gl.SRC_ALPHA,
	dFactor: number = gl.ONE_MINUS_SRC_ALPHA
) => {
	programInfo = getProgramInfo(gl, vertexShaderSource, fragmentShaderSource);
	gl.blendFunc(sFactor, dFactor);
	gl.enable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.clearColor(...backgroundColor, 1.0);
};

export const render = (gl: WebGLRenderingContext, objects: ObjectInfo[]) => {
	if (programInfo == null) {
		return;
	}

	updateTimer(timer);
	gl.clear(gl.COLOR_BUFFER_BIT);

	let lastProgram = null;
	let lastBufferInfo = null;
	let lastProjectionMatrix = null;

	for (const object of objects) {
		let bindBuffers = false;

		if (lastProgram !== programInfo.program) {
			gl.useProgram(programInfo.program);
			lastProgram = programInfo;
			bindBuffers = true;
		}
		if (bindBuffers || lastBufferInfo !== object.bufferInfo) {
			gl.bindBuffer(gl.ARRAY_BUFFER, object.bufferInfo.position);

			gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 24, 0);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

			gl.vertexAttribPointer(programInfo.attribLocations.colorPosition, 3, gl.FLOAT, false, 24, 12);
			gl.enableVertexAttribArray(programInfo.attribLocations.colorPosition);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.bufferInfo.element);
			lastBufferInfo = object.bufferInfo;
		}
		if (lastProjectionMatrix !== projectionMatrix) {
			gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
			lastProjectionMatrix = projectionMatrix;
		}

		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			object.uniforms.modelViewMatrix
		);
		gl.uniform1f(programInfo.uniformLocations.ignoreFog, object.uniforms.ignoreFog);

		gl.drawElements(object.drawingMode, object.bufferInfo.indicesCount, gl.UNSIGNED_SHORT, 0);
	}

	// Move inside loop if we're using more than one shader program
	gl.uniform1f(programInfo.uniformLocations.time, timer.elapsed);
};
