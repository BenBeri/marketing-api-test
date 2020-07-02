import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CampaignContentType} from "../../enums/campaign-content-type.enum";
import {BudgetEntity} from "./budget.entity";

@Entity()
export class CampaignEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    campaignId: string;

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

    @Column({type: "json"})
    targeting: object;

    @Column({type: "text"})
    marketerId: string;

    @Column({type: "enum", enum: CampaignContentType})
    contentType: CampaignContentType;

    @OneToOne(type => BudgetEntity, budget => budget.campaign)
    budget: BudgetEntity;

    @Column({type: "text"})
    suffixTrackingCode: string;

    @Column({type: "json"})
    liveStatus: object;

    @Column({type: "boolean"})
    readonly: boolean;

    @Column({type: "text"})
    startHour: string;

    @Column({type: "text"})
    onAirType: string;

    @Column({type: "json"})
    promotedLinksSequences: object;

    @Column({type: "text"})
    objective: string;
}
