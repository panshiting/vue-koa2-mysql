/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('list', {
    todo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // 是否自增
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    }
  }, {
    tableName: 'list'
  })
}
