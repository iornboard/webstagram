
const Sequelize = require('sequelize');


module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      birthday: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      Num: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci',
    });
  }


};
