import {Customer} from './customer';

export class Queue {
    private waitingCustomers: Customer[] = []
    

    public push(customer : Customer) {
	this.waitingCustomers.push(customer);
    }

    public pop(): Customer {
	let customer: Customer = this.waitingCustomers.shift();
	return customer
    }

    public getWaitingCustomers(): number {
	return this.waitingCustomers.length;
    }


    public isEmpty(): boolean {
	return this.waitingCustomers.length == 0; 
    }
    
    public copy(): Queue {
	let newQueue = new Queue()
	this.waitingCustomers.forEach(customer => newQueue.push(customer))
	return newQueue
    }
}
