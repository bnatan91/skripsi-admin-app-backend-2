import { Op } from 'sequelize';
import Subjects from '../models/SubjectsModel.js';
import Users from '../models/UsersModel.js';

export const getSubjects = async (req, res) => {
  try {
    let response;
    if (req.roles === 'admin') {
      console.log('test');
      response = await Subjects.findAll({
        attributes: ['uuid', 'name', 'category'],
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Subjects.findAll({
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
    const subject = await Subjects.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!subject) {
      return res.status(404).json({ msg: 'Subject Not Found' });
    }

    let response;
    if (req.roles === 'admin') {
      console.log('test');
      response = await Subjects.findAll({
        attributes: ['uuid', 'name', 'category'],
        where: {
          id: subject.id,
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'email'],
          },
        ],
      });
    } else {
      response = await Subjects.findAll({
        attributes: ['uuid', 'name', 'category'],
        where: {
          [Op.and]: [{ id: subject.id }, { userId: req.userId }],
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
    await Subjects.create({
      name: name,
      category: category,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'succesfully add subject' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateSubjects = async (req, res) => {
  try {
    const subject = await Subjects.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!subject) {
      return res.status(404).json({ msg: 'Subject Not Found' });
    }

    const { name, category } = req.body;
    if (req.roles === 'admin') {
      console.log('test');
      await Subjects.update(
        {
          name: name,
          category: category,
        },
        {
          where: {
            id: subject.id,
          },
        },
      );
    } else {
      if (req.userId !== subject.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Subjects.update(
        {
          name: name,
          category: category,
        },
        {
          where: {
            [Op.and]: [{ id: subject.id }, { userId: req.userId }],
          },
        },
      );
    }
    res.status(200).json({ msg: 'Successfully Update Subject' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSubjects = async (req, res) => {
  try {
    const subject = await Subjects.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!subject) {
      return res.status(404).json({ msg: 'Subject Not Found' });
    }
    if (req.roles === 'admin') {
      console.log('test');
      await Subjects.destroy({
        where: {
          id: subject.id,
        },
      });
    } else {
      if (req.userId !== subject.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Subjects.destroy({
        where: {
          [Op.and]: [{ id: subject.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: 'Successfully Delete Subject' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
