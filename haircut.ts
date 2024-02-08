/**
 * Represents a historical haircut.
 * Could be extended with additional features to futher the precision of the simulation
 */
export class Haircut {
    private durationInMinutes: number

    constructor(durationInMinutes: number) {
	this.durationInMinutes = durationInMinutes
    }

    public getDurationInMinutes(): number {
	return this.durationInMinutes
    }
}
