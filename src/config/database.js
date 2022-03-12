module.exports = {
  dialect: 'postgres',
  host: '172.18.0.2',
  username: 'admin',
  password: 'admin',
  database: 'database',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
