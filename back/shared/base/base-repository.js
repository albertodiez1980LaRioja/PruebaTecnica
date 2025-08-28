
class BaseRepository {
    constructor(model, options = {}) {
        this.model = model;
        this.options = options;
    }


    async create(entityDTO) {
        let newRow = await this.model.create(entityDTO);
        return newRow;
    }

    async update(entityDTO, query) {
        const rows = await this.model.findAll(query);
        rows.forEach(async row => {
            await row.update(entityDTO);
        });
        return rows;
    }

    async getOneEntity(params) {
        const element = await this.model.findOne({ where: params });
        return element;
    }
}

exports.BaseRepository = BaseRepository;