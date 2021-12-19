
exports.up = function(knex) { // adding data
    return knex.schema.createTable('posts', function(table) { // schema post
        table.increments()
        table.string('title')
        table.text('content')
        table.timestamps(true, true) // type data timestamps // date now
    })
};

exports.down = function(knex) { // rollback data
    return knex.schema.dropTable('posts')
};
