export default interface IUser {
  first_name: string
  last_name: string
  email: string
  username: string
}

export interface IAuth {
  access: string
  refresh: string
  user: IUser
}
