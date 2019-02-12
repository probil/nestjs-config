import { DynamicModule, Module, Global, Provider } from '@nestjs/common';
import { ConfigService, ConfigOptions } from './config.service';

type Config = { [s: string]: any | Config };

@Global()
@Module({})
export class ConfigModule {
  static resolveSrcPath(startPath: string): typeof ConfigModule {
    ConfigService.resolveSrcPath(startPath);
    return this;
  }

  /**
   * From Glob
   * @param glob
   * @param {ConfigOptions} options
   * @returns {DynamicModule}
   */
  static load(glob: string, options?: ConfigOptions): DynamicModule {
    const configProvider = {
      provide: ConfigService,
      useFactory: async (): Promise<ConfigService> => {
        return ConfigService.load(glob, options);
      },
    };
    return {
      module: ConfigModule,
      providers: [configProvider],
      exports: [configProvider],
    };
  }

  public static forRoot(configs: Config): DynamicModule {
    const providers: Provider[] = [];

    for (let key in configs) {
      providers.push({
        provide: `CONFIG_${key}`,
        useValue: configs[key],
      });
    }

    return {
      module: ConfigModule,
      providers: providers,
    };
  }

  public static forRootAsync(): DynamicModule {
    // TODO use glob to find files and load
    return {
      module: ConfigModule,
      //providers: providers,
    };
  }
}
