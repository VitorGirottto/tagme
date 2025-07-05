const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")
const Like = require("./Like")

// Definir associações
User.hasMany(Post, { foreignKey: "author_id", as: "posts" })
Post.belongsTo(User, { foreignKey: "author_id", as: "author" })

User.hasMany(Comment, { foreignKey: "user_id", as: "comments" })
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" })

Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" })
Comment.belongsTo(Post, { foreignKey: "post_id", as: "post" })

User.hasMany(Like, { foreignKey: "user_id", as: "likes" })
Like.belongsTo(User, { foreignKey: "user_id", as: "user" })

Post.hasMany(Like, { foreignKey: "post_id", as: "likes" })
Like.belongsTo(Post, { foreignKey: "post_id", as: "post" })

module.exports = {
  User,
  Post,
  Comment,
  Like,
}
