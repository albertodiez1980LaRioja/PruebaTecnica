const ExcelJS = require('exceljs');


let { BaseService } = require("../../../shared/base/base-service.js");


class CandidateService extends BaseService {

    constructor(repository, options = {}) {
        super(repository, options);
    }

    async dataFromExcel(buffer) {
        const MAX_SIZE = 1 * 1024 * 1024;
        if (buffer.length > MAX_SIZE) {
            throw new Error('File too large. Maximum allowed size is 1 MB.');
        }
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        if (workbook.worksheets.length === 0) 
            throw new Error('No worksheets found.');
        const worksheet = workbook.worksheets[0];        
        const firstRow = worksheet.getRow(1).values;
        if (firstRow.length < 4) {
            throw new Error('Invalid file format.');
        }
        let [ , seniority, yearsExperience, availability ] = firstRow;
        if (!['junior', 'senior'].includes(seniority)) {
            throw new Error('Seniority must have junior or senior value.');
        }
        if (isNaN(yearsExperience)) {
            throw new Error('Years of experience must be a number.');
        }
        if (!['true', 'false'].includes(availability)) {
            throw new Error('Availability must be true or false.');
        }
        availability = availability === 'true';
        return { seniority, yearsExperience, availability };
    }


    async create(req) {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }

        const { seniority, yearsExperience, availability } = await this.dataFromExcel(req.file.buffer);
        const query = { name: req.body.name, surName: req.body.surname };
        const previousRow = await this.repository.getOneEntity(query);
        if (previousRow) {
            if (query)
                await this.repository.update({ seniority, yearsExperience, availability }, query);
            else
                throw new Error('Not where on the update.');
        }
        else {
            this.repository.create({ name: req.body.name, surName: req.body.surname, seniority, yearsExperience, availability });
        }
        await this.delay(1000); // don't respond too quickly
        return { name: req.body.name, surName: req.body.surname, seniority, yearsExperience, availability };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));  
    }

}

exports.CandidateService = CandidateService;