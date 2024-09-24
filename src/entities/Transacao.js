const { EntitySchema } = require('typeorm');

// Definição da entidade Transação
const Transacao = new EntitySchema({
    name: 'Transacao',
    tableName: 'transacoes',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        tipo: {
            type: 'varchar',
            length: 50
        },
        valor: {
            type: 'decimal',
        },
        data: {
            type: 'date'
        }
    },
    relations: {
        usuario: {
            type: 'many-to-one',
            target: 'Usuario',
            joinColumn: true
        }
    }
});

module.exports = Transacao;
