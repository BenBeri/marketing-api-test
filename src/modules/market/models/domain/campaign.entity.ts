import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CampaignContentType} from "../../enums/campaign-content-type.enum";
import {BudgetEntity} from "./budget.entity";

@Entity()
export class CampaignEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    amplifyCampaignId: string;

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

    @OneToOne(type => BudgetEntity, budget => budget.campaign, {cascade: true, onDelete: 'CASCADE'})
    budget: BudgetEntity;

    @Column({type: "text"})
    suffixTrackingCode: string;

    @Column({type: 'simple-json'})
    prefixTrackingCode: object;

    @Column({type: "simple-json"})
    liveStatus: object;

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
}
