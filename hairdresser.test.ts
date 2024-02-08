import {Haircut} from './haircut';
import {Hairdresser} from './hairdresser'


test('init hairdresser', () => {
    let haircuts = []
    let hairdresser = new Hairdresser(haircuts)
    expect(hairdresser.getHaircuts()).toBe( haircuts )
})
