let lastChar = '';

type Position = {
	x: number;
	y: number;
};

type Particle = {
	character: string;
	life: number;
	position: Position;
	color: string;
	opacity: number;
	rotation: number;
	speedX: number;
	speedY: number;
};

type ParticleGenerator = {
	position: Position;
	characters: string;
	nextCharacterIndex: number;
	particles: Particle[];
	maxParticles: number;
	accumulatedTime: number;
	interval: number;
	minMaxSpeedX: [number, number];
	minMaxSpeedY: [number, number];
	minMaxRotation: [number, number];
};

export const createParticleGenerator = (
	x: number,
	y: number,
	characters: string
): ParticleGenerator => {
	return {
		position: {
			x,
			y,
		},
		characters,
		nextCharacterIndex: 0,
		particles: [],
		maxParticles: 100,
		accumulatedTime: 0,
		interval: 200,
		minMaxSpeedX: [8, 10],
		minMaxSpeedY: [-10, -8],
		minMaxRotation: [-45, 0],
	};
};

export const updateParticleGenerator = (
	generator: ParticleGenerator,
	context: CanvasRenderingContext2D,
	delta: number
): void => {
	generator.accumulatedTime += delta;

	if (generator.accumulatedTime > generator.interval) {
		generator.accumulatedTime -= generator.interval;

		if (generator.particles.length < generator.maxParticles) {
			generator.particles.push(generateParticle(generator));
		}
	}

	for (const particle of generator.particles) {
		drawParticle(particle, context);
		updateParticle(particle, delta);
	}

	generator.particles = generator.particles.filter((particle) => particle.life > 0);
};

const generateParticle = (generator: ParticleGenerator): Particle => {
	const character = generator.characters[generator.nextCharacterIndex];
	generator.nextCharacterIndex = ++generator.nextCharacterIndex % generator.characters.length;

	return {
		character,
		life: 5000,
		position: { x: generator.position.x, y: generator.position.y },
		color: '#111111',
		opacity: 1.0,
		rotation: randomIntFromRange(generator.minMaxRotation[0], generator.minMaxRotation[1]),
		speedX: randomIntFromRange(generator.minMaxSpeedX[0], generator.minMaxSpeedX[1]),
		speedY: randomIntFromRange(generator.minMaxSpeedY[0], generator.minMaxSpeedY[1]),
	};
};

const updateParticle = (particle: Particle, delta: number) => {
	particle.life -= delta;
	particle.position.x += particle.speedX * delta * 0.01;
	particle.position.y += particle.speedY * delta * 0.01;
	particle.opacity = Math.max(particle.opacity - 0.008, 0);
};

const drawParticle = (particle: Particle, context: CanvasRenderingContext2D) => {
	context.globalAlpha = particle.opacity;
	context.fillStyle = particle.color;
	context.save();
	context.translate(particle.position.x, particle.position.y);

	if (particle.rotation !== 0) {
		context.rotate((particle.rotation * Math.PI) / 180);
	}

	context.fillText(particle.character, 0, 0);
	context.restore();
};

const randomIntFromRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
