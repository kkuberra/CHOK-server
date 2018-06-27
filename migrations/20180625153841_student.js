
exports.up = function(knex, Promise) {
    return knex.schema.createTable('student', (table) => {
        table.increments()
        table.text('name')
        table.string('picture')
        table.text('school')
        table.string('email')
        table.string('password')
        table.string('interests')
        table.float('hours')
        table.integer('internship_id')
            .notNullable()
            .references('id')
            .inTable('internship')
            .index()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('student')
};
