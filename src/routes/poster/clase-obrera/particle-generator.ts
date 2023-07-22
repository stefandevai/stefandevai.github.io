let lastChar = '';

type Position = {
	x: number;
	y: number;
};

type Particle = {
	character: string;
	position: Position;
	color: string;
	opacity: number;
	rotation: [number, number];
	scale: number;
};

type ParticleGenerator = {
	position: Position;
	characters: string;
	lastCharacter: string;
	particles: Particle[];
};

export const createParticleGenerator = (x: number, y: number, characters: string): Generator => {
	const generator: ParticleGenerator = {
		position: {
			x,
			y,
		},
		characters,
	};

	return generator;
};

export const updateParticleGenerator = (generator: ParticleGenerator, delta: number): void => {};
