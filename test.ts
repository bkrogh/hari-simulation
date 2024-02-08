import {Haircut} from './haircut';
import {Hairdresser} from './hairdresser';


test('init session', () => {
    let haircut = new Haircut(123)
    expect(haircut.getDurationInMinutes()).toBe(123)
});


test('init hairdresser', () => {
    let haircuts = []
    let hairdresser = new Hairdresser(haircuts)
    expect(hairdresser.getHaircuts()).toBe( haircuts )
});


