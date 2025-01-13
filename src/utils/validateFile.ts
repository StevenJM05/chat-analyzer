import formidable from "formidable";


 export function esArchivoTxt(file : formidable.File): boolean{
    const extensionValida = file.originalFilename?.toLowerCase().endsWith(".txt");
    const mimeValido = file.mimetype === "text/plain";
    return !!extensionValida && mimeValido;
 }

 export function esArchivoZip(file: formidable.File): boolean {
   const extensionValida = file.originalFilename?.toLowerCase().endsWith(".zip");
   const mimeValido = file.mimetype === "application/zip";
   return !!extensionValida && mimeValido;
 }