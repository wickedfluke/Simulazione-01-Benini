import express from 'express';
import { list, createTodo, markAsChecked, markAsNotChecked } from './todo.controller';
import { CreateTodoDTO } from './todo.dto';
import { validate } from '../../utils/validation-middleware';

const router = express.Router();

router.get('/', list);
router.post('/', validate(CreateTodoDTO), createTodo);
router.patch('/:id/check', markAsChecked);
router.patch('/:id/uncheck', markAsNotChecked);

export default router;