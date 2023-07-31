#extension GL_OES_standard_derivatives : enable

precision mediump float;

varying lowp vec4 v_color;
varying lowp vec4 v_position;

uniform float u_time;
uniform vec2 u_resolution;

const int MAX_MARCHING_STEPS = 55;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.01;

float smin(float a, float b, float k)
{
  float h = max(k-abs(a-b), 0.0)/k;
  return min(a, b) - h*h*h*k*(1.0/6.0);
}

float cube_sdf(vec3 p, float r)
{
  vec3 d = abs(p) - vec3(r);
  float inside_distance = min(max(d.x, max(d.y, d.z)), 0.0);
  float outside_distance = length(max(d, 0.0));
  
  return inside_distance + outside_distance;
}

float sphere_sdf(vec3 p, float radius)
{
  return length(p) - radius;
}

float tetrahedron_sdf(vec3 p, float r)
{
  return (max(
	    abs(p.x+p.y)-p.z,
	    abs(p.x-p.y)+p.z
	)-r)/sqrt(3.);
}

float dodecahedron_sdf(vec3 p, float r)
{
	float G=sqrt(5.)*.5+.5;
	vec3 n=normalize(vec3(G,1,0));
	float d=0.;
    p=abs(p);
    d=max(d,dot(p,n));
    d=max(d,dot(p,n.yzx));
    d=max(d,dot(p,n.zxy));
	return d-r;
}

float icosahedron_sdf(vec3 p, float r)
{
	float G=sqrt(5.)*.5+.5;
	vec3 n=normalize(vec3(G,1./G,0));
	float d=0.;
    p=abs(p);
    d=max(d,dot(p,n));
    d=max(d,dot(p,n.yzx));
    d=max(d,dot(p,n.zxy));
	  d=max(d,dot(p,normalize(vec3(1))));
    return d-r;
}

float octahedron_sdf(vec3 p, float s)
{
  p = abs(p);
  return (p.x+p.y+p.z-s)*0.57735027;
}

float union_sdf(float a, float b) { return smin(a, b, .2); }

float intersect_sdf(float a, float b) { return max(a, b); }

float difference_sdf(float a, float b) { return max(a, -b); }

float displacement(vec3 p)
{
  float t = u_time * 0.001;
  float fs = 5.;
  float f = 0.21;
  return sin(fs*p.x + t) * sin(fs*p.z + t*2.) * sin(fs*p.y) * f;
  /* return sin(5.*p.x + time)*sin(5.*p.y + time)*cos(5.*p.z + time)*time*0.1; */
  /* return sin(2.5*p.x)*sin(2.5*p.y - time)*cos(2.5*p.z + time); */
}

float exp_easing(float t)
{
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (14.0 * t) - 7.0)
      : -0.5 * pow(2.0, 7.0 - (t * 14.0)) + 1.0;
}

float quadratic_in_out(float t)
{
  float p = 2.0 * t * t;
  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

mat4 rotate_y(float theta)
{
    float c = cos(theta);
    float s = sin(theta);

    return mat4(
        vec4(c, 0, s, 0),
        vec4(0, 1, 0, 0),
        vec4(-s, 0, c, 0),
        vec4(0, 0, 0, 1)
    );
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat4 inverse(mat4 m) {
  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}

float scene_sdf(vec3 p)
{
  p = vec3(p.x - 2.9, p.y + quadratic_in_out(sin(u_time*.0015)*.3 + .5)*1.2 - 1.1, p.z);
  p = (inverse(rotate_y(u_time*.001)) * vec4(p, 1.)).xyz;

  /* float sphere = sphere_sdf(p, 1.3); */
  /* float cube = cube_sdf(p + vec3(0.,0. + sin(u_time * 0.001),0.), 1.); */

  /* return union_sdf(cube, sphere); */
  /* return sphere_sdf(p, 1.3); */

  float num_shapes = 6.;
  float single_scene_time = 2000.;
  float transition_delay = 500.;
  float total_time = single_scene_time * num_shapes + transition_delay * num_shapes;
  float mt = mod(u_time, total_time);

  int mid = int(floor((mt) / (single_scene_time + transition_delay)));
  float bound1 = float(mid+1) * single_scene_time + float(mid) * transition_delay;
  float bound2 = bound1 + transition_delay;

  // Morphing easing function 
  /* float mf = smoothstep(bound1, bound2, mt); */
  float mf = exp_easing(max(0., (mt - bound1)/transition_delay));

  float shape1, shape2;

  if (mid == 0)
  {
    shape1 = sphere_sdf(p, 1.3);
    shape2 = tetrahedron_sdf(p, .9);
  }
  else if (mid == 1)
  {
    shape1 = tetrahedron_sdf(p, .9);
    shape2 = cube_sdf(p, .9);
  }
  else if (mid == 2)
  {
    shape1 = cube_sdf(p, .9);
    shape2 = octahedron_sdf(p, 1.3);
  }
  else if (mid == 3)
  {
    shape1 = octahedron_sdf(p, 1.3);
    shape2 = dodecahedron_sdf(p, 1.1);
  }
  else if (mid == 4)
  {
    shape1 = dodecahedron_sdf(p, 1.1);
    shape2 = icosahedron_sdf(p, 1.2);
  }
  else
  {
    shape1 = icosahedron_sdf(p, 1.2);
    shape2 = sphere_sdf(p, 1.3);
  }

  /* return mix(shape1, shape2, mf) + displacement(p); */
  return mix(shape1, shape2, mf);


  // ======================================
  // Particles
  // ======================================

  /* const float num_particles = 2.; */
  /* float total = sphere_sdf(p, 1.3); */

  /* float time = u_time*.001; */

  /* for (float i = 0.; i < num_particles; i += 1.) */
  /* { */
  /*   total = union_sdf(total, sphere_sdf(p + vec3(sin(time*1.3 + 476.*i)*2., cos(time + 987.*i)*2., .0), .1)); */
  /* } */

  /* return total; */
}

vec3 ray_direction(float fov, vec2 size, vec2 frag_coord)
{
  vec2 xy = frag_coord - size / 2.0;
  float z = size.y / tan(radians(fov) / 2.0);
  return normalize(vec3(xy, -z));
}

float shortest_distance(vec3 eye, vec3 marching_dir, float start, float end)
{
  float depth = start;

  for (int i = 0; i < MAX_MARCHING_STEPS; ++i)
  {
    float dist = scene_sdf(eye + depth * marching_dir);

    if (dist < EPSILON)
    {
      return depth;
    }

    depth += dist;

    if (depth >= end)
    {
      return end;
    }
  }

  return end;
}

vec3 calc_normal(vec3 p)
{
  return normalize(vec3(
    scene_sdf(vec3(p.x + EPSILON, p.y, p.z)) - scene_sdf(vec3(p.x - EPSILON, p.y, p.z)),
    scene_sdf(vec3(p.x, p.y + EPSILON, p.z)) - scene_sdf(vec3(p.x, p.y - EPSILON, p.z)),
    scene_sdf(vec3(p.x, p.y, p.z + EPSILON)) - scene_sdf(vec3(p.x, p.y, p.z - EPSILON))
  ));
}

vec3 lambert(vec3 diffuse, vec3 p, vec3 light_pos, vec3 light_intensity)
{
  vec3 light = normalize(light_pos - p);
  vec3 normal = calc_normal(p);

  float dot_ln = dot(light, normal);

  // Light not visible
  if (dot_ln < 0.)
  {
    return vec3(0.);
  }

  return light_intensity * (diffuse * dot_ln);
}

vec3 illumination(vec3 ambient, vec3 diffuse, vec3 p)
{
  const vec3 ambient_light = vec3(.25,.45,.5);
  /* const vec3 ambient_light = .5 * vec3(1.); */
  vec3 color = ambient_light * ambient;
  vec3 light_pos = vec3(1.,20.,15.);
  /* vec3 light_pos = vec3(5.,10.,25.); */
  vec3 light_intensity = vec3(.6);

  color += lambert(diffuse, p, light_pos, light_intensity);

  return color;
}

mat4 view_matrix(vec3 eye, vec3 center, vec3 up)
{
  vec3 f = normalize(center - eye);
  vec3 s = normalize(cross(f, up));
  vec3 u = cross(s, f);
  return mat4(
      vec4(s, 0.0),
      vec4(u, 0.0),
      vec4(-f, 0.0),
      vec4(0.0, 0.0, 0.0, 1)
  );
}


void main()
{
  vec3 eye = vec3(8.,5.,12.);
  /* vec3 eye = vec3(1.,1.,15.); */
  vec3 dir = ray_direction(45., u_resolution.xy, gl_FragCoord.xy);

  mat4 view_to_world = view_matrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
  vec3 world_dir = (view_to_world * vec4(dir, 0.)).xyz;

  float dist = shortest_distance(eye, world_dir, MIN_DIST, MAX_DIST);

  /* // Shiny edges */
  /* float aaf = fwidth(dist); */
  /* float f = smoothstep(MAX_DIST - EPSILON - aaf, MAX_DIST - EPSILON, dist); */
  /* gl_FragColor = vec4(1.,1.,1.,aaf); */
  /* return; */

  if (dist > MAX_DIST - EPSILON)
  {
    gl_FragColor = vec4(.0,.0,.0,.0);
    return;
  }

  vec3 p = eye + dist * world_dir;
  vec3 ambient = vec3(0.851,0.824,0.792) * .8;
  vec3 diffuse = vec3(0.129,0.757,0.435);

  vec3 color = illumination(ambient, diffuse, p);

  gl_FragColor = vec4(color,1.);
}
