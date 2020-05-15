import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providdersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providdersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerDayAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
