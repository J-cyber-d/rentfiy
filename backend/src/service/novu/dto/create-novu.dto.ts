export class CreateNovuDto {
  readonly subscriberId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
}
