module.exports = {
    apps: [
      {
        name: 'nestjs-app',
        script: './dist/main.ts',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  