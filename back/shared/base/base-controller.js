
const { Router } = require('express');

class BaseController {
    constructor(service, options = {}) {
        this.router = Router();
        this.service = service;
        this.options = options;

    }

    async create(req, res) {
        try {
            const newRow = await this.service.create(req);
            if (newRow) {
                res.json(newRow);
            }
            return newRow;
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: 'Error creating resource',
                error: e.message
            });
        }
    }
}

exports.BaseController = BaseController;

