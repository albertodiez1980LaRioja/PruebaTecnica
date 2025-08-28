
const { Router } = require('express');

class BaseController {
    constructor(service, options = {}) {
        this.router = Router();
        this.service = service;
        this.options = options;

    }

    async create(req, res) {
        const newRow = await this.service.create(req, res);
        if (newRow) {
            res.json({
                message: 'Created succefully',
                data: newRow
            });
        }

        return newRow;
    }
}

exports.BaseController = BaseController;

