export interface UserSimpleResponseInterface {
  username: string;
  nombres: string;
  apellidos: string;
}

export interface MenuItemInterface {
  label: string;
  routerLink: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  mfaRequired: boolean;
  role: string;
  user: UserSimpleResponseInterface;
  menu: MenuItemInterface[];
}

export interface LoginRequestDTO {
  username: string;
  password: string;
}
