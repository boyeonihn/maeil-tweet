export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function extractDateTime(date: Date) {
  const stringDate = date.toString();

  const yymmdd = stringDate.slice(0, 10);
  let time = stringDate.slice(11, 16);

  return `${yymmdd} @ ${time}`;
}

export function getInitial(text: string) {
  return text.slice(0, 2).toUpperCase() || '';
}

export function grabUserName(text: string) {
  return text.split('@')[0];
}

export const getKeywords = (content: string) => {
  const keywords = content.split(' ').map((keyword) => ({
    content: {
      contains: keyword,
    },
  }));
  return keywords;
};
