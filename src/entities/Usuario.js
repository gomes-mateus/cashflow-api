const { EntitySchema } = require('typeorm');

// Define a entidade Usuario como um EntitySchema, que é compatível com JavaScript puro
const Usuario = new EntitySchema({
    name: 'Usuario',  // Nome da entidade
    tableName: 'usuarios',  // Nome da tabela no banco de dados
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        nome: {
            type: 'varchar',
            length: 255
        },
        email: {
            type: 'varchar',
            length: 255
        },
        senha: {
            type: 'varchar',
            length: 255
        }
    }
});

module.exports = Usuario;
