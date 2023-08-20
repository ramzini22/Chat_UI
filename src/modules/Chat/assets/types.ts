export type IStatus = 'done' | 'content';
export interface IMessage {
  id: number;
  idFrom: number;
  status: IStatus;
  message: string;
}
