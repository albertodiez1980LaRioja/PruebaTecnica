const ExcelJS = require('exceljs');
const { CandidateService } = require('./candidate-service');
const { CandidateRepository } = require('./candidate-repository.js');
const { Candidate } = require('./candidate-model.js');


const repositoryMock = {
    getOneEntity: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
};

async function createExcelBuffer(firstRowValues) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Test');
    sheet.addRow(firstRowValues);
    return await workbook.xlsx.writeBuffer();
}

describe('CandidateService', () => {
    let service;

    beforeEach(() => {
        service = new CandidateService(/*repositoryMock*/ new CandidateRepository(Candidate));
        jest.clearAllMocks();
    });

    test('should throw error if file is too large', async () => {
        const buffer = Buffer.alloc(1024 * 1024 + 1);
        await expect(service.dataFromExcel(buffer))
            .rejects
            .toThrow('File too large. Maximum allowed size is 1 MB.');
    });

    test('should throw error if no worksheets found', async () => {
        const workbook = new ExcelJS.Workbook();
        const buffer = await workbook.xlsx.writeBuffer();

        await expect(service.dataFromExcel(buffer))
            .rejects
            .toThrow('No worksheets found.');
    });

    test('should throw error for invalid format (less than 4 columns)', async () => {
        const buffer = await createExcelBuffer(['junior', 5]);

        await expect(service.dataFromExcel(buffer))
            .rejects
            .toThrow('Invalid file format.');
    });

    test('should throw error if seniority is invalid', async () => {
        const buffer = await createExcelBuffer([, 'mid', 5, 'true']); // seniority no válido

        await expect(service.dataFromExcel(buffer))
            .rejects
            .toThrow('Seniority must have junior or senior value.');
    });

    test('should parse valid Excel', async () => {
        const buffer = await createExcelBuffer([, 'junior', 3, 'true']);
        const result = await service.dataFromExcel(buffer);

        expect(result).toEqual({
            seniority: 'junior',
            yearsExperience: 3,
            availability: true,
        });
    });

    test('create() should call repository.create when no previous row exists', async () => {
        const buffer = await createExcelBuffer([, 'senior', 10, 'false']);
        const req = {
            file: { buffer },
            body: { name: 'John', surname: 'Doe' },
        };

        const result = await service.create(req);

        expect(result).toMatchObject({
            name: 'John',
            surName: 'Doe',
            seniority: 'senior',
            yearsExperience: 10,
            availability: false,
        });
    });

    test('create() should call repository.create when previous row exists', async () => {
        const buffer = await createExcelBuffer([, 'senior', 11, 'true']);
        const req = {
            file: { buffer },
            body: { name: 'John', surname: 'Doe' },
        };

        const result = await service.create(req);

        expect(result).toMatchObject({
            name: 'John',
            surName: 'Doe',
            seniority: 'senior',
            yearsExperience: 11,
            availability: true,
        });
    });
});