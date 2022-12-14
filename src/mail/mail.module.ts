import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig = require('../mailerconfig');

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
