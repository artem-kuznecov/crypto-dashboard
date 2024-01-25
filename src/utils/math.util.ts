// * Returns difference between two numbers in percents
export function percentDifference(a: number, b: number): number {
	return 100 * Math.abs((a - b) / ((a + b) / 2))
}
