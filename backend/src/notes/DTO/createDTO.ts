import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class NotesDto {
    
    
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly note: string

}
