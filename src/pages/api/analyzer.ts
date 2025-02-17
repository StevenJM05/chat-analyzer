import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { extraerTxtDeZip } from "@/utils/fileUtils";
import { esArchivoTxt, esArchivoZip } from "@/utils/validateFile";
import AnalyzerService from "@/services/analyzer-service";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      return res
        .status(400)
        .json({ message: "No se encontró ningún archivo en la solicitud." });
    }

    const file = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;
    let fileContent: string | null = null;

    if (esArchivoZip(file)) {
      fileContent = extraerTxtDeZip(file.filepath);

      if (!fileContent) {
        return res.status(400).json({
          message: "El archivo .zip no contiene archivos .txt.",
        });
      }
    } else if (esArchivoTxt(file)) {
      fileContent = await fs.readFile(file.filepath, "utf-8");
    } else {
      return res
        .status(400)
        .json({ message: "El archivo no es un .txt o .zip válido." });
    }
    const analyzerService = new AnalyzerService(fileContent);

    return res
      .status(200)
      .json({
        count: analyzerService.countMessages(),
        days: analyzerService.countDays(),
        messagesByMonth: analyzerService.countMessagesByMonth(),
        messagesByYear: analyzerService.countMessagesByYear(),
        messagesByHour: analyzerService.messagesByHour(),
        messagesBySender: analyzerService.countMessagesBySender(),
      });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ message: "Error al procesar la solicitud" });
  }
}
