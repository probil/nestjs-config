import { Inject } from '@nestjs/common';
import { createConfigToken } from './../utils';

export const InjectConfigService = (key: string) =>
  Inject(createConfigToken(key));
