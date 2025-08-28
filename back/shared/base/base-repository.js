
class BaseRepository {
    constructor(model, options = {}) {
        this.model = model;
        this.options = options;
    }

  
    async create(req, res) {
        let campos = req.body;
        try {
            let newRow = await this.model.create(campos, params)
            return newRow;
        } catch (err) {
            console.log('Fail on create', err);
            res.status(500).json({
                message: 'Something goes wrong: ' + err,
                data: {}
            });
        }

    }
}

exports.BaseRepository = BaseRepository;