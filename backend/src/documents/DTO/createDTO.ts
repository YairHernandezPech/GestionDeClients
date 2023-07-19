import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class DocumentsDto {
    
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly status: string
    @IsNotEmpty()
    readonly type: string
    key: string;
    url: string;

}
