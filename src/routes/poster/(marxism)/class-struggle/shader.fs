precision mediump float;

varying lowp vec4 v_color;
varying lowp vec4 v_position;

uniform float u_time;
uniform vec2 u_resolution;

float circle_sdf(vec2 uv, vec2 pos, float r)
{
  return length(uv - pos) - r;
}

void main()
{
  vec3 brand_color = vec3(.9,.1,.3);
  vec2 uv = 2.*gl_FragCoord.xy/u_resolution.xy - 1.;
  uv.x *= u_resolution.x/u_resolution.y;

  float pos = .2;
  float mult = 6.;

  float d1 = circle_sdf(uv, vec2(-pos,0.), .5);
  float d2 = circle_sdf(uv, vec2(pos,0.), .5);
  float d3 = circle_sdf(uv, vec2(0.0,pos), .5);
  float d4 = circle_sdf(uv, vec2(0.0,-pos), .5);
  float color = min(d1, d2);
  color = min(color, d3);
  color = min(color, d4);

  float pattern = color*mult - u_time*.0001;
  pattern = mod(pattern,.5) > .25
    ? smoothstep(.25,.27,pattern)
    : smoothstep(.03,.01,pattern);

  pattern = max(pattern, 0.8);

  color = smoothstep(0., 0.01, color * pattern);

  gl_FragColor = vec4(min(color, pattern) * brand_color, 1.);
}
