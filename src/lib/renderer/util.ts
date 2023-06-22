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
