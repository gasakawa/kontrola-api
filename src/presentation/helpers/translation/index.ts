import { MESSAGES } from 'languages';
import global from 'main/config/global';

export const translate = (code: string, message: string, type: string): string => {
  const { lang } = global;
  let messageTranslated: string;

  if (MESSAGES.errors[lang] === undefined) {
    messageTranslated = message;
  } else if (lang !== 'en') {
    messageTranslated = MESSAGES[type][lang][code];
  } else {
    messageTranslated = message;
  }

  return messageTranslated;
};
