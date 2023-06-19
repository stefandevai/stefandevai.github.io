<script lang="ts">
	import { onMount } from 'svelte';
	import { mat4 } from 'gl-matrix';
	import { getShaderProgram, getBuffers } from '$lib/gl';
	import type { ProgramInfo, GLBuffers } from '$lib/gl';

	let canvas;

	const vertexShaderSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

	const fragmentShaderSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

	const setPositionAttribute = (gl: WebGLRenderingContext, buffers: GLBuffers, programInfo: ProgramInfo) => {
		const numComponents = 2;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset
		);

		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}

	function resizeCanvasToDisplaySize(canvas) {
		 const width = canvas.clientWidth;
		 const height = canvas.clientHeight;

		 if (canvas.width !== width || canvas.height !== height) {
			 canvas.width = width;
			 canvas.height = height;
			 return true;
		 }

		 return false;
	}

	const drawScene = (gl: WebGLRenderingContext, programInfo: ProgramInfo, buffers: GLBuffers) => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		resizeCanvasToDisplaySize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clear(gl.COLOR_BUFFER_BIT);

		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		/* mat4.ortho(projectionMatrix, -10.0, 10.0, -10.0 / aspect, 10.0 / aspect, zNear, zFar); */
		mat4.ortho(projectionMatrix, 0.0, gl.canvas.width, gl.canvas.height, 0.0, zNear, zFar);

		const modelViewMatrix = mat4.create();
		mat4.translate(
			modelViewMatrix,
			modelViewMatrix,
			[28.0, 28.0, -10.0]
		);
		mat4.scale(
			modelViewMatrix,
			modelViewMatrix,
			[32.0, 32.0, 0.0],
		);

		setPositionAttribute(gl, buffers, programInfo);

		gl.useProgram(programInfo.program);

		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			projectionMatrix
		);

		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			modelViewMatrix
		);

		{
			const offset = 0;
			const vertexCount = 4;
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
		}
	}

	onMount(() => {
		const gl = canvas.getContext('webgl');

		if (gl === null) {
			console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
			return;
		}

		const shaderProgram = getShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
				modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
			},
		};

		const buffers = getBuffers(gl);

		drawScene(gl, programInfo, buffers)
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		background-color: black;
		height: 70vh;
		width: 100vw;
	}
</style>
