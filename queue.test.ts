import { Customer } from './customer';
import {Queue} from './queue'


test('init queue', () => {
    let queue = new Queue()
    expect(queue.getWaitingCustomers()).toBe( 0 )
});

test('queue push pop', () => {
    let queue = new Queue()
    queue.push(new Customer())
    expect(queue.getWaitingCustomers()).toBe( 1 )
});

test('queue push pop', () => {
    let queue = new Queue()
    queue.push(new Customer())
    queue.push(new Customer())
    expect(queue.getWaitingCustomers()).toBe( 2 )
});

test('queue push pop', () => {
    let queue = new Queue()
    let customer1 = new Customer()
    let customer2 = new Customer()
    queue.push(customer1)
    queue.push(customer2)
    let poppedCustomer = queue.pop()
    expect(queue.getWaitingCustomers()).toBe( 1 )
    expect(poppedCustomer).toBe(customer1)
});
