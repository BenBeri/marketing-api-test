import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {CampaignEntity} from "./campaign.entity";

@Entity()
export class CampaignLiveStatusEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(type => CampaignEntity, campaign => campaign.liveStatus, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn()
    campaign: CampaignEntity;

    @Column({type: 'text'})
    onAirReason: string;

    @Column({type: 'boolean'})
    campaignOnAir: boolean;

    @Column({type: 'numeric'})
    amountSpent: number;

    @Column({type: 'timestamp'})
    onAirModificationTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
