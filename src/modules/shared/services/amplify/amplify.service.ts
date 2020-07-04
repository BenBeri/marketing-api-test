import {HttpException, HttpService, HttpStatus, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../../config/config.service";
import {AxiosResponse} from "axios";
import {GetCampaignsResponseDto} from "./dtos/get-campaigns-response.dto";
import {MAX_SECTIONS_RESULT_LIMIT} from "./amplify.consts";
import {convertToDashedDateString} from "../../../../support/date.support";
import {GetCampaignSectionsResponseDto} from "./dtos/get-campaign-sections-response.dto";
import {sleep} from "../../../../support/concurrency.support";

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
    public async getCampaginsForMarketer(marketerId: string): Promise<GetCampaignsResponseDto[]> {
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
        return response.data.campaigns;
    }

    /**
     * Gets all sections for given marketer ID and campaign ID by given date period
     *
     * @param marketerId            The marketer ID
     * @param budgetId              The budget ID
     * @param from                  Date from in yyyy-mm-DD
     * @param to                    Date to in yyyy-mm-DD
     */
    public async getAllSectionsByBudgetId(marketerId: string, budgetId: string, from: Date, to: Date): Promise<GetCampaignSectionsResponseDto[]> {
        const accessToken: string = this.configService.accessToken;
        const baseUrl: string = this.configService.amplifyApiBaseUrl;
        let limit = MAX_SECTIONS_RESULT_LIMIT;

        let response: AxiosResponse;

        const formattedFrom = convertToDashedDateString(from);
        const formattedTo = convertToDashedDateString(to);

        let offset = 0;
        let loadedResults = 0;

        const sections: GetCampaignSectionsResponseDto[] = [];

        let totalResults = -1;
        while(totalResults == -1 || sections.length != totalResults) {
            console.log(`${baseUrl}/reports/marketers/${marketerId}/sections?from=${formattedFrom}&to=${formattedTo}&offset=${0}&budgetId=${budgetId}`);

            try {
                response = await this.httpService.get(`${baseUrl}/reports/marketers/${marketerId}/sections?from=${formattedFrom}&to=${formattedTo}&limit=${limit}&offset=${offset}&budgetId=${budgetId}`,
                    {
                        headers: {
                            "OB-TOKEN-V1": accessToken,
                        }
                    }).toPromise();
                const data: GetCampaignSectionsResponseDto[] = response.data.results;
                loadedResults = data.length;
                offset += limit;

                sections.push(...data);
                if (totalResults === -1) {
                    totalResults = response.data.totalResults;
                    console.log('Loaded total results', totalResults);
                }
                console.log('results in stack', sections.length, ' / ', totalResults);
            } catch (e) {
                if (e.response.status === HttpStatus.TOO_MANY_REQUESTS) {
                    const millisecondsLeft = Number(e.response.headers['rate-limit-msec-left']) + 1000; // +1 sec for extra timing worst case
                    console.log(`sleeping for ${millisecondsLeft} due to API rate limits`);
                    await sleep(e.response.headers['rate-limit-msec-left']);
                }
            }
        }

        return sections;
    }
}
