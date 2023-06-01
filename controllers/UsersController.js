import argon2 from 'argon2';
import Users from '../models/UsersModel.js';

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ['uuid', 'name', 'email', 'roles'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsersById = async (req, res) => {
  console.log(req.param);
  try {
    const response = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ['uuid', 'name', 'email', 'roles'],
    });
    if (!response) {
      return res.status(404).json({ msg: 'User Not Found' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUsers = async (req, res) => {
  const { name, email, password, confPassword, roles } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password not match Confirm Password' });
  }
  const hashPasword = await argon2.hash(password);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPasword,
      roles: roles,
    });
    res.status(201).json({ msg: 'succesfully add user' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }

  const { name, email, password, confPassword, roles } = req.body;
  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password not match Confirm Password' });
  }

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        roles: roles,
      },
      {
        where: {
          uuid: req.params.id,
        },
      },
    );
    res.status(200).json({ msg: 'Users Updated' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }

  try {
    await Users.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
