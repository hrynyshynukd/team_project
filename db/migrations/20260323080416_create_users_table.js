/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
 return knex.schema.createTable('users', table => {
   table.increments('id').primary();
   table.string('email').notNullable().unique();
   table.string('username').notNullable();
   table.string('password_hash').notNullable();
   table.timestamps(true, true); // Adds created_at and updated_at
 });
};


exports.down = function(knex) {
 return knex.schema.dropTableIfExists('users');
};