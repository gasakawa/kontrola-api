export type UserMeasure = {
  id?: number;
  measureId: number;
  value: number;
  createdAt?: Date;
  userMeasureControlId: number;
};

export type UserMeasureControl = {
  id?: number;
  userId: string;
  createdAt?: Date;
  observation: string;
  measures: UserMeasure[];
};
