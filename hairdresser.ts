import { Customer } from './customer';
import {Haircut} from './haircut';

export class Hairdresser {
    /**
     * A list of historical haircuts. Each time a hairdresser has *completed* a haircut we add it to this list.
     * I expect keeping the last, say, 20 haircuts is adequate for the simulation
     * The simulation uses these values but never modifes them
     */
    private haircuts: Haircut[]

    /**
     * This is used and updated in the simulation. Never access outside of simulation
     */
    private nextAvailableTime = 0;
    
    constructor(haircuts: Haircut[]) {
	this.haircuts = haircuts
    }

    public getHaircuts() {
	return this.haircuts
    }

    public copy() : Hairdresser {
	return new Hairdresser(this.haircuts)
    }

    public addBookedTime(bookedTime: number) {
	this.nextAvailableTime += bookedTime
    }
    
    public getNextAvailableTime() : number {
	return this.nextAvailableTime;
    }

    /**
     * The monte-carlo "step" is here.
     * We randomly select that the next customer in the queue will get a haircut time similar to a random element from the historical list of haircuts
     * We pass in a customer object so we could improve precision by filtering on gender, haircut types, etc.
     */
    public getExpectedHaircutTime(customer: Customer): number {
	let randomIndex: number = Math.floor(Math.random() * this.haircuts.length);
	let randomHaircut = this.haircuts[randomIndex]
	return randomHaircut.getDurationInMinutes()
    }
}
