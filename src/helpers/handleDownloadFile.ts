
export const downloadFile = ( link : string ) => {
  const date = new Date().toLocaleString('es-US', { day: 'numeric', month: 'long', year:"numeric", weekday: 'long' });

  const url = window.URL.createObjectURL(new Blob([link]));
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download',`Lista Casos ${date}.xlsx`);
  document.body.appendChild(a);
  a.click();

}