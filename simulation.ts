import { Hairdresser } from "./hairdresser";
import { Queue } from "./queue";

/**
 * The overall idea is that each simulation starts at time = 0 (in minutes)
 * The simulation runs by letting the next available hairdresser pick the person in front of the queue
 * When a hairdresser picks the next person, the next available time of the specific hairdresser is updated.
 * When the queue is empty, we find find the earliest available hairdresser and return her next available time
 */
export class Simulation {
    private hairdressers: Hairdresser[];
    private queue : Queue;
    
    constructor(hairdressers: Hairdresser[], queue: Queue) {
	this.hairdressers = hairdressers
	this.queue = queue
    }

    public runSimulation(): number {
	while (!this.queue.isEmpty()) {
	    let nextCustomer = this.queue.pop()
	    let nextHairdresser = this.getNextAvailableHairdresser()
	    let expectedBookingTime: number = nextHairdresser.getExpectedHaircutTime(nextCustomer)
	    nextHairdresser.addBookedTime(expectedBookingTime)
	}
	let nextHairdresser = this.getNextAvailableHairdresser()
	return nextHairdresser.getNextAvailableTime()
    }

    private getNextAvailableHairdresser(): Hairdresser {
	let nextAvailableHairdresser = this.hairdressers[0]
	let nextAvailableTime = this.hairdressers[0].getNextAvailableTime()
	this.hairdressers.forEach(hairdresser => {
	    if (nextAvailableTime > hairdresser.getNextAvailableTime()){
		nextAvailableHairdresser = hairdresser
		nextAvailableTime = hairdresser.getNextAvailableTime()
	    }
	})
	return nextAvailableHairdresser;
    }
    
}
