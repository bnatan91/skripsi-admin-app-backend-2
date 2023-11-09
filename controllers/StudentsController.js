import Users from '../models/UsersModel.js';
import Students from '../models/StudentsModel.js';
import { Op } from 'sequelize';
import Majors from '../models/MajorsModel.js';

export const getStudents = async (req, res) => {
  try {
    let response;
    if (req.roles === 'admin') {
      response = await Students.findAll({
        attributes: ['uuid', 'studentCode'],
        include: [
          {
            model: Users,
            attributes: ['name', 'username'],
          },
        ],
      });
    } else {
      response = await Students.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'username'],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student Not Found' });
    }

    let response;

    if (req.roles === 'admin') {
      response = await Students.findAll({
        attributes: ['uuid', 'studentCode'],
        where: {
          id: student.id,
        },
        include: [
          {
            model: Majors,
          },
        ],
      });
    } else {
      response = await Students.findAll({
        attributes: ['uuid', 'studentCode'],
        where: {
          [Op.and]: [{ id: student.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Majors,
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createStudents = async (req, res) => {
  const { studentCode } = req.body;
  try {
    await Students.create({
      studentCode: studentCode,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'successfully add student' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStudents = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student Not Found' });
    }

    const { studentCode } = req.body;
    if (req.roles === 'admin') {
      await Students.update(
        {
          studentCode: studentCode,
        },
        {
          where: {
            id: student.id,
          },
        },
      );
    } else {
      if (req.userId !== student.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Students.update(
        {
          studentCode: studentCode,
        },
        {
          where: {
            [Op.and]: [{ id: student.id }, { userId: req.userId }],
          },
        },
      );
    }
    res.status(200).json({ msg: 'Successfully Update Student' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteStudents = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student Not Found' });
    } else {
      if (req.userId !== student.userId) {
        return res.status(403).json({ msg: 'Access Forbidden' });
      }
      await Students.destroy({
        where: {
          [Op.and]: [{ id: student.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: 'Successfully Delete Student' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
