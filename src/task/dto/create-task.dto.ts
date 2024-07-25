import { IsBoolean, IsString, IsOptional,} from "class-validator";

export class CreateTaskDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}
