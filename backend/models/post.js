module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    postContent: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true,
      },
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    attachment: {
      type: DataTypes.STRING,
    },
  });

  // Association Post
  Post.associate = (models) => {
    //  User
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      hooks: true,
    });

    // Comment
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
    });

    // Like
    Post.hasMany(models.Like, {
      foreignKey: "postId",
      hooks: true,
    });
  };

  return Post;
};
