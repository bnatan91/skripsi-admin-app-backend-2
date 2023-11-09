import { Op } from 'sequelize';
import Majors from '../models/MajorsModel.js';
import Students from '../models/StudentsModel.js';

export const getMajors = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student Not Found' });
    }

    const studentId = student.id;

    const major = await Majors.findAll({
      where: {
        studentId: studentId,
      },
    });
    if (!major) {
      return res.status(404).json({ msg: 'Majors Not Found' });
    }
    res.status(200).json(major);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMajorsById = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.studentId,
      },
    });

    const studentId = student.id;

    const major = await Majors.findOne({
      where: {
        [Op.and]: [{ uuid: req.params.id }, { studentId: studentId }],
      },
    });
    if (!major) {
      res.status(404).json({ msg: 'Major Not Found' });
    }
    res.status(200).json(major);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMajors = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.studentId,
      },
    });

    const studentId = student.id;

    const {
      majorLabel,
      majorName,
      majorCategory,
      majorDescription,
      majorExtraNote,
    } = req.body;

    await Majors.create({
      label: majorLabel,
      name: majorName,
      category: majorCategory,
      description: majorDescription,
      extra_note: majorExtraNote,
      studentId: studentId,
      userId: req.userId,
    });
    res.status(201).json({ msg: 'Successfully Add Majors' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMajors = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.studentId,
      },
    });

    const studentId = student.id;

    const major = await Majors.findOne({
      where: {
        [Op.and]: [{ uuid: req.params.id }, { studentId: studentId }],
      },
    });
    if (!major) {
      res.status(404).json({ msg: 'Major Not Found' });
    }

    const {
      majorLabel,
      majorName,
      majorCategory,
      majorDescription,
      majorExtraNote,
    } = req.body;

    await Majors.update(
      {
        label: majorLabel,
        name: majorName,
        category: majorCategory,
        description: majorDescription,
        extra_note: majorExtraNote,
        studentId: studentId,
        userId: req.userId,
      },
      {
        where: {
          [Op.and]: [{ uuid: req.params.id }, { studentId: studentId }],
        },
      },
    );
    res.status(200).json({ msg: 'Successfully Update Major' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMajors = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: {
        uuid: req.params.studentId,
      },
    });

    const studentId = student.id;

    const major = await Majors.findOne({
      where: {
        [Op.and]: [{ uuid: req.params.id }, { studentId: studentId }],
      },
    });

    if (!major) {
      res.status(404).json({ msg: 'Major Not Found' });
    }

    await Majors.destroy({
      where: {
        id: major.id,
      },
    });

    res.status(200).json({ msg: 'Successfully Delete Major' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
