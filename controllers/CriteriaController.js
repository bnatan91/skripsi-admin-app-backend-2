import Criteria from '../models/CriteriaModel.js';
import Db from '../models/index.js';

const createCriteriaValue = async () => {
  try {
    await Db.sync();

    const criteriaValueData = [
      {
        criteriaName: 'Nilai',
        criteriaValue: 30,
      },
      {
        criteriaName: 'Major',
        criteriaValue: 30,
      },
      {
        criteriaName: 'Rekomendasi Guru',
        criteriaValue: 20,
      },
      {
        criteriaName: 'Mata Pelajaran Pilihan',
        criteriaValue: 20,
      },
    ];
    const createdUsers = await Promise.all(
      criteriaValueData.map(async (criteriaData) => {
        const [criteria, created] = await Criteria.findOrCreate({
          where: { criteriaName: criteriaData.criteriaName },
          defaults: criteriaData,
        });
        return { criteria, created };
      }),
    );

    return createdUsers;
  } catch (error) {
    console.error('Error creating criteria:', error);
  }
};

createCriteriaValue();

export const getCriteria = async (req, res) => {
  try {
    const criteria = await Criteria.findAll({
      attributes: ['id', 'uuid', 'criteriaName', 'criteriaValue'],
    });
    return res.status(200).json(criteria);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCriteriaById = async (req, res) => {
  try {
    const criteria = await Criteria.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ['uuid', 'criteriaName', 'criteriaValue'],
    });

    if (!criteria) {
      return res.status(404).json({ msg: 'Criteria Not Found' });
    }

    return res.status(200).json(criteria);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateCriteriaValue = async (req, res) => {
  try {
    const dataBody = req.body.criteriaData;

    for (const data of dataBody) {
      await Criteria.update(
        {
          criteriaValue: data.criteriaValue,
        },
        {
          where: { uuid: data.uuid },
        },
      );
    }

    return res.status(200).json({ msg: 'SuccessFully Update Criteria' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
