import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CampaignContentType} from "../../enums/campaign-content-type.enum";
import {BudgetType} from "../../enums/budget-type.enum";
import {BudgetPacingType} from "../../enums/budget-pacing-type.enum";
import {CampaignEntity} from "./campaign.entity";
import {SectionEntity} from "./section.entity";

@Entity()
export class BudgetEntity {

    @PrimaryColumn({type: 'text'})
    id: string;

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

    @Column({type: "date", nullable: true})
    startDate: Date;

    @Column({type: "boolean"})
    runForever: boolean;

    @Column({enum: BudgetType, default: BudgetType.DAILY})
    type: BudgetType;

    @Column({enum: BudgetPacingType})
    pacing: BudgetPacingType;

    @OneToMany(type => CampaignEntity, campaign => campaign.budget)
    @JoinColumn()
    campaigns?: CampaignEntity[];

    @OneToMany(type => SectionEntity, section => section.budget, {cascade: true})
    @JoinColumn()
    sections?: SectionEntity[];
}
