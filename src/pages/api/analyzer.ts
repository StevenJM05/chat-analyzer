import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable"; 
import { error } from 'console';
import { esArchivoTxt } from 'Steven/utils/validateFile';
 
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method != "POST"){
    return res.status(405).json({message : "Método no permitido"});
  }

  /** Sirve para que solo se procese un archivo a la vez  */
  const form = formidable({ multiples: false })
  
  form.parse(req, (err: any, fields: any, files: any)=> {
    if(err){
      console.error("Error al recibir el archivo: ", error);
      return res.status(500).json({message : "Error al recibir el archivo"});
    }

    const file = files.file as formidable.File;
    console.log("Ruta de el archivo:", file.filepath);

    
    if(!esArchivoTxt(file)){
      return res.status(400).json({message : "El archivo no es un archivo .txt"});
    }

    return res.status(200).json({ message : "Archivo procesado con exito", file });
  })
}