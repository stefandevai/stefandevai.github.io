type Position = {
	x: number;
	y: number;
};

type Particle = {
	character: string;
	totalLife: number;
	life: number;
	active: boolean;
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
	color: string;
	totalLife: number;
	initialRotation: number;
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
	characters: string,
	maxParticles = 200
): ParticleGenerator => {
	return {
		position: {
			x,
			y,
		},
		characters,
		totalLife: 3000,
		nextCharacterIndex: 0,
		color: '#3b2123',
		initialRotation: -90,
		particles: [],
		maxParticles,
		accumulatedTime: 0,
		interval: 100,
		minMaxSpeedX: [8, 11],
		minMaxSpeedY: [-7, -5],
		minMaxRotation: [-45, 0],
	};
};

export const initParticleGenerator = (generator: ParticleGenerator) => {
	for (let i = 0; i < generator.maxParticles; i++) {
		generator.particles.push(generateParticle(generator));
	}
};

export const updateParticleGenerator = (
	generator: ParticleGenerator,
	context: CanvasRenderingContext2D,
	delta: number
): void => {
	generator.accumulatedTime += delta;

	if (generator.accumulatedTime > generator.interval) {
		for (let particle of generator.particles) {
			if (!particle.active) {
				activateParticle(particle, generator);
				break;
			}
		}
		generator.accumulatedTime = 0;
	}

	for (const particle of generator.particles) {
		updateParticle(particle, delta);
		drawParticle(particle, context);
	}
};

const generateParticle = (generator: ParticleGenerator): Particle => {
	return {
		character: '',
		totalLife: generator.totalLife,
		life: generator.totalLife,
		active: false,
		position: { x: generator.position.x, y: generator.position.y },
		color: generator.color,
		opacity: 0,
		rotation: generator.initialRotation,
		speedX: randomIntFromRange(generator.minMaxSpeedX[0], generator.minMaxSpeedX[1]),
		speedY: randomIntFromRange(generator.minMaxSpeedY[0], generator.minMaxSpeedY[1]),
	};
};

const activateParticle = (particle: Particle, generator: ParticleGenerator) => {
	const character = generator.characters[generator.nextCharacterIndex];
	generator.nextCharacterIndex = ++generator.nextCharacterIndex % generator.characters.length;

	particle.active = true;
	particle.character = character;
	particle.totalLife = generator.totalLife;
	particle.life = generator.totalLife;
	particle.position.x = generator.position.x;
	particle.position.y = generator.position.y;
	particle.color = generator.color;
	particle.opacity = 0;
	particle.rotation = generator.initialRotation;
	particle.speedX = randomIntFromRange(generator.minMaxSpeedX[0], generator.minMaxSpeedX[1]);
	particle.speedY = randomIntFromRange(generator.minMaxSpeedY[0], generator.minMaxSpeedY[1]);
};

const updateParticle = (particle: Particle, delta: number) => {
	if (!particle.active) {
		return;
	}

	particle.position.x += particle.speedX * delta * 0.01;
	particle.position.y += particle.speedY * delta * 0.01;
	particle.rotation += 5 * delta * 0.01;

	const fadeInThreshold = 150;
	if (particle.life > particle.totalLife - fadeInThreshold) {
		particle.opacity = (particle.totalLife - particle.life) / fadeInThreshold;
	} else {
		particle.opacity = particle.life / (particle.totalLife - fadeInThreshold);
	}

	particle.life -= delta;

	if (particle.life <= 0) {
		particle.active = false;
	}
};

const drawParticle = (particle: Particle, context: CanvasRenderingContext2D) => {
	if (!particle.active) {
		return;
	}

	context.globalAlpha = particle.opacity;
	context.fillStyle = particle.color;
	context.save();
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
