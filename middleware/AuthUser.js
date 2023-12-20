import Users from '../models/UsersModel.js';

export const VerifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Please Login Again' });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    res.status(404).json({ msg: 'User Not Found' });
  }
  req.userId = user.id;
  req.roles = user.roles;
  req.name = user.name;
  next();
};

export const AdminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }
  if (user.roles !== 'admin') {
    return res.status(403).json({ msg: 'Access Forbidden' });
  }
  next();
};
