import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { ApiProperty } from "@nestjs/swagger";
  
  export abstract class BaseModel {
    @ApiProperty({
      required: false,
      description: "uuid",
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @ApiProperty({
      required: false,
      description: "created at",
    })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({
      required: false,
      description: "updated at",
    })
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ApiProperty({
      required: false,
      description: "description",
    })
    @DeleteDateColumn()
    deletedAt: Date;
  }
  