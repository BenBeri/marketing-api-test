import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {CampaignContentType} from "../../enums/campaign-content-type.enum";
import {BudgetEntity} from "./budget.entity";
import {CampaignLiveStatus} from "../../../shared/services/amplify/interfaces/campaign-live-status.interface";
import {CampaignLiveStatusEntity} from "./campaign-live-status.entity";

@Entity()
export class CampaignEntity {

    @PrimaryColumn({type: 'text'})
    id: string;

    @Column()
    name: string;

    @Column({type: "boolean"})
    enabled: boolean;

    @Column({type: "timestamp"})
    campaignCreationTime: Date;

    @Column({type: "timestamp"})
    campaignLastModifiedTime: Date;

    @Column({type: "numeric"})
    cpc: number;

    @Column({type: "boolean"})
    autoArchived: boolean;

    @Column({type: "numeric"})
    minimumCpc: number;

    @Column({type: "text"})
    currency: string;

    @Column({type: "simple-json"})
    targeting: object;

    @Column({type: "text"})
    marketerId: string;

    @Column({enum: CampaignContentType, default: CampaignContentType.ARTICLES})
    contentType: CampaignContentType;

    @Column({type: "text"})
    suffixTrackingCode: string;

    @Column({type: 'simple-json'})
    prefixTrackingCode: object;

    @Column({type: "boolean"})
    readonly: boolean;

    @Column({type: "text"})
    startHour: string;

    @Column({type: "text"})
    onAirType: string;

    @Column({type: "simple-json"})
    promotedLinksSequences: object;

    @Column({type: "text"})
    objective: string;

    @ManyToOne(type => BudgetEntity, budget => budget.campaigns, {cascade: true})
    budget: BudgetEntity;

    @OneToOne(type => CampaignLiveStatusEntity, liveStatus => liveStatus.campaign, {cascade: true})
    liveStatus: CampaignLiveStatusEntity;
}
