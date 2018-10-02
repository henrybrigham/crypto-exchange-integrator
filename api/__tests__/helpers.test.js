const Helpers = require('../helpers');

describe('Helpers Tests', () => {
	describe('formatBittrexOrders', () => {
		it('formats bittrex book orders correctly', () => {
			const orders = {
				buy: [
					{ 
						Quantity: 1, 
						Rate: 0.5 
					},
					{ 
						Quantity: 2, 
						Rate: 0.4
					}
				],
				sell: [
					{ 
						Quantity: 3, 
						Rate: 0.3 
					},
					{ 
						Quantity: 4, 
						Rate: 0.2
					}
				]
			}
			const result = Helpers.formatBittrexOrders(orders);
			const expected = {
				buy: [
					{ 
						Exchange: 'bittrex',
						Type: 'bid',
						Quantity: 1, 
						Rate: 0.5 
					},
					{ 
						Exchange: 'bittrex',
						Type: 'bid',
						Quantity: 2, 
						Rate: 0.4
					}
				],
				sell: [
					{ 
						Exchange: 'bittrex',
						Type: 'ask',
						Quantity: 3, 
						Rate: 0.3 
					},
					{ 
						Exchange: 'bittrex',
						Type: 'ask',
						Quantity: 4, 
						Rate: 0.2
					}
				]
			}
			expect(orders).toEqual(expected);
		});
	});
});