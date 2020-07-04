import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {BudgetEntity} from "./budget.entity";
import {SectionMetadata} from "../../../shared/services/amplify/interfaces/section-metadata.interface";
import {SectionMetrics} from "../../../shared/services/amplify/interfaces/section-metrics.interface";

@Entity()
export class SectionEntity {

    @PrimaryColumn('text')
    id: string;

    @Column({type: 'simple-json'})
    metadata: SectionMetadata;

    @Column({type: 'simple-json'})
    metrics: SectionMetrics;

    @ManyToOne(type => BudgetEntity, budget => budget.sections, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    budget: BudgetEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
