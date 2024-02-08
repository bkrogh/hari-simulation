import { Customer } from "./customer"
import { Haircut } from "./haircut"
import { Hairdresser } from "./hairdresser"
import { Montecarlo } from "./montecarlo"
import { Queue } from "./queue"


let minHaircutTimeMinutes = 12
let maxHaircutTimeMinutes = 45

function createHairCuts():  Haircut[] {
    let haircuts = []
    let maxDurationMinutes = maxHaircutTimeMinutes - minHaircutTimeMinutes
    for (let i = 0; i < 100; i++) {
	let durationMinutes = minHaircutTimeMinutes + Math.random() * maxDurationMinutes
	let haircut = new Haircut(durationMinutes)
	haircuts.push(haircut)
    }
    return haircuts
}

function createQueue(customersToAdd: number): Queue {
    let queue = new Queue()
    for (let i = 0; i < customersToAdd; i++) {
	queue.push(new Customer())
    }
    return queue
}

test('5 hairdresser simulation, queue of 5 customers', () => {
    let queue = createQueue(5)
    let simulationsToRun = 50
    let hairdressers: Hairdresser[] = []
    for (let i = 0; i < 5; i++) {
	hairdressers.push(new Hairdresser(createHairCuts()))
    }
    
    let montecarlo = new Montecarlo(hairdressers, queue)
    let estimatedTimeOfHaircut = montecarlo.getNextEstimatedWaitingTime(simulationsToRun)
    console.log("Simulation output (minutes to start of haircut): " + estimatedTimeOfHaircut)
    expect(estimatedTimeOfHaircut).toBeGreaterThan(0)
})



test('5 hairdresser simulation, queue of 10 customers', () => {
    let queue = createQueue(10)
    let simulationsToRun = 25
    let hairdressers: Hairdresser[] = []
    let hairdresserCount = 5
    for (let i = 0; i < hairdresserCount; i++) {
	hairdressers.push(new Hairdresser(createHairCuts()))
    }
    
    let montecarlo = new Montecarlo(hairdressers, queue)
    let estimatedTimeOfHaircut = montecarlo.getNextEstimatedWaitingTime(simulationsToRun)
    console.log("Simulation output for " + queue.getWaitingCustomers() + " waiting customers, and " + hairdresserCount + " hairdressers (minutes to start of haircut): " + estimatedTimeOfHaircut)
    expect(estimatedTimeOfHaircut).toBeGreaterThan(0)
})
