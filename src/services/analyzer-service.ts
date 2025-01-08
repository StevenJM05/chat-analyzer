import { convertTxtToJSON } from "@/utils/fileUtils";
import { DateUtils, MONTH_NAMES, getMonthName } from "@/utils/dateUtils"; 


export default class AnalyzerService {
  private chat: Array<Record<string, any>> = [];

  constructor(file: any) {
    this.chat = convertTxtToJSON(file);
  }

  getChat() {
    return this.chat;
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

  countMessagesBySender() {
    const messagesBySender = this.chat.reduce((acc, message) => {
      if (message.remitente) {
        acc[message.remitente] = (acc[message.remitente] || 0) + 1;
      }
      return acc;
    }, {});
    
    const orderedObject = Object.entries(messagesBySender);
    orderedObject.sort((a, b) => b[1] - a[1]);
    let sortData = Object.fromEntries(orderedObject);
    const sortedKeys = Object.keys(sortData);

    if(sortedKeys.length > 5){
        const top5 : Record<string, number> = {}
        sortedKeys.slice(0,5).forEach(key => {
            top5[key] = sortData[key]
        })
      
        top5["Otros"] = sortedKeys.slice(5, sortedKeys.length - 1).reduce((acc, value)=>{
            acc = acc+sortData[value];
            return acc;
        }, 0)

        sortData = top5
    }
    
    return sortData;
  }

  countMessagesByMonth() {
    const messagesByMonth: Record<string, number> = {};
  
    this.chat.forEach((message) => {
      const [day, month, year] = message.fecha.split("/");
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = getMonthName(monthIndex); 
  
      if (!messagesByMonth[monthName]) {
        messagesByMonth[monthName] = 0;
      }
      messagesByMonth[monthName]++;
    });
  
    // Ordenamos los resultados de Enero a Diciembre
    const orderedMessagesByMonth: Record<string, number> = {};
    MONTH_NAMES.forEach((month) => {
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

    for (let i = 0; i < 24; i++) {
      const key =
        i < 12
          ? `${i === 0 ? 12 : i} a. m.`
          : `${i === 12 ? 12 : i - 12} p. m.`;
      messagesByHour[key] = 0;
    }

    this.chat.forEach((message) => {
      if (message.hora) {
        try {
          const horaNormalizada = DateUtils.normalizeTime(message.hora);
          const hourKey = DateUtils.getHourKey(horaNormalizada);
          messagesByHour[hourKey]++;
        } catch (error) {
          console.warn(`Error procesando hora: ${message.hora}`);
        }
      }
    });

    return messagesByHour;
  }
}
