


class BaseService {

    constructor(repository, options = {}) {
        this.repository = repository;
        this.options = options;
    }


    async create(req, res) {
        return await this.repository.create(req, res);
    }

}

exports.BaseService = BaseService;