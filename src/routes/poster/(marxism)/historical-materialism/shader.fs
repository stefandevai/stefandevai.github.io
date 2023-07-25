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

float cube_sdf(vec3 p)
{
  vec3 d = abs(p) - vec3(1.0, 1.0, 1.0);
  float inside_distance = min(max(d.x, max(d.y, d.z)), 0.0);
  float outside_distance = length(max(d, 0.0));
  
  return inside_distance + outside_distance;
}

float sphere_sdf(vec3 p, float radius)
{
  return length(p) - radius;
}


float union_sdf(float a, float b) { return smin(a, b, .2); }

float intersect_sdf(float a, float b) { return max(a, b); }

float difference_sdf(float a, float b) { return max(a, -b); }


float octahedron_sdf(vec3 p, float s)
{
  p = abs(p);
  return (p.x+p.y+p.z-s)*0.57735027;
}

float displacement(vec3 p)
{
  float t = u_time * 0.001;
  float fs = 5.;
  float f = .21;
  return sin(fs*p.x + t) * sin(fs*p.z + t*2.) * sin(fs*p.y) * f;
  /* return sin(5.*p.x + time)*sin(5.*p.y + time)*cos(5.*p.z + time)*time*0.1; */
  /* return sin(2.5*p.x)*sin(2.5*p.y - time)*cos(2.5*p.z + time); */
}

float scene_sdf(vec3 p)
{
  p = vec3(p.x - 2.5, p.y - .5, p.z);
  float sphere = sphere_sdf(p, 1.3);
  float cube = cube_sdf(p + vec3(0.,0. + sin(u_time * 0.001),0.));

  /* return union_sdf(cube, sphere); */
  return sphere_sdf(p, 1.3) + displacement(p);
  /* return cube_sdf(p) + displacement(p); */
  /* return octahedron_sdf(p, 1.0) + displacement(p); */
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

vec3 estimate_normal(vec3 p)
{
  return normalize(vec3(
    scene_sdf(vec3(p.x + EPSILON, p.y, p.z)) - scene_sdf(vec3(p.x - EPSILON, p.y, p.z)),
    scene_sdf(vec3(p.x, p.y + EPSILON, p.z)) - scene_sdf(vec3(p.x, p.y - EPSILON, p.z)),
    scene_sdf(vec3(p.x, p.y, p.z + EPSILON)) - scene_sdf(vec3(p.x, p.y, p.z - EPSILON))
  ));
}

vec3 phong_contribution(vec3 diffuse, vec3 specular, float alpha, vec3 p, vec3 eye, vec3 light_pos, vec3 light_intensity)
{
  vec3 N = estimate_normal(p);
  vec3 L = normalize(light_pos - p);
  vec3 V = normalize(eye - p);
  vec3 R = normalize(reflect(-L, N));

  float dot_LN = dot(L, N);
  float dot_RN = dot(R, N);

  // Light not visible
  if (dot_LN < 0.)
  {
    return vec3(0.);
  }

  // Light reflection in opposite direction as viewer, apply only diffuse
  if (dot_RN < 0.)
  {
    return light_intensity * (diffuse * dot_LN);
  }

  /* return light_intensity * (diffuse * dot_LN + specular * pow(dot_RN, alpha)); */
  return light_intensity * (diffuse * dot_LN);
}

vec3 phong_illumination(vec3 ambient, vec3 diffuse, vec3 specular, float alpha, vec3 p, vec3 eye)
{
  const vec3 ambient_light = .5 * vec3(1.);
  vec3 color = ambient_light * ambient;
  vec3 light_pos = vec3(5.,10.,25.);
  vec3 light_intensity = vec3(.4);

  color += phong_contribution(diffuse, specular, alpha, p, eye, light_pos, light_intensity);

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
  vec3 dir = ray_direction(45., u_resolution.xy, gl_FragCoord.xy);

  mat4 view_to_world = view_matrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
  vec3 world_dir = (view_to_world * vec4(dir, 0.)).xyz;

  float dist =  shortest_distance(eye, world_dir, MIN_DIST, MAX_DIST);

  if (dist > MAX_DIST - EPSILON)
  {
    gl_FragColor = vec4(0.,0.,0.,0.);
    return;
  }

  vec3 p = eye + dist * world_dir;
  vec3 ambient = vec3(0.851,0.824,0.792) * .8;
  vec3 diffuse = vec3(0.129,0.757,0.435);
  vec3 specular = vec3(1.);
  float shininess = 12.;

  vec3 color = phong_illumination(ambient, diffuse, specular, shininess, p, eye);

  gl_FragColor = vec4(color,1.);
}
