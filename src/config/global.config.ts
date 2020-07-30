import { registerAs } from '@nestjs/config'

export default registerAs('global', () => ({
  port: parseInt(process.env.PORT, 10) || 3000
}));