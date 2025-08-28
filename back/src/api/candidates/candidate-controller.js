const { CandidateService } = require('./candidate-service.js');
const { CandidateRepository } = require('./candidate-repository.js');
const { Candidate } = require('./candidate-model.js');
const { BaseController } = require("../../../shared/base/base-controller.js");

const multer = require('multer');

class CandidateController extends BaseController {

    constructor(service, options = {}) {
        super(service, options);
        this.router.post('', multer().single('excel'), this.create.bind(this));
    }

}

exports.CandidateController = new CandidateController(new CandidateService(new CandidateRepository(Candidate)));