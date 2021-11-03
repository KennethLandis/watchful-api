const ClientsService = {
    getAllClients(knex) {
        return knex.select('*').from('clients')
    },

    getByName(knex, client_name) {
        return knex.from('clients').select('*').where({ client_name }).first()
    },

    insertClient(knex, newClient) {
        return knex
            .insert(newClient)
            .into('clients')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = ClientsService