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

    this.chat.forEach((message) => {
      const [day, month, year] = message.fecha.split("/");

      const key = `${month}`;
      if (!messagesByMonth[key]) {
        messagesByMonth[key] = 0;
      }
      messagesByMonth[key]++;
    });

    return messagesByMonth;
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
  
    this.chat.forEach((message) => {
      const [time, rawPeriod] = message.hora.split(" "); 
      const period = rawPeriod?.trim(); 
      let [hour] = time.split(":"); 
      hour = parseInt(hour, 10); 
  
    
      if (period === "p. m." && hour !== 12) {
        hour += 12; 
      } else if (period === "a. m." && hour === 12) {
        hour = 0; 
      }
  
      const formattedHour = hour.toString().padStart(2, "0"); 
  
      if (!messagesByHour[formattedHour]) {
        messagesByHour[formattedHour] = 0;
      }
      messagesByHour[formattedHour]++;
    });
  
    const orderedMessages = Object.entries(messagesByHour)
      .sort((a, b) => b[1] - a[1]) 
      .reduce((acc, [hour, count]) => {
        acc[hour] = count; 
        return acc;
      }, {} as Record<string, number>);
  
    return orderedMessages;
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
