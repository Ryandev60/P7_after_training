module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });

  // Association
  Like.associate = (models) => {
    // User
    Like.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    // Post
    Like.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Like;
};
