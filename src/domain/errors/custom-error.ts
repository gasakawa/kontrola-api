import { MESSAGES } from 'languages';
import global from 'main/config/global';

export class CustomError extends Error {
  statusCode: number;

  internalCode: string;

  message: string;

  constructor(message: string, statusCode = 400, internalCode: string, name = 'Custom Error') {
    super();

    const { lang } = global;
    let messageTranslated: string;

    if (MESSAGES.errors[lang] === undefined) {
      messageTranslated = message;
    } else if (lang !== 'en') {
      messageTranslated = MESSAGES.errors[lang][internalCode];
    } else {
      messageTranslated = message;
    }

    this.name = name;
    this.message = messageTranslated;
    this.statusCode = statusCode;
    this.internalCode = internalCode;
  }
}
