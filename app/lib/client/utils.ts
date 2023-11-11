export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function extractDateTime(date: Date) {
  const stringDate = date.toString();

  const yymmdd = stringDate.slice(0, 10);
  let time = stringDate.slice(11, 16);

  return `${yymmdd} @ ${time}`;
}
