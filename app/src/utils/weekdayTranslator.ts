const weekdays = {
  Terca: 'Terça',
  Sabado: 'Sábado',
};

type WeekdayType = keyof typeof weekdays;

export const weekdayTranslator = (weekday?: string) => {
  if (!weekday) return '';

  const translate = weekdays[weekday as WeekdayType];

  return translate ? translate.toLowerCase() : weekday.toLowerCase();
};
