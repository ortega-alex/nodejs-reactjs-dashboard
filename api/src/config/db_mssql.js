import mssql from 'mssql';
require('custom-env').env();

const db_mssql = {
    config : {
        user: process.env.MSSQL_USER,
        password: process.env.MSSQL_PASS,
        server: process.env.MSSQL_HOST,
        database: process.env.MSSQL_DATABASE,
        options: {
            encrypt: true
        }
    }
}

db_mssql.connection = () => {
    db_mssql.pool = new mssql.ConnectionPool(db_mssql.config);
    db_mssql.pool.connect();

    db_mssql.pool.on("errr" , err => {
       console.log('error' , err);
    });
};

export default db_mssql;