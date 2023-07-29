import { Injectable } from '@nestjs/common';
import { NotesDto } from "../DTO/createDTO";
import { NotesRepository } from "../repository/notes.repository";

@Injectable()
export class NotesService {

    constructor(private readonly notesRepository: NotesRepository) { }


    async create(documentsDto: NotesDto,uuidClient): Promise<any> {
        try {
            const newNote = await this.notesRepository.create(documentsDto,uuidClient)
            return newNote
        }
        catch (err) {
            console.log(err)
            throw new Error('Failed to Create');
        }

    }
    async findAll(uuidClient: string): Promise<any[]> {
        try {
            const lsnote = await this.notesRepository.getByUuid(uuidClient)
            return lsnote

        } catch (error) {
            console.log(error)
            throw new Error('Failed to Get');
        }
    }
    async update(uuidClient:string,uuidNote:string, documentsDto: NotesDto): Promise<any> {
        try {
            const updateNote = await this.notesRepository.update(uuidClient,uuidNote, documentsDto)
            return updateNote;

        } catch (error) {
            console.log(error)
            throw new Error('Failed to Update');
        }
    }
    async delete(uuidClient:string,uuidNote:string): Promise<any> {
        try {
            const note = await this.notesRepository.delete(uuidClient,uuidNote)
            return note;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to Delete');
        }
    }
}
