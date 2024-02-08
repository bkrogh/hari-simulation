import { Customer } from "./customer"
import { Haircut } from "./haircut"
import { Hairdresser } from "./hairdresser"
import { Queue } from "./queue"
import { Simulation } from "./simulation"

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

test('Single hairdresser simulation, empty queue', () => {
    let haircuts = createHairCuts()
    let hairdressers: Hairdresser[] = [new Hairdresser(haircuts)]
    let queue = new Queue()
    let hairdresser = new Hairdresser(haircuts)
    let simulation = new Simulation(hairdressers, queue)
    expect(simulation.runSimulation()).toBe(0)
})


test('Single hairdresser simulation, queue with 5', () => {
    let haircuts = createHairCuts()
    let hairdressers: Hairdresser[] = [new Hairdresser(haircuts)]
    let queue = new Queue()
    for (let i = 0; i < 5; i++) {
	queue.push(new Customer())
    }
    let simulation = new Simulation(hairdressers, queue)
    expect(simulation.runSimulation()).toBeGreaterThan(minHaircutTimeMinutes * 5)
})

test('5 hairdressers simulation, queue with 5', () => {
    let hairdressers: Hairdresser[] = []
    for (let i = 0; i < 5; i++) {
	hairdressers.push(new Hairdresser(createHairCuts()))
    }
    
    let queue = new Queue()
    for (let i = 0; i < 5; i++) {
	queue.push(new Customer())
    }
    let simulation = new Simulation(hairdressers, queue)
    expect(simulation.runSimulation()).toBeLessThan(maxHaircutTimeMinutes )
})

