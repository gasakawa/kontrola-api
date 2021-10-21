export type Routine = {
  name: string;
  link: string;
  icon: string;
  position: number;
};

export type Module = {
  id: number;
  name: string;
  icon: string;
  position: number;
  routines: Routine[];
};
