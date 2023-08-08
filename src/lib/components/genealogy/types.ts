export type Person = {
	name: string;
	gender: 'f' | 'm';
	spouse: Person;
	father?: Person;
	mother?: Person;
	birthDate?: string;
	deathDate?: string;
};

export type DiagramColors = {
	female: string;
	male: string;
	line: string;
	unknown: string;
	text: string;
};

export type DiagramDimensions = {
	containerHeight: number;
	containerWidth: number;
	verticalSpacing: number;
	horizontalSpacing: number;
	fontSize: number;
	safeZone: number;
	lineWidth: number;
};
