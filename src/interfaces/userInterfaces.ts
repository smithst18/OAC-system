export interface User{
  _id:string
  name:string
  ci:string
  rol:string
  birdDate?:string
  createdAt?:string
  phoneNumber:string
  updatedAt?:string
}

export interface signUpUser{
  name:string
  ci:string
  rol:string
  password:string
  repassword:string
  birdDate:string
  phoneNumber:string
}

export interface AnalistaI{
  _id:string
  ci:string
  name:string
}