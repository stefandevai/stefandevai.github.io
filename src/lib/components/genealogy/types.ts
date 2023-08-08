export type Person = {
	name: string;
	gender: 'f' | 'm';
	spouse: Person;
	father?: Person;
	mother?: Person;
};

export type DiagramColors = {
	female: string;
	male: string;
	line: string;
};

export type DiagramDimensions = {
	containerHeight: number;
	containerWidth: number;
	verticalSpacing: number;
	horizontalSpacing: number;
};
