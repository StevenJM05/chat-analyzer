export const convertTxtToJSON = (content: string) => {
    try {
      const lines = content.split("\n");
      const messages: Array<Record<string, any>> = [];
  
      const regex = /^\[(.+?), (.+?)\] (.+?): (.+)$/;
  
      lines.forEach((line: string) => {
        const match = line.match(regex);
  
        if (match) {
          const [, date, time, sender, message] = match;
  
          messages.push({
            fecha: date.trim(),
            hora: time.trim(),
            remitente: sender.trim(),
            mensaje: message.trim(),
          });
        } else if (line.includes("sticker omitido")) {
          const [, date, time, sender] =
            line.match(/^\[(.+?), (.+?)\] (.+?):/) || [];
          if (date && time && sender) {
            messages.push({
              fecha: date.trim(),
              hora: time.trim(),
              remitente: sender.trim(),
              mensaje: "sticker omitido",
            });
          }
        }
      });
  
      return messages;
    } catch (error) {
      console.error("Error al convertir el archivo:", error);
      throw new Error("No se pudo procesar el archivo TXT");
    }
  };
  