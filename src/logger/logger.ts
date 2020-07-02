import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {

  static error(message: any, context: string) {
    if (typeof message === 'object') {
      message = extractErrorMessage(message);
    }
    super.error(message, null, context);
  }

  log(message: any, context?: string): void {
    super.log(message, context);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context);
  }

  static crudRequest(requestMethod: string, service: string, endpoint: string, context: string): void {
    const message: string = `Making ${requestMethod.toUpperCase()} request to ${service} - at ${endpoint}`;
    super.log(message, context);
  }

  static crudSuccess(requestMethod: string, service: string, endpoint: string, context: string): void {
    const message: string = `${requestMethod.toUpperCase()} request to ${service} - at ${endpoint} - Succeed.`;
    super.log(message, context);
  }
}

const httpResponseError = 'response';
const jwtOrDbError = 'message';
const extractErrorMessage = (errorObject: any): string => {
  const objectKeys: string[] = Object.keys(errorObject);
  if (objectKeys.indexOf(httpResponseError) !== -1) {
    if (errorObject.response && errorObject.response.data && errorObject.response.data.error) {
      return errorObject.response.data.error.message;
    }
  }
  if (objectKeys.indexOf(jwtOrDbError) !== -1) {
    return `${errorObject.message} - ${errorObject.name}`;
  }
  console.error(errorObject);
  return 'Error occurred';
};
