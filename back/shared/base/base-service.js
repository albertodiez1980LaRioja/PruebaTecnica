


class BaseService {

    constructor(repository, options = {}) {
        this.repository = repository;
        this.options = options;
    }

    async create(req) {
        return await this.repository.create(req.body);
    }

    async update(req) {
        return await this.repository.update(req.body, req.params);
    }

}

exports.BaseService = BaseService;