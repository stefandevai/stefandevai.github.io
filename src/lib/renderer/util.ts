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
