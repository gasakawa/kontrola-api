export type HttpResponse = {
  statusCode: number;
  body: any;
  internalCode?: string;
  headers?: any;
};

export type HttpRequest = {
  body?: any;
  headers?: any;
  params?: any;
  originalUrl: string;
  query?: any;
};
