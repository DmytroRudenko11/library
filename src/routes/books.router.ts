import { UpdateBookRequestDto, AddBookRequestDto } from '../common/dto/request';
import { getAll, getById, add, updateById, deleteById } from '../controllers';
import express from 'express';
import { validateBody, authenticate, parseIdParam } from '../middlewares';

const router = express.Router();

router.use(authenticate);

router.get("/", getAll);

router.get("/:id", parseIdParam, getById);

router.post(
  "/",
  validateBody(AddBookRequestDto),
  add
);

router.put(
  "/:id",
  validateBody(UpdateBookRequestDto),
  parseIdParam,
  updateById
);

router.delete("/:id", parseIdParam, deleteById);

export default router;