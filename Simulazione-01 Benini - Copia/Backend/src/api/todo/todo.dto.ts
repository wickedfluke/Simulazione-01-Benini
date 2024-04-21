import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTodoDTO {
    @IsString()
    title: string;

    @IsDateString()
    @IsOptional()
    dueDate?: string;

    completed: boolean
}
