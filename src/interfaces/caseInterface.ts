export interface Case {
  _id:string
  subId:number,
  remitente: "O.A.C" | "ministro" | "viceministerios" | "sala situacional" | "entes adscritos" | "gabinete ministerial" | "abordaje territorial" | "venapp" | "institucion";
  nombreSolicitante:string;
  cedulaSolicitante:string;
  nombreBeneficiario:string;
  cedulaBeneficiario:string;
  telefonoBeneficiario:string,
  edad:number,
  genero:string,
  estado:string,
  municipio:string,
  parroquia:string,
  sector:string,
  tipoBeneficiario:string,
  categoria: "peticion" | "quejas" | "reclamo" | "sugerencia" | "denuncia",
  subCategoriaId:any,
  tipoId:any,
  prioridad:string,
  status:string,
  fechaRedireccion:string,
  viaResolucion:string,
  enteRedireccionado:string,
  analistaId:any,
  diario:any,
  descripcion:string,
  createdAt: string;
  updatedAt: string;
}