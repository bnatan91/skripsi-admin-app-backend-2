import isEmpty from 'lodash/isempty.js';
import Majors from '../models/MajorsModel.js';
import Students from '../models/StudentsModel.js';
import Subjects from '../models/SubjectsModel.js';

export const getAllSubjects = async (req, res) => {
  try {
    const response = await Subjects.findAll({
      attributes: ['id', 'name', 'value', 'category', 'checkedT', 'checkedS'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStudent = async (req, res) => {
  const student = await Students.findOne({
    where: {
      studentCode: req.body.studentCode,
    },
    include: [
      {
        model: Majors,
      },
    ],
  });
  if (!student) {
    return res.status(404).json({ msg: 'Student Not Found' });
  }
  res.status(200).json(student);
};
