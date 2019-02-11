import { Inject } from '@nestjs/common';
import { ConfigService } from '../module/config.service';

export const InjectConfigService = () => Inject(ConfigService);
