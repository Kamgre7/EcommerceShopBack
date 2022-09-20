import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailInterface } from '../types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserActivationLinkMail(
    to: string,
    subject: string,
    firstName: string,
    lastName: string,
    userId: string,
  ): Promise<SendMailInterface> {
    const url = `http://localhost:3001/user/activate/${userId}`;
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: './registration-user-mail',
        context: {
          firstName,
          lastName,
          url,
        },
      });
      return {
        isSuccess: true,
        message: 'Email sent successfully!!',
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }
  }
}
