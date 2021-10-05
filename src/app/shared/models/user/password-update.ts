export interface IPasswordUpdate {
  UserResetPasswordForm: IPasswordUpdateForm;
}

interface IPasswordUpdateForm {
  password: string;
  confirm_password: string;
}
