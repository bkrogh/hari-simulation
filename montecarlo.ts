import { Hairdresser } from "./hairdresser";
import { Queue } from "./queue";
import { Simulation } from "./simulation";

/**
 * This class runs a number of simulations, and average their expected times
 * By adjusting the parameter to getNextEstimatedWaitingTime you can gauge the sensitivity of number of simulations.
 */
export class Montecarlo {
    private hairdressers: Hairdresser[];
    private queue: Queue;
    constructor(hairdressers: Hairdresser[], queue: Queue) {
	this.hairdressers = hairdressers;
	this.queue = queue;
    }

    public getNextEstimatedWaitingTime(simulationCount: number): number {
	let simulationTimes = []
	for (let i = 0; i < simulationCount; i++) {
	    let hairdressers = []
	    this.hairdressers.forEach(hs => hairdressers.push(hs.copy()))
	    let simulation = new Simulation(hairdressers, this.queue.copy());
	    let simulatedTime = simulation.runSimulation()
	    simulationTimes.push(simulatedTime)
	}


	// Calculate a boring average over simulations.
	// Future work would be to find spread/variation,
	// and select a percentile that balance customer satisfaction with total throughput
	let sum = 0;
	for(let i = 0; i < simulationTimes.length; i++) {
	    sum += simulationTimes[i];
	}
	const average = sum / simulationTimes.length;
	return average
    }
}
