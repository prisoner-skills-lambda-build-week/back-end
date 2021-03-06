const db = require('../dbConfig');
const prisonersModel = require('../prisonersModel/prisonersModel');
const skillsModel = require('../skillsModel/skillsModel');
const prisonersSkillsModel = require('./prisonersSkillsModel');


describe('prisonersSkillsModel', () => {
	beforeEach(async done => {
		await db.seed.run();
		done();
	}); 

	describe('add()', () => {
		test('should add new skill to prisoner', async () => {

			let [id] = await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 1
			});
			expect(id).toBe(6);

			[id] = await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 2
			});
			expect(id).toBe(7);
		})
	})

	describe('get()', () => {
		test('should return a prisoner-skill pair', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			})
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 1
			});

			await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 2
			});

			let prisonerskill = await prisonersSkillsModel.get(1);

			expect(prisonerskill).toEqual({
				id: 1,
				prisoners_id: 1,
				skills_id: 1
			});
			
		});
	});

	describe('getAll()', () => {
		test('should return all prisoners-skills pair', async () => {

			await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 1
			});

			await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 2
			});

			let prisonerskills = await prisonersSkillsModel.getAll();

			expect(prisonerskills.length).toBe(7)
		})
	});

	describe('findBy()', () => {
		test('should return a prisoner-skill', async () => {

			let prisonerskills = await prisonersSkillsModel.findBy({prisoners_id: 1});

			expect(prisonerskills.length).toBe(2);
		})
	});

	describe('update()', () => {
		test('should update a prisoners-skill', async () => {
			await prisonersModel.add({
				name: 'Jojo',
				prison_id: 1
			})
			await skillsModel.add({
				name: 'React',
			});

			await skillsModel.add({
				name: 'Nodejs',
			});

			await prisonersSkillsModel.add({
				prisoners_id: 1,
				skills_id: 1
			});

			await prisonersSkillsModel.update(1, {
				prisoners_id: 1,
				skills_id: 2
			});

			let prisonerskill = await prisonersSkillsModel.get(1);

			expect(prisonerskill).toEqual({
				id: 1,
				prisoners_id: 1,
				skills_id: 2
			});
		})
	});

	describe('remove()', () => {
		test('should delete a prisoners-skill', async () => {

			await prisonersSkillsModel.remove(1, 2);

			let prisonerskills = await prisonersSkillsModel.getAll();
			expect(prisonerskills.length).toBe(4);
		})
	});

})