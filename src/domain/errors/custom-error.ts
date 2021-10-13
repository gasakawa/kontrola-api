import { MESSAGES } from 'languages';
import global from 'main/config/global';

export class CustomError extends Error {
  statusCode: number;

  code: string;

  message: string;

  constructor(message: string, statusCode = 400, code: string, name = 'Custom Error') {
    super();

    const { lang } = global;
    let messageTranslated: string;

    if (MESSAGES.errors[lang] === undefined) {
      messageTranslated = message;
    } else if (lang !== 'en') {
      messageTranslated = MESSAGES.errors[lang][code];
    } else {
      messageTranslated = message;
    }

    this.name = name;
    this.message = messageTranslated;
    this.statusCode = statusCode;
    this.code = code;
  }
}
