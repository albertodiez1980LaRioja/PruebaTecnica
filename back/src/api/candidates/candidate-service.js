const ExcelJS = require('exceljs');


let { BaseService } = require("../../../shared/base/base-service.js");


class CandidateService extends BaseService {

    constructor(repository, options = {}) {
        super(repository, options);
    }


    async create(req, res) {
        console.log(req.body, req.file);
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer); // leer desde memoria
        const worksheet = workbook.worksheets[0]; // primera hoja

        const firstRow = worksheet.getRow(1).values;
        if (firstRow.length < 4) {
            return res.status(400).send('Invalid file format.');
        }
        const seniority = firstRow[1];
        const yearsExperience = Number(firstRow[2]);
        let availability = firstRow[3];
        if (!['junior', 'senior'].includes(seniority))
            return res.status(400).send('Seniority must have junior or senior value.');
        if (isNaN(yearsExperience))
            return res.status(400).send('Years of experience must be a number.');
        if (!['true', 'false'].includes(availability))
            return res.status(400).send('Seniority must have junior or senior value.');
        availability = availability === 'true';
        console.log(seniority, yearsExperience, availability);



        return { name: req.body.name, surName: req.body.surname, seniority, yearsExperience, availability };
    }
}

exports.CandidateService = CandidateService;