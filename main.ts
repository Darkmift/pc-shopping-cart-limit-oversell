import logger from '@/utils/logger';
import app from './src/index';

app.listen(3000, () => {
  logger.info(
    'Server is running on http://localhost:3000',
    { foo: 'bar' },
    true,
    55,
  );
});
