import AdmZip from "adm-zip";

export const convertTxtToJSON = (
  content: string
): Array<Record<string, any>> => {
  try {
    const lines = content.split("\n");
    const messages: Array<Record<string, any>> = [];

    const regexBracketed = /^\[(.+?), (.+?)\] (.+?): (.+)$/;
    const regexBracketedHeader = /^\[(.+?), (.+?)\] (.+?):/;
    const regexNonBracketed =
      /^(\d{1,2}\/\d{1,2}\/\d{2,4}) (\d{1,2}:\d{2}(:\d{2})?) ?(a\. m\.|p\. m\.) - (.+?): (.+)$/;
    const regexNonBracketedHeader =
      /^(\d{1,2}\/\d{1,2}\/\d{2,4}) (\d{1,2}:\d{2}(:\d{2})?) ?(a\. m\.|p\. m\.) - (.+?):/;

    let currentMessage: Record<string, any> | null = null;

    lines.forEach((line: string) => {
      const matchBracketed = line.match(regexBracketed);
      const matchNonBracketed = line.match(regexNonBracketed);

      if (matchBracketed) {
        const [, date, time, sender, message] = matchBracketed;
        if (currentMessage) {
          messages.push(currentMessage);
        }
        currentMessage = {
          fecha: date.trim(),
          hora: time.trim(),
          remitente: sender.trim(),
          mensaje: message.trim(),
        };
      } else if (matchNonBracketed) {
        const [, date, time, , period, sender, message] = matchNonBracketed;
        if (currentMessage) {
          messages.push(currentMessage);
        }
        currentMessage = {
          fecha: date.trim(),
          hora: `${time.trim()} ${period.trim()}`,
          remitente: sender.trim(),
          mensaje: message.trim(),
        };
      } else if (
        regexBracketedHeader.test(line) ||
        regexNonBracketedHeader.test(line)
      ) {
        const [, date, time, sender] =
          line.match(regexBracketedHeader) ||
          line.match(regexNonBracketedHeader) ||
          [];
        if (currentMessage) {
          messages.push(currentMessage);
        }
        currentMessage = {
          fecha: date.trim(),
          hora: time.trim(),
          remitente: sender.trim(),
          mensaje: "sticker omitido",
        };
      } else if (currentMessage) {
        currentMessage.mensaje += `\n${line.trim()}`;
      }
    });

    if (currentMessage) {
      messages.push(currentMessage);
    }

    return messages;
  } catch (error) {
    console.error("Error al convertir el archivo:", error);
    throw new Error("No se pudo procesar el archivo TXT");
  }
};

export function extraerTxtDeZip(zipPath: string): string | null {
  const zip = new AdmZip(zipPath);
  const zipEntries = zip.getEntries();

  const txtFiles = zipEntries.filter((entry) =>
    entry.entryName.toLowerCase().endsWith(".txt")
  );

  if (txtFiles.length === 0) {
    return null; 
  }

  return txtFiles[0].getData().toString("utf-8");
}

