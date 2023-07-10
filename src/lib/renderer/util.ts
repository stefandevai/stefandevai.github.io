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
			const first = lat * (segments + 1) + lon;
			const second = first + 1;
			const third = first + segments + 1;
			const fourth = second + segments + 1;

			indices.push(first, second, fourth, third);
		}
	}

	return [vertices, indices];
};

export const buildQuad = (width: number, height: number, color: number[]): [number[], number[]] => {
	const vertices: number[] = [
		-width / 2,
		-height / 2,
		0,
		width / 2,
		-height / 2,
		0,
		-width / 2,
		height / 2,
		0,
		width / 2,
		height / 2,
		0,
	];

	const indices: number[] = [0, 1, 2, 3];

	const resultVertices: number[] = [];
	for (let i = 0; i < vertices.length; i += 3) {
		resultVertices.push(vertices[i], vertices[i + 1], vertices[i + 2]);
		resultVertices.push(color[0], color[1], color[2]);
	}

	return [resultVertices, indices];
};

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
