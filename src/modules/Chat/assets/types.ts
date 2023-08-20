export interface IMessage {
  id: number;
  idFrom: number;
  status: 'done' | 'content';
  message: string;
}
