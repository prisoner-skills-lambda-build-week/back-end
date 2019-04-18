const db = require('../dbConfig');
const prisonsModel = require('./prisonsModel');


describe('prisonsModel', () => {
	beforeEach(async done => {
		await db.seed.run();
		done();
	});

	describe('add()', () => {
		test('should add new prison', async () => {
			let [id] = await prisonsModel.add({
				username: 'qwerty', 
				address: '1901 D St SE, Washington, DC 20003', 
				name: 'DC Central Detention Facility', 
				password: 'pass'
			});
			expect(id).toBe(1);

			[id] = await prisonsModel.add({
				username: 'asd', 
				address: '1997 D St SE, Washington, NY 21003', 
				name: 'Cool Name', 
				password: 'pass'
			});
			expect(id).toBe(2);
		});
	});

	describe('get()', () => {
		test('should return a prison', async () => {
			

			await prisonsModel.add({
				username: 'qwerty', 
				address: '1901 D St SE, Washington, DC 20003', 
				name: 'DC Central Detention Facility',
				password: 'pass'
			})

			let prison = await prisonsModel.get(1);
			delete prison.password;

			expect(prison).toEqual({
				id: 1,
				username: 'qwerty', 
				address: '1901 D St SE, Washington, DC 20003', 
				name: 'DC Central Detention Facility', 
			})
		});
	});

	describe('getAll()', () => {
		test('should return all prisons', async () => {
			await prisonsModel.add({
				username: 'qwerty', 
				address: '1901 D St SE, Washington, DC 20003', 
				name: 'DC Central Detention Facility',
				password: 'pass'
			});

			let prisons = await prisonsModel.getAll();
			expect(prisons.length).toBe(1);
		})
	});

	describe('findBy()', () => {
		test('should return a prison', async () => {

			await prisonsModel.add({
				username: 'random', 
				address: 'random location', 
				name: 'cool name', 
				password: 'pass'
			});

			let prison = await prisonsModel.findBy({username: 'random'});
			delete prison.id;
			delete prison.password;

			expect(prison).toEqual({
				username: 'random', 
				address: 'random location', 
				name: 'cool name', 
			})
		})
	});

	describe('update()', () => {
		test('should update a prison', async () => {
			
			await prisonsModel.add({
				username: 'random',
				address: 'location',
				name: 'name',
				password: 'pass'
			})

			await prisonsModel.update(1,{
				address: 'random location', 
				name: 'cool name', 
			});
			

			let prison = await prisonsModel.get(1);
			delete prison.id;
			delete prison.password;

			expect(prison).toEqual({
				username: 'random', 
				address: 'random location', 
				name: 'cool name', 
			});
		});
	});

	describe('remove()', () => {
		test('should delete a prison', async () => {
			await prisonsModel.add({
				username: 'qwerty', 
				address: '1901 D St SE, Washington, DC 20003', 
				name: 'DC Central Detention Facility', 
				password: 'pass'
			});

			await prisonsModel.add({
				username: 'random', 
				address: 'random location', 
				name: 'cool name', 
				password: 'pass'
			});

			await prisonsModel.remove(2);

			let prisons = await prisonsModel.getAll();

			expect(prisons.length).toBe(1);
		})
	});

})