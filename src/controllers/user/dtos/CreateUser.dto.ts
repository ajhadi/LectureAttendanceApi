import { IsString, IsEmail, Matches } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public fullName: string;

  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,{
    message: "dateOfBirth has an invalid time format. It must be in YYYY-MM-DD"
  })
  public dateOfBirth: Date;

  @IsString()
  public address: string;

  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public phoneNumber: string;

  @IsString()
  public password: string;
}