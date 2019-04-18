const db = require('../dbConfig');
const prisonersModel = require('./prisonersModel');


describe('prisonersModel', () => {
	beforeEach(async done => {
		await db.seed.run();
		done();
	}); 

	describe('add()', () => {
			
		test('should add new prisoner', async () => {
			
			let [id] = await prisonersModel.add({
				name: 'Jaja',
				prison_id: 1
			});
			expect(id).toBe(5);

			[id] = await prisonersModel.add({
				name: 'Saitama',
				prison_id: 1
			});
			expect(id).toBe(6);
		})
	})

	describe('get()', () => {
		test('should return a prisoner', async () => {
			let [id] = await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			});
			let prisoner = await prisonersModel.get(id);
			delete prisoner.id;
			expect(prisoner).toEqual({
				name: 'Jojo',
				prison_id: 1,
				canHaveWorkLeave: 0
			})
		})
	});

	describe('getAll()', () => {
		test('should return all prisoner', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			});

			await prisonersModel.add({
				name: 'Mojo',
				prison_id: 1
			});
			let prisoners = await prisonersModel.getAll();
			expect(prisoners.length).toBe(6);
		})
	});

	describe('findBy()', () => {
		test('should return a prisoner', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			});

			await prisonersModel.add({
				name: 'Mojo',
				prison_id: 1
			});

			let [prisoner] = await prisonersModel.findBy({name: 'Jojo'});
			delete prisoner.id;
			expect(prisoner).toEqual({
				name: 'Jojo',
				prison_id: 1,
				canHaveWorkLeave: 0 
			});
		})
	});

	describe('update()', () => {
		test('should update a prisoner', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			});

			await prisonersModel.update(1,{
				name: 'Mojo',
				prison_id: 1
			});

			let prisoner = await prisonersModel.get(1);
			delete prisoner.id;
			expect(prisoner).toEqual({
				name: 'Mojo',
				prison_id: 1,
				canHaveWorkLeave: 0 
			});
		})
	});

	describe('remove()', () => {
		test('should delete a prisoner', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			});

			await prisonersModel.add({
				name: 'Mojo',
				prison_id: 1
			});

			await prisonersModel.remove(2);

			let prisoners = await prisonersModel.getAll();

			expect(prisoners.length).toBe(5);
		})
	});

})