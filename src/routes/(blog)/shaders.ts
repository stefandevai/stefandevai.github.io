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

	uniform float u_time;

	float quadratic_in_out(float t)
	{
		float p = 2.0 * t * t; return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
	}

	float fade(float time)
	{
		if (time > 1000.0) { return 1.0; }
		return quadratic_in_out(smoothstep(0.0, 500.0, time));
	}

	float rand(vec2 v)
	{
		return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453);
	}

	void main()
	{
		float fog_intensity = 1.0;
		vec4 color = v_color;

		fog_intensity = 1.0 - (v_position.z / 1.8);
		color = vec4(color.xyz, fog_intensity * fade(u_time));

		gl_FragColor = color;
	}
`;
