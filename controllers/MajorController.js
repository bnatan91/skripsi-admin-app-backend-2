import { Op } from 'sequelize';
import Majors from '../models/MajorModel.js';
import Users from '../models/UsersModel.js';

export const getSubjects = async (req, res) => {
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
        attributes: ['uuid', 'name', 'category'],
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

export const getSubjectsById = async (req, res) => {
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
        attributes: ['uuid', 'name', 'category'],
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
        attributes: ['uuid', 'name', 'category'],
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

export const createSubjects = async (req, res) => {
  const { name, category } = req.body;
  try {
    await Majors.create({
      name: name,
      category: category,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'succesfully add major' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateSubjects = async (req, res) => {
  try {
    const major = await Majors.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!major) {
      return res.status(404).json({ msg: 'Major Not Found' });
    }

    const { name, category } = req.body;
    if (req.roles === 'admin') {
      console.log('test');
      await Majors.update(
        {
          name: name,
          category: category,
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
          category: category,
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

export const deleteSubjects = async (req, res) => {
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
