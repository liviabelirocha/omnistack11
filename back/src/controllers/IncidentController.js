const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('Incident').count();
        
        const incidents = await connection('Incident')
            .join('ONG', 'ONG.id', '=', 'Incident.ong_id')
            .limit(5).offset((page-1)*5)
            .select(['Incident.*', 'ONG.name', 'ONG.email', 'ONG.zap', 'ONG.city', 'ONG.uf']);
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('Incident').insert({
            title, description, value, ong_id,
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('Incident')
            .where('id', id).select('ong_id').first();
        
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }

        await connection('Incident').where('id', id).delete();

        return response.status(204).send();
    }
}