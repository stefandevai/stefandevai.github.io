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
	scale: number;
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
		maxParticles: 200,
		accumulatedTime: 0,
		interval: 100,
		minMaxSpeedX: [8, 11],
		minMaxSpeedY: [-7, -5],
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
		updateParticle(particle, delta);
		drawParticle(particle, context);
	}

	generator.particles = generator.particles.filter((particle) => particle.life > 0);
};

const generateParticle = (generator: ParticleGenerator): Particle => {
	const character = generator.characters[generator.nextCharacterIndex];
	generator.nextCharacterIndex = ++generator.nextCharacterIndex % generator.characters.length;

	const totalLife = 3000;

	return {
		character,
		totalLife,
		life: totalLife,
		position: { x: generator.position.x, y: generator.position.y },
		color: '#3b2123',
		opacity: 0,
		rotation: -90,
		speedX: randomIntFromRange(generator.minMaxSpeedX[0], generator.minMaxSpeedX[1]),
		speedY: randomIntFromRange(generator.minMaxSpeedY[0], generator.minMaxSpeedY[1]),
		scale: 1,
	};
};

const updateParticle = (particle: Particle, delta: number) => {
	particle.position.x += particle.speedX * delta * 0.01;
	particle.position.y += particle.speedY * delta * 0.01;
	particle.rotation += 5 * delta * 0.01;
	particle.scale += 1 * delta * 0.001;

	const fadeInThreshold = 150;
	if (particle.life > particle.totalLife - fadeInThreshold) {
		particle.opacity = (particle.totalLife - particle.life) / fadeInThreshold;
	} else {
		particle.opacity = particle.life / (particle.totalLife - fadeInThreshold);
	}

	particle.life -= delta;
};

const drawParticle = (particle: Particle, context: CanvasRenderingContext2D) => {
	context.globalAlpha = particle.opacity;
	context.fillStyle = particle.color;
	context.save();
	// context.font = `${20 * particle.scale}px EB Garamond`;
	context.translate(particle.position.x, particle.position.y);

	const rotation = particle.rotation;

	if (rotation !== 0) {
		context.textAlign = 'left';
		context.textBaseline = 'top';
		context.rotate((rotation * Math.PI) / 180);
	}

	context.fillText(particle.character, 0, 0);
	context.restore();
};

const randomIntFromRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
