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
            throw new Error('Failed to Create');
        }

    }
    async findAll(): Promise<any[]> {
        try {
            const note = await this.notesRepository.get()
            return note

        } catch (error) {
            console.log(error)
            throw new Error('Failed to Get');
        }
    }
    async update(uuid, obj: NotesDto): Promise<any> {
        try {
            const updateNote = await this.notesRepository.update(uuid, obj)
            return updateNote;

        } catch (error) {
            console.log(error)
            throw new Error('Failed to Update');
        }
    }
    async delete(uuid): Promise<any> {
        try {
            const note = await this.notesRepository.delete(uuid)
            return note;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to Delete');
        }
    }
}
