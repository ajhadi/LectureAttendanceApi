import { IsString } from 'class-validator';

export default class UserPresentDto {
  @IsString()
    public userId: string;
    
  @IsString()
    public classSectionId: string;
  }
}