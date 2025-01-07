export class DateUtils {
  static normalizeTime(hora: string): string {
    return hora.replace(/[\u202F\u00A0]/g, " ").trim();
  }

  static getHourKey(hora: string): string {
    const matchHora = hora.match(
      /^(\d{1,2}):(\d{2})(?::\d{2})? ?(a\. m\.|p\. m\.)$/i
    );

    if (!matchHora) {
      throw new Error(`Hora no válida: ${hora}`);
    }

    let [_, hour, , period] = matchHora;
    let hourNumber = parseInt(hour, 10);

    if (period.toLowerCase() === "p. m." && hourNumber !== 12) {
      hourNumber += 12;
    } else if (period.toLowerCase() === "a. m." && hourNumber === 12) {
      hourNumber = 0;
    }

    return hourNumber < 12
      ? `${hourNumber === 0 ? 12 : hourNumber} a. m.`
      : `${hourNumber === 12 ? 12 : hourNumber - 12} p. m.`;
  }
}

export const MONTH_NAMES = [
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

// Función para obtener el nombre del mes basado en su índice (0-11)
export const getMonthName = (monthIndex: number): string => {
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("El índice del mes debe estar entre 0 y 11");
  }
  return MONTH_NAMES[monthIndex];
};
