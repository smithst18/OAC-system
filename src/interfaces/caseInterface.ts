export interface Case {
  _id:string
  remitente: "O.A.C" | "ministro" | "viceministerios" | "sala situacional" | "entes adscritos" | "gabinete ministerial" | "abordaje territorial" | "venapp" | "institucion";
  nombreSolicitante:string;
  cedulaSolicitante:string;
  nombreBeneficiario:string;
  cedulaBeneficiario:string;
  telefonoBeneficiario:string,
  edad:string,
  genero:string,
  estado:string,
  municipio:string,
  parroquia:string,
  sector:string,
  tipoBeneficiario:string,
  categoriaId:any,
  subCategoriaId:any,
  prioridad:string,
  status:string,
  fechaRedireccion:string,
  viaResolucion:string,
  enteRedireccionado:string,
  analistaId:any,
  diario:any
  createdAt: string;
  updatedAt: string;
}