import {HttpModule, Module} from '@nestjs/common';
import {ConfigModule} from "../../config/config.module";
import {AmplifyService} from "./services/amplify/amplify.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ],
    providers: [
        AmplifyService
    ],
    exports: [
        AmplifyService
    ],
})

export class SharedModule {
}
