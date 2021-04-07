import express from 'express';
import { Dream } from '../../db/models';
import { responseApi } from '../helpers/response-api';
import { searchDream } from '../services/dream-service';
const router = express.Router();

router.get('', async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const dream = await searchDream(req, res);

      res.status(200).json(responseApi(200, dream));
    } else {
      const dreams = await Dream.findAll();
      res.status(200).send(responseApi(200, dreams));
    }
  } catch (error) {
    res.status(400).json(responseApi(400, error));
  }
});

router.post('', async (req, res) => {
  try {
    const dream = await Dream.create(req.body);
    res.status(201).json(responseApi(201, dream, 'Dream created'));
  } catch (error) {
    res.status(400).json(responseApi(400, error));
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const dream = await Dream.destroy({
      where: {
        id: id,
      },
    });
    if (dream === 0) {
      return res.status(404).json(responseApi(404, '', 'Dream not found'));
    }
    res.status(200).json(responseApi(200, '', 'Dream deleted'));
  } catch (error) {
    res.status(400).json(responseApi(400, error));
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Dream.update(req.body, {
      where: {
        id: id,
      },
    });
    console.log(updated);
    if (updated[0] === 0) {
      return res.status(404).send(responseApi(404, '', 'Dream not found'));
    }
    const updatedDream = await Dream.findOne({ where: { id: id } });

    res.status(200).json(responseApi(200, updatedDream));
  } catch (error) {
    res.status(400).json(responseApi(400, error));
  }
});

export default router;
