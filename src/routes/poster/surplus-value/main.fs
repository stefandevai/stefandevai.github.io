#extension GL_OES_standard_derivatives : enable
#define PI 3.14159265358979
#define TWO_PI 6.28318530718
#define HALF_PI 1.5707963267948966

precision mediump float;

varying lowp vec4 v_color;
varying lowp vec4 v_position;

uniform float u_time;
uniform vec2 u_resolution;

struct Ball {
  vec2 pos;
  float r;
};

float rng (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float meta(vec2 p, float radius) {
  // return radius/(dot(p,p) + 0.0002);
  return radius/(dot(p,p) + 0.022);
}

float elastic_in_out(float t) {
  return t < 0.5
    ? 0.5 * sin(+13.0 * HALF_PI * 2.0 * t) * pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * sin(-13.0 * HALF_PI * ((2.0 * t - 1.0) + 1.0)) * pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}
float circular_in_out(float t) {
return t < 0.5
  ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
  : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}

float render_ball(Ball ball, vec2 p) {
  float field = meta(p - ball.pos, ball.r);
  return field * 0.1;
}

float render_balls() {
  vec2 p = (gl_FragCoord.xy-vec2(u_resolution.x*.67, u_resolution.y*.48))/u_resolution.y;
  float time = u_time*0.0005;

  float total_fs = .0;

  Ball ball1;
  ball1.pos = vec2(cos(time*2.3 + 62.)*0.05, sin(time + 82.)*0.15);
  // ball1.r = abs(circular_in_out(abs(cos(time*7.))))*0.7 + 0.2;
  ball1.r = 0.4;

  float field = render_ball(ball1, p);

  Ball ball2;
  ball2.pos = vec2(cos(time*1.9 + 47.)*0.2, sin(time*3.2 + 32.)*0.2);
  ball2.r = 0.26;

  field += render_ball(ball2, p);

  Ball ball3;
  ball3.pos = vec2(sin(time*1.6 + 397.)*0.2, cos(time*3.2 + 982.)*0.2);
  ball3.r = 0.17;

  field += render_ball(ball3, p);

  return max(0.4, min(1.8, field));

  // float fw_de = fwidth(field);
  // return smoothstep(0., fw_de, field - 1.);
}

void main()
{
  vec3 shape_color = vec3(0.2, 0.5, 0.9);
  // vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  // uv.y *= u_resolution.y/u_resolution.x;
  
  float color = render_balls();

  // gl_FragColor = vec4(color, 1.0);
  // float red = shape_color.x * color + sin(u_time*0.0007)*0.11;
  // float green = shape_color.y * color + cos(u_time*0.0005)*0.11;
  // gl_FragColor = vec4(red, green, shape_color.z * color, color);
  gl_FragColor = vec4(shape_color * color, color);
}
