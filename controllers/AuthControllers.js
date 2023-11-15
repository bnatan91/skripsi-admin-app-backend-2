import Users from '../models/UsersModel.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) {
    return res.status(400).json({ msg: 'Wrong Password' });
  }
  req.session.userId = user.uuid;
  console.log(req.session.userId);

  const uuid = user.uuid;
  const name = user.name;
  const username = user.username;
  const roles = user.roles;

  res.status(200).json({ uuid, name, username, roles });
};

export const Me = async (req, res) => {
  console.log(req.session);
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Please Login Again' });
  }
  const user = await Users.findOne({
    attributes: ['uuid', 'name', 'username', 'roles'],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    res.status(404).json({ msg: 'User Not Found' });
  }
  res.status(200).json(user);
};

export const LogOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: 'Cannot Log Out' });
    }
    res.status(200).json({ msg: 'Log Out Successfully' });
  });
};
