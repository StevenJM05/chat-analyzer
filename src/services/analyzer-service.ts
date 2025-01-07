import { message } from "antd";

export default class AnalyzerService {
  private chat: Array<Record<string, any>> = [];

  constructor(file: any) {
    this.chat = convertTxtToJSON(file);
  }

  countMessages() {
    return this.chat.length;
  }

  countDays() {
    const uniqueDays = new Set<string>();
    this.chat.forEach((message) => {
      if (message.fecha) {
        uniqueDays.add(message.fecha);
      }
    });
    return uniqueDays.size;
  }

  countMessagesByMonth() {
    const messagesByMonth: Record<string, number> = {};

    const monthsNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    this.chat.forEach((message) => {
      const [day, month, year] = message.fecha.split("/");
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthsNames[monthIndex];

      if (!messagesByMonth[monthName]) {
        messagesByMonth[monthName] = 0;
      }
      messagesByMonth[monthName]++;
    });

    //Ordenamos de Enero a Diciembre
    const orderedMessagesByMonth: Record<string, number> = {};
    monthsNames.forEach((month) => {
      if (messagesByMonth[month] !== undefined) {
        orderedMessagesByMonth[month] = messagesByMonth[month];
      }
    });

    return orderedMessagesByMonth;
  }

  countMessagesByYear() {
    const messagesByYear: Record<string, number> = {};

    this.chat.forEach((message) => {
      const year = message.fecha.split("/")[2];

      if (!messagesByYear[year]) {
        messagesByYear[year] = 0;
      }
      messagesByYear[year]++;
    });

    return messagesByYear;
  }

  messagesByHour() {
    const messagesByHour: Record<string, number> = {};

    // Crear claves iniciales de 0 a.m. a 11 p.m.
    for (let i = 0; i < 24; i++) {
      const key =
        i <= 11 ? `${i} a. m.` : i === 12 ? `12 p. m.` : `${i - 12} p. m.`;
      messagesByHour[key] = 0;
    }

    this.chat.forEach((message) => {
      const [time, rawPeriod] = message.hora.split(" ");
      const period = rawPeriod?.trim();
      let [hour] = time.split(":");
      hour = parseInt(hour, 10);

      const generatedKey = `${hour} ${period}`.replace(/\s+/g, " ").trim();

      messagesByHour[generatedKey] = (messagesByHour[generatedKey] || 0) + 1;
    });

    return messagesByHour;
  }
}

export const convertTxtToJSON = (
  content: string
): Array<Record<string, any>> => {
  try {
    const lines = content.split("\n");
    const messages: Array<Record<string, any>> = [];

    const regex = /^\[(.+?), (.+?)\] (.+?): (.+)$/;
    const regexHeader = /^\[(.+?), (.+?)\] (.+?):/;

    let currentMessage: Record<string, any> | null = null;

    lines.forEach((line: string) => {
      const match = line.match(regex);

      if (match) {
        const [, date, time, sender, message] = match;
        if (currentMessage) {
          messages.push(currentMessage);
        }
        currentMessage = {
          fecha: date.trim(),
          hora: time.trim(),
          remitente: sender.trim(),
          mensaje: message.trim(),
        };
      } else if (regexHeader.test(line)) {
        const [, date, time, sender] = line.match(regexHeader) || [];
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
