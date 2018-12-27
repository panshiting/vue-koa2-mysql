/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // 是否自增
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    }
  }, {
    tableName: 'user'
  })
}
