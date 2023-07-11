type Timer = {
	lastTime: number;
};

export const createTimer = (): Timer => {
	return {
		lastTime: 0.0,
		elapsed: 0.0,
	};
};

export const updateTimer = (timer: Timer) => {
	const now = Date.now();

	if (timer.lastTime === 0) {
		timer.lastTime = now;
	}

	const delta = now - timer.lastTime;
	timer.lastTime = now;
	timer.elapsed += delta;
};
