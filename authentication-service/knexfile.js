import path from 'path';

const authDbPath =
  process.env.NODE_ENV === 'production'
    ? '/app/database/database.sqlite'
    : path.join(
        process.cwd(),
        '../authentication-service/src/database/database.sqlite'
      );

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: authDbPath
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: authDbPath
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    }
  },
  authentication: {
    client: 'sqlite3',
    connection: {
      filename: authDbPath
    },
    useNullAsDefault: true,
  },
}

export default config
