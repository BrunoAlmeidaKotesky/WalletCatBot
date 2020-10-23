import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1603467860920 implements MigrationInterface {
    name = 'MigrationName1603467860920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "MessageType" ("idMessageType" int NOT NULL IDENTITY(1,1), "nameType" nvarchar(255) NOT NULL, "fromChannel" nvarchar(255), "toChannel" nvarchar(255), "customCommandName" nvarchar(255), "cronTime" nvarchar(255), CONSTRAINT "PK_969c3450dc39e821217a9665989" PRIMARY KEY ("idMessageType"))`);
        await queryRunner.query(`CREATE TABLE "CommandsImages" ("id_image" int NOT NULL IDENTITY(1,1), "sentByUserId" nvarchar(255) NOT NULL, "channelId" nvarchar(255) NOT NULL, "imageUrl" nvarchar(255), "imageFile" varbinary, "serverIDId" int, "messageTypeIdIdMessageType" int, CONSTRAINT "PK_9609e7e74595fa32701b877a236" PRIMARY KEY ("id_image"))`);
        await queryRunner.query(`ALTER TABLE "CommandsImages" ADD CONSTRAINT "FK_a098612adf3c471304a996841a3" FOREIGN KEY ("serverIDId") REFERENCES "ServersList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CommandsImages" ADD CONSTRAINT "FK_a9135196de4192dda0d037130cd" FOREIGN KEY ("messageTypeIdIdMessageType") REFERENCES "MessageType"("idMessageType") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CommandsImages" DROP CONSTRAINT "FK_a9135196de4192dda0d037130cd"`);
        await queryRunner.query(`ALTER TABLE "CommandsImages" DROP CONSTRAINT "FK_a098612adf3c471304a996841a3"`);
        await queryRunner.query(`DROP TABLE "CommandsImages"`);
        await queryRunner.query(`DROP TABLE "MessageType"`);
    }

}
