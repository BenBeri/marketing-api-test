import {HttpException, HttpService, HttpStatus, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import {AxiosResponse} from "axios";

@Injectable()
export class AmplifyService {


    public constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    /**
     * Fetching all campaigns by marketer id
     * @param marketerId    string  The marketer ID to fetch campaigns for
     */
    public async getCampaginsForMarketer(marketerId: string) {
        const accessToken: string = this.configService.accessToken;
        const baseUrl: string = this.configService.amplifyApiBaseUrl;

        let response: AxiosResponse;

        try {
            response = await this.httpService.get(`${baseUrl}/marketers/${marketerId}/campaigns`,
                {
                    headers: {
                        "OB-TOKEN-V1": accessToken,
                    }
                }).toPromise();


        } catch (e) {
            console.log(JSON.stringify(e));
        }

        if (response.status !== HttpStatus.OK) {
            throw new HttpException('Something went wrong while fetching campaigns',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response.data;
    }
}
