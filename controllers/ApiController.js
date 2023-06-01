import Subjects from '../models/SubjectsModel.js';

export const getAllSubjects = async (req, res) => {
  try {
    const response = await Subjects.findAll({
      attributes: ['id', 'name', 'value', 'checked'],
    });
    console.log(res);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
