import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckoutOrderInfo, SendMailInterface } from '../types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserActivationLinkMail(
    to: string,
    subject: string,
    firstName: string,
    lastName: string,
    activationToken: string,
  ): Promise<SendMailInterface> {
    const url = `http://localhost:3001/user/activate/${activationToken}`;
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

  async sendUserEditPwdMail(
    to: string,
    subject: string,
    firstName: string,
    lastName: string,
  ): Promise<SendMailInterface> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: './edit-user-pwd-mail',
        context: {
          firstName,
          lastName,
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

  async sendUserOrderMail(
    to: string,
    subject: string,
    orderInformation: CheckoutOrderInfo,
  ): Promise<SendMailInterface> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: './place-order-mail',
        context: {
          ...orderInformation,
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
