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

	#define PI 3.14159265359
	#define TWO_PI 6.28318530718

	varying lowp vec4 v_color;
	varying lowp vec4 v_position;

	uniform float u_time;
	uniform vec2 u_resolution;

	float circle(in vec2 _uv, in vec2 _pos, in float _radius) {
    vec2 dist = _uv-vec2(_pos);
		return smoothstep(_radius-(_radius*0.003),
					  					_radius+(_radius*0.003),
											dot(dist,dist)*4.0);
	}

	float polygon(in vec2 _uv, in vec2 _pos, in float _radius, in int _sides) {
		_uv = _uv - _pos;
		float a = atan(_uv.x, _uv.y) + PI;
		float r = TWO_PI/float(_sides);
		float result = cos(floor(.5+a/r)*r-a)*length(_uv) * (1.5 - _radius);
		return smoothstep(.4,.401,result);
	}

	float explosion(in vec2 _uv, in vec2 _pos, in float _radius, in int _sides) {
		_uv = _uv - _pos;
		float a = atan(_uv.x, _uv.y) + PI;
		float r = TWO_PI/float(_sides);
		float result = cos(floor(13.5+a/r)*r-a)*length(_uv) * (6.0 - _radius);
		return smoothstep(.4,.401,result);
	}

	float mehrwert(in vec2 _uv, in vec2 _pos, in float _radius, in int _sides) {
		_uv = _uv - _pos;
		float a = atan(_uv.x, _uv.y) + PI;
		float r = TWO_PI/float(_sides);
		float result = cos(floor(.5+a/r)*r-a)*length(_uv) * (3.0 - _radius);
		return smoothstep(.4,.401,result);
	}

	struct MetaBall {
		float r;
		vec2 pos;
		vec3 col;
	};

	vec4 ball_sdf(MetaBall ball, vec2 uv) {
		float dst = ball.r / length(uv - ball.pos);
		return vec4(ball.col * dst, dst);
	}

	void main()
	{
		vec4 shape_color = vec4(0.9, 0.3, 0.4, 1.0);
		vec2 uv = gl_FragCoord.xy/u_resolution.xy;
		uv.y *= u_resolution.y/u_resolution.x;

		// float circle_value = circle(uv, vec2(0.7, 0.25), 0.2);
		// vec4 color = mix(shape_color, v_color, circle_value);
		// vec4 color = mix(shape_color, v_color, mehrwert(uv, vec2(0.22, 0.15), 0.0, 6));
		MetaBall ball1;
		ball1.pos = vec2(.5,.5);
		ball1.r = 0.3;
		ball1.col = vec3(0.9, 0.3, 0.4);
		vec4 color = ball_sdf(ball1, uv);

		gl_FragColor = vec4(color);
	}
`;
