import { Op } from 'sequelize';
import Majors from '../models/MajorsModel.js';
import Users from '../models/UsersModel.js';

export const getMajors = async (req, res) => {
  try {
    let response;
    if (req.roles === 'admin') {
      console.log('test');
      response = await Majors.findAll({
        attributes: ['uuid', 'name', 'category'],
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Majors.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMajorsById = async (req, res) => {
  try {
    const major = await Majors.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!major) {
      return res.status(404).json({ msg: 'Major Not Found' });
    }

    let response;
    if (req.roles === 'admin') {
      console.log('test');
      response = await Majors.findAll({
        attributes: ['uuid', 'name'],
        where: {
          id: major.id,
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Majors.findAll({
        attributes: ['uuid', 'name'],
        where: {
          [Op.and]: [{ id: major.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMajors = async (req, res) => {
  const { name } = req.body;
  try {
    await Majors.create({
      name: name,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'succesfully add major' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateMajors = async (req, res) => {
  try {
    const major = await Majors.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!major) {
      return res.status(404).json({ msg: 'Major Not Found' });
    }

    const { name } = req.body;
    if (req.roles === 'admin') {
      console.log('test');
      await Majors.update(
        {
          name: name,
        },
        {
          where: {
            id: major.id,
          },
        },
      );
    } else {
      if (req.userId !== major.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Majors.update(
        {
          name: name,
        },
        {
          where: {
            [Op.and]: [{ id: major.id }, { userId: req.userId }],
          },
        },
      );
    }
    res.status(200).json({ msg: 'Successfully Update Major' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMajors = async (req, res) => {
  try {
    const major = await Majors.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!major) {
      return res.status(404).json({ msg: 'Major Not Found' });
    }
    if (req.roles === 'admin') {
      console.log('test');
      await Majors.destroy({
        where: {
          id: major.id,
        },
      });
    } else {
      if (req.userId !== major.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Majors.destroy({
        where: {
          [Op.and]: [{ id: major.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: 'Successfully Delete Major' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
