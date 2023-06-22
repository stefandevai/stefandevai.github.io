export const buildCircle = (radius: number, segments: number, color: number[]) => {
	const angle = (2 * Math.PI) / segments;
	const vertices = [];
	const indices = [];

	for (let i = 0; i < segments; ++i) {
		const currentAngle = angle * i;
		const x = radius * Math.cos(currentAngle);
		const y = radius * Math.sin(currentAngle);

		vertices.push(x);
		vertices.push(y);
		vertices.push(0.0);
		vertices.push(...color);
	}

	for (let i = 0; i < segments - 1; ++i) {
		indices.push(i);
		indices.push(i + 1);
	}

	return [vertices, indices];
};

// export const buildSquare = (color: number[]) => {
// 	const vertices = [
// 		-0.5,
// 		-0.5,
// 		...color,
// 		0.5,
// 		-0.5,
// 		...color,
// 		0.5,
// 		0.5,
// 		...color,
// 		-0.5,
// 		0.5,
// 		...color
// 	];
// 	const indices = [0, 1, 2, 3];

// 	return [vertices, indices];
// };

export const buildSphere = (radius: number, segments: number, color: number[]) => {
  const vertices: number[] = [];
  const indices: number[] = [];

  for (let lat = 0; lat <= segments; lat++) {
    const theta = (lat * Math.PI) / segments;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= segments; lon++) {
      const phi = (lon * 2 * Math.PI) / segments;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;

      vertices.push(radius * x, radius * y, radius * z);
      vertices.push(...color);
    }
  }

  for (let lat = 0; lat < segments; lat++) {
    for (let lon = 0; lon < segments; lon++) {
      const first = (lat * (segments + 1)) + lon;
      const second = first + 1;
      const third = first + segments + 1;
      const fourth = second + segments + 1;

      indices.push(first, second, fourth, third);
    }
  }

  return [vertices, indices];
}

export const buildIcosahedron = (radius: number, color: number[]) => {
  const vertices: number[] = [];
  const indices: number[] = [];

  const t = (1 + Math.sqrt(5)) / 2; // Golden ratio

  // Vertices
  vertices.push(-1, t, 0);
  vertices.push(...color);
  vertices.push(1, t, 0);
  vertices.push(...color);
  vertices.push(-1, -t, 0);
  vertices.push(...color);
  vertices.push(1, -t, 0);
  vertices.push(...color);
  vertices.push(0, -1, t);
  vertices.push(...color);
  vertices.push(0, 1, t);
  vertices.push(...color);
  vertices.push(0, -1, -t);
  vertices.push(...color);
  vertices.push(0, 1, -t);
  vertices.push(...color);
  vertices.push(t, 0, -1);
  vertices.push(...color);
  vertices.push(t, 0, 1);
  vertices.push(...color);
  vertices.push(-t, 0, -1);
  vertices.push(...color);
  vertices.push(-t, 0, 1);
  vertices.push(...color);

  // Indices
  const indicesData = [
    0, 11, 5,   0, 5, 1,    0, 1, 7,    0, 7, 10,   0, 10, 11,
    1, 5, 9,    5, 11, 4,   11, 10, 2,  10, 7, 6,    7, 1, 8,
    3, 9, 4,    3, 4, 2,     3, 2, 6,    3, 6, 8,    3, 8, 9,
    4, 9, 5,    2, 4, 11,    6, 2, 10,   8, 6, 7,    9, 8, 1
  ];

  for (let i = 0; i < indicesData.length; i++) {
    const index = indicesData[i];
    indices.push(index);
  }

  // Scale vertices by radius
  for (let i = 0; i < vertices.length; i += 6) {
    vertices[i] *= radius;
    vertices[i + 1] *= radius;
    vertices[i + 2] *= radius;
  }

  return [vertices, indices];
}

// export const buildSphere = (radius: number, segments: number, color: string): { vertices: number[], indices: number[] } => {
//   const vertices: number[] = [];
//   const indices: number[] = [];

//   // Generate vertices
//   for (let lat = 0; lat <= segments; lat++) {
//     const theta = (lat * Math.PI) / segments;
//     const sinTheta = Math.sin(theta);
//     const cosTheta = Math.cos(theta);

//     for (let lon = 0; lon <= segments; lon++) {
//       const phi = (lon * 2 * Math.PI) / segments;
//       const sinPhi = Math.sin(phi);
//       const cosPhi = Math.cos(phi);

//       const x = cosPhi * sinTheta;
//       const y = cosTheta;
//       const z = sinPhi * sinTheta;
//       const u = 1 - (lon / segments);
//       const v = 1 - (lat / segments);

//       // Add position and color data to vertices
//       vertices.push(radius * x, radius * y, radius * z); // Position
//       vertices.push(parseInt(color.substr(1, 2), 16) / 255); // Red component
//       vertices.push(parseInt(color.substr(3, 2), 16) / 255); // Green component
//       vertices.push(parseInt(color.substr(5, 2), 16) / 255); // Blue component
//     }
//   }

//   // Generate indices
//   for (let lat = 0; lat < segments; lat++) {
//     for (let lon = 0; lon < segments; lon++) {
//       const first = (lat * (segments + 1)) + lon;
//       const second = first + segments + 1;

//       indices.push(first, second, first + 1);
//       indices.push(second, second + 1, first + 1);
//     }
//   }

//   return [vertices, indices];
// }

export const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		return true;
	}

	return false;
};
