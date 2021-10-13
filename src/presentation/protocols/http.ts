export type HttpResponse = {
  statusCode: number;
  body: any;
  code?: string;
  headers?: any;
};

export type HttpRequest = {
  body?: any;
  headers?: any;
  params?: any;
  originalUrl: string;
  query?: any;
};
