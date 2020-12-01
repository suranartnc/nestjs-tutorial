import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  short: parseInt(process.env.CACHE_SHORT, 10) || 60,
  medium: parseInt(process.env.CACHE_MEDIUM, 10) || 60 * 5,
  long: parseInt(process.env.CACHE_LONG, 10) || 60 * 10,
}));
