import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import 'dotenv/config';
import * as path from 'path';

export = {
  transport: {
    host: process.env.HOST_SMTP,
    port: parseInt(process.env.PORT_SMTP),
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PWD,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@localhost>',
  },
  template: {
    dir: path.join(__dirname, 'templates', 'mail'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
