export const vertexShaderSource = `
	attribute vec4 a_vertex_position;
	attribute vec3 a_vertex_color;

	uniform mat4 u_model_view_matrix;
	uniform mat4 u_projection_matrix;

	varying lowp vec4 v_color;
	varying lowp vec4 v_position;

	void main() {
		gl_Position = u_projection_matrix * u_model_view_matrix * a_vertex_position;
		v_color = vec4(a_vertex_color, 1.0);
		v_position = gl_Position;
	}
`;

export const fragmentShaderSource = `
	precision mediump float;

	varying lowp vec4 v_color;
	varying lowp vec4 v_position;

	uniform float u_ignore_fog;
	uniform float u_time;

	void main()
	{
		gl_FragColor = v_color;
	}
`;
