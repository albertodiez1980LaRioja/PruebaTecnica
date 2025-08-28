const ExcelJS = require('exceljs');


let { BaseService } = require("../../../shared/base/base-service.js");


class CandidateService extends BaseService {

    constructor(repository, options = {}) {
        super(repository, options);
    }


    async create(req) {
        console.log(req.body);
        if (!req.file) {
            throw new Error('No file uploaded.');
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer); 
        const worksheet = workbook.worksheets[0]; 
        
        const firstRow = worksheet.getRow(1).values;
        if (firstRow.length < 4) {
            throw new Error('Invalid file format.');
        }
        let [ , seniority, yearsExperience, availability ] = firstRow;
        if (!['junior', 'senior'].includes(seniority))
            throw new Error('Seniority must have junior or senior value.');
        if (isNaN(yearsExperience))
            throw new Error('Years of experience must be a number.');
        if (!['true', 'false'].includes(availability))
            throw new Error('Availability must be true or false.');
        availability = availability === 'true';

        const query = { name: req.body.name, surName: req.body.surname };
        const previousRow = await this.repository.getOneEntity(query);
        if (previousRow) {
            await this.repository.update({ seniority, yearsExperience, availability }, query);
        }
        else {
            this.repository.create({ name: req.body.name, surName: req.body.surname, seniority, yearsExperience, availability });
        }
        return { name: req.body.name, surName: req.body.surname, seniority, yearsExperience, availability };
    }
}

exports.CandidateService = CandidateService;