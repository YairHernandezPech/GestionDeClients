import { Injectable } from '@nestjs/common';
import { NotesDto } from "../DTO/createDTO";
import { NotesRepository } from "../repository/notes.repository";

@Injectable()
export class NotesService {

    constructor(private readonly notesRepository: NotesRepository) { }


    async create(obj: NotesDto): Promise<any> {
        try {
            const newNote = await this.notesRepository.create(obj)
            return newNote
        }
        catch (err) {
            console.log(err)
        }

    }
    async findAll(): Promise<any[]> {
        try {
            const note = await this.notesRepository.get()
            return note

        } catch (error) {
            console.log(error)
        }
    }
    async update(_id, obj: NotesDto): Promise<any> {
        try {
            const updateNote = await this.notesRepository.update(_id, obj)
            return updateNote;

        } catch (error) {
            console.log(error)
        }
    }
    async delete(_id): Promise<any> {
        try {
            const note = await this.notesRepository.delete(_id)
            return note;
        } catch (error) {
            console.log(error)
        }
    }
}
