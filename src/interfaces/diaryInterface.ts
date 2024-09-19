export interface Diary {
  description: string,
  casoId:string,
  caseStatus:string,
  userId:string,
  createdAt?:string | Date,
  updatedAt?:string | Date
}