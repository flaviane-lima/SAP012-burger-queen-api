const { User: UserModel } = require('../model/User');

exports.getUsers = async () => UserModel.find({}, '_id email role ');

exports.getUserById = async (uid) => UserModel.findById(uid, '_id email role ');

exports.getUserByEmail = async (email) => UserModel.findOne({ email }, '_id email role ');

exports.createUser = async (user) => UserModel.create(user);

exports.updateUser = async (id, users) => UserModel.findByIdAndUpdate(id, users);

exports.deleteUser = async (uid) => UserModel.findByIdAndDelete(uid);
