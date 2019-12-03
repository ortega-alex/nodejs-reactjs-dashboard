import mysql from 'promise-mysql';
require('custom-env').env();
const db_mysql = {
    config_100: {
        host: process.env.MYSQL_100_HOST,
        user: process.env.MYSQL_100_USER,
        password: process.env.MYSQL_100_PASS,
        database: process.env.MYSQL_100_DATABASE,
    },
    config_30: {
        host: process.env.MYSQL_30_HOST,
        user: process.env.MYSQL_30_USER,
        password: process.env.MYSQL_30_PASS,
        database: process.env.MYSQL_30_DATABASE,
    },
    config_local: {
        host: process.env.MYSQL_LOCAL_HOST,
        user: process.env.MYSQL_LOCAL_USER,
        password: process.env.MYSQL_LOCAL_PASS,
        database: process.env.MYSQL_LOCAL_DATABASE,
    },
    config_27: {
        host: process.env.MYSQL_27_HOST,
        user: process.env.MYSQL_27_USER,
        password: process.env.MYSQL_27_PASS,
        database: process.env.MYSQL_27_DATABASE,
    },
    config_105: {
        host: process.env.MYSQL_105_HOST,
        user: process.env.MYSQL_105_USER,
        password: process.env.MYSQL_105_PASS,
        database: process.env.MYSQL_105_DATABASE,
    }
};

db_mysql.connection_100 = () => {
    db_mysql.pool_100 = mysql.createPool(db_mysql.config_100);
    db_mysql.pool_100.getConnection((err, connection) => {
        if (err) {
            console.log("err 10.100", err.toString());
        }
        if (connection) {
            connection.release();
            console.log('DB is Connected 10.100');
        }
        return
    });
};

db_mysql.connection_30 = () => {
    db_mysql.pool_30 = mysql.createPool(db_mysql.config_30);
    db_mysql.pool_30.getConnection((err, connection) => {
        if (err) {
            console.log("err 10.30", err.toString());
        }
        if (connection) {
            connection.release();
            console.log('DB is Connected 10.30');
        }
        return
    });
};

db_mysql.connection_local = () => {
    db_mysql.pool_local = mysql.createPool(db_mysql.config_local);
    db_mysql.pool_local.getConnection((err, connection) => {
        if (err) {
            console.log("err localhost", err.toString());
        }
        if (connection) {
            connection.release();
            console.log('DB is Connected localhost');
        }
        return
    });
};

db_mysql.connection_27 = () => {
    db_mysql.pool_27 = mysql.createPool(db_mysql.config_27);
    db_mysql.pool_27.getConnection((err, connection) => {
        if (err) {
            console.log("err 11.27", err.toString());
        }
        if (connection) {
            connection.release();
            console.log('DB is Connected 11.27');
        }
        return
    });
};

db_mysql.connection_105 = () => {
    db_mysql.pool_105 = mysql.createPool(db_mysql.config_105);
    db_mysql.pool_105.getConnection((err, connection) => {
        if (err) {
            console.log("err 10.105", err.toString());
        }
        if (connection) {
            connection.release();
            console.log('DB is Connected 10.105');
        }
        return
    });
};

export default db_mysql;