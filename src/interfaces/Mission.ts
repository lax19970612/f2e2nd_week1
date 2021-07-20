export default interface Mission {
  id: number;
  complete: boolean;
  name: string;
  unitTime: number; // using seconds
  executeTime: number; // using seconds
}
