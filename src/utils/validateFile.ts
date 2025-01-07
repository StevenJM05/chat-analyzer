import formidable from "formidable";

 export function esArchivoTxt(file : formidable.File): boolean{
    const extensionValida = file.originalFilename?.toLowerCase().endsWith(".txt");
    const mimeValido = file.mimetype === "text/plain";
    return !!extensionValida && mimeValido;
 }