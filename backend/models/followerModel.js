module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {});

  Follower.associate = (models) => {
    Follower.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'follower',
    });
    Follower.belongsTo(models.User, {
      foreignKey: 'followedId',
      as: 'followed',
    });
  };

  return Follower;
};
