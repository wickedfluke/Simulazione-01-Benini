import { Todo } from './todo.entity';
import { TodoModel } from './todo.model';
import { NotFoundError } from '../../errors/not-found';

export class TodoService {
    constructor(private todoModel: typeof TodoModel) { }

    async list(includeCompleted: boolean): Promise<Todo[]> {
        let query: any = {};
        if (!includeCompleted) {
            query.completed = false; 
        }
        return TodoModel.find(query);
    }

    async create(newTodo: Todo): Promise<Todo> {
        const createdTodo = new this.todoModel(newTodo);
        return createdTodo.save();
    }

    async markAsChecked(id: string): Promise<Todo | null> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: true }, { new: true }).exec();
        if (!updatedTodo) {
            throw new NotFoundError();
        }
        return updatedTodo;
    }

    async markAsNotChecked(id: string): Promise<Todo | null> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: false }, { new: true }).exec();
        if (!updatedTodo) {
            throw new NotFoundError();
        }
        return updatedTodo;
    }
}
