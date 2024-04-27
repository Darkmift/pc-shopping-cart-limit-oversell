import env from '@/common/config';

import logger from '@/utils/logger';
import app from './src/index';

app.listen(env.PORT, () => {
  logger.info('Server is running on http://localhost:3000');
});
