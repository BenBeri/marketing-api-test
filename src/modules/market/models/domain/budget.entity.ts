import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CampaignContentType} from "../../enums/campaign-content-type.enum";
import {BudgetType} from "../../enums/budget-type.enum";
import {BudgetPacingType} from "../../enums/budget-pacing-type.enum";
import {CampaignEntity} from "./campaign.entity";

@Entity()
export class BudgetEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => CampaignEntity, campaign => campaign.budget, {onDelete: 'CASCADE'})
    @JoinColumn()
    campaign: CampaignEntity;

    @Column({type: "text"})
    amplifyBudgetId: string;

    @Column({type: "text"})
    name: string;

    @Column({type: "boolean"})
    shared: boolean;

    @Column({type: "numeric"})
    amount: number;

    @Column({type: "text"})
    currency: string;

    @Column({type: "timestamp"})
    creationTime: Date;

    @Column({type: "timestamp"})
    lastModified: Date;

    @Column({type: "date"})
    startDate: Date;

    @Column({type: "boolean"})
    runForever: boolean;

    @Column({enum: BudgetType, default: BudgetType.DAILY})
    type: BudgetType;

    @Column({enum: BudgetPacingType})
    pacing: BudgetPacingType;
}
