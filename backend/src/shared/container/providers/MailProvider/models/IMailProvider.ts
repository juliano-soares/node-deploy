import ISendMailDTO from '../dtos/ISenMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
