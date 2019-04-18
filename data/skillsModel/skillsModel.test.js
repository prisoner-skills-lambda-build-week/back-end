const db = require('../dbConfig');
const skillsModel = require('./skillsModel');


describe('skillsModel', () => {
	beforeAll(async done => {
		await db.seed.run();
		done();
	});

	describe('add()', () => {
			
		test('should add new skill', async () => {
			let [id] = await skillsModel.add({
				name: 'React',
			});
			expect(id).toBe(1);

			[id] = await skillsModel.add({
				name: 'Nodejs',
			});
			expect(id).toBe(2);
		})
	})

	describe('get()', () => {
		test('should return a skill', async () => {
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			let skill = await skillsModel.get(2);
			expect(skill).toEqual({
				id: 2,
				name: 'Nodejs'
			})
		})
	});

	describe('getAll()', () => {
		test('should return all skills', async () => {
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			let skills = await skillsModel.getAll();
			expect(skills.length).toBe(2);
		})
	});

	describe('findBy()', () => {
		test('should return a skill', async () => {
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			let skill = await skillsModel.findBy({name: 'React'});
			expect(skill).toEqual({
				id: 1,
				name: 'React'
			})
		})
	});

	describe('update()', () => {
		test('should update a skill', async () => {
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.update(1, {
				name: 'Nodejs',
			});

			let skill = await skillsModel.get(1);
			expect(skill).toEqual({
				id: 1,
				name: 'Nodejs'
			})
		})
	});

	describe('remove()', () => {
		test('should delete a skill', async () => {
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			await skillsModel.remove(1)
			let skills = await skillsModel.getAll();
			expect(skills.length).toBe(1);
		})
	});

})