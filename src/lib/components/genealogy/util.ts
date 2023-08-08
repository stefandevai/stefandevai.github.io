import type { Person, DiagramDimensions } from './types';

export const getDepth = (personData?: Person, treeDepth = 1): number => {
	if (!personData) {
		return treeDepth - 1;
	}

	return Math.max(
		getDepth(personData.father, treeDepth + 1),
		getDepth(personData.mother, treeDepth + 1)
	);
};

const getTreeXOffsets = (
	dimensions: DiagramDimensions,
	personData?: Person,
	cursor = 0
): [number, number] => {
	let xMin = cursor;
	let xMax = cursor;

	if (!personData) {
		return [cursor, cursor];
	}

	if (personData.spouse) {
		xMax = dimensions.containerWidth * 2 + dimensions.horizontalSpacing;
	}

	if (personData.father) {
		const [newXMin, newXMax] = getTreeXOffsets(
			dimensions,
			personData.father,
			cursor - dimensions.containerWidth / 2 - dimensions.horizontalSpacing / 2
		);
		xMin = Math.min(xMin, newXMin);
		xMax = Math.max(xMax, newXMax);
	}

	if (personData.mother) {
		const [newXMin, newXMax] = getTreeXOffsets(
			dimensions,
			personData.mother,
			cursor + dimensions.containerWidth / 2 + dimensions.horizontalSpacing / 2
		);
		xMin = Math.min(xMin, newXMin);
		xMax = Math.max(xMax, newXMax);
	}

	return [xMin, xMax];
};

export const getXData = (
	treeDepth: number,
	dimensions: DiagramDimensions,
	personData: Person
): [number, number] => {
	const spouseOffset = dimensions.containerWidth * 2 + dimensions.horizontalSpacing;

	if (treeDepth === 1 && personData.spouse) {
		return [0, spouseOffset];
	}

	if (treeDepth === 1) {
		return [0, dimensions.containerWidth];
	}

	const [xMin, xMax] = getTreeXOffsets(dimensions, personData);
	const absXMin = Math.abs(xMin);

	// return [absXMin, absXMin + xMax - 12.5];
	return [absXMin, absXMin + xMax];
};

export const getYData = (treeDepth: number, dimensions: DiagramDimensions): [number, number] => {
	const height =
		(treeDepth - 1) * (dimensions.containerHeight + dimensions.verticalSpacing) +
		dimensions.containerHeight;
	const y = height - dimensions.containerHeight;

	return [y, height];
};

// export const getX = (width: number, dimensions: DiagramDimensions, personData: Person): number => {
//   if (personData.spouse) {

//   }

// 	return width / 2 - dimensions.containerWidth / 2;
// }

// export const getY = (height: number, dimensions: DiagramDimensions): number => {
// 	return height - dimensions.containerHeight;
// }
