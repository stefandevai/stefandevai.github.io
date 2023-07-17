precision mediump float;

varying lowp vec4 v_color;
varying lowp vec4 v_position;

uniform float u_time;
uniform vec2 u_resolution;

struct Ball {
  vec2 pos;
  float r;
};

float meta(vec2 p, float radius) {
  return radius/(dot(p,p) + 0.022);
}

float render_ball(Ball ball, vec2 p) {
  float field = meta(p - ball.pos, ball.r);
  return field * 0.1;
}

float render_balls() {
  vec2 p = (gl_FragCoord.xy-vec2(u_resolution.x*.7, u_resolution.y*.48))/u_resolution.y;
  float time = u_time*0.0005;

  float total_fs = .0;

  Ball ball1;
  ball1.pos = vec2(cos(time*2.3 + 62.)*0.05, sin(time + 82.)*0.15);
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

  return min(1.8, field);
}

void main()
{
  vec3 gradient1 = vec3(0.2, 0.5, 0.9);
  vec3 gradient2 = vec3(0.749,0.725,0.643);
  

  float color = render_balls();
  vec3 shape_color = mix(gradient1, gradient2, color*0.3 + v_position.y*sin(u_time*0.0005)*0.6);


  gl_FragColor = vec4(shape_color * color, color);
}
