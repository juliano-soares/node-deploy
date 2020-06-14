import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFinAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFinAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFinAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProvider(
    data: IFinAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
