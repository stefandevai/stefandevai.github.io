precision mediump float;

varying lowp vec4 v_color;
varying lowp vec4 v_position;

uniform float u_time;
uniform vec2 u_resolution;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

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

float scene_sdf(vec3 p)
{
  /* return sphere_sdf(p, 1.0); */
  return cube_sdf(p - vec3(2.5,1.,0.));
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

  return light_intensity * (diffuse * dot_LN + specular * pow(dot_RN, alpha));
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
  vec3 eye = vec3(8.,5.,9.);
  vec3 dir = ray_direction(45., u_resolution.xy, gl_FragCoord.xy);

  mat4 view_to_world = view_matrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
  vec3 world_dir = (view_to_world * vec4(dir, 0.)).xyz;

  float dist =  shortest_distance(eye, world_dir, MIN_DIST, MAX_DIST);

  if (dist > MAX_DIST - EPSILON)
  {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.);
    return;
  }

  vec3 p = eye + dist * world_dir;
  vec3 ambient = vec3(.2,.2,.2);
  vec3 diffuse = vec3(.9,.3,.6);
  vec3 specular = vec3(1.);
  float shininess = 10.;

  vec3 color = phong_illumination(ambient, diffuse, specular, shininess, p, eye);

  gl_FragColor = vec4(color,1.);
}
