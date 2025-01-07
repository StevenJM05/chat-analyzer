import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from "formidable";
import { esArchivoTxt } from 'Steven/utils/validateFile';
import AnalyzerService, { convertTxtToJSON } from 'Steven/services/analyzer-service';
import fs from "fs/promises";
import { count } from 'console';

export const config = {
  api: {
    bodyParser: false, 
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const form = formidable({ multiples: false });

  try {
    const { files } = await new Promise<{
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, _, files) => {
        if (err) return reject(err);
        resolve({ files });
      });
    });

    const fileEntry = files.file;
    if (!fileEntry) {
      return res.status(400).json({ message: "No se encontró ningún archivo en la solicitud." });
    }

    const file = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;

    // Validar si el archivo es un archivo .txt
    if (!esArchivoTxt(file)) {
      return res.status(400).json({ message: "El archivo no es un archivo .txt" });
    }
    const fileContent = await fs.readFile(file.filepath, "utf-8");

    // Convertir el contenido del archivo a JSON
    const messages = convertTxtToJSON(fileContent);
    const analyzerService = new AnalyzerService(fileContent);
    const size = analyzerService.countMessages();
    const days = analyzerService.countDays();

    return res.status(200).json({ data: messages, count: size, days: days });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ message: "Error al procesar la solicitud" });
  }
}




