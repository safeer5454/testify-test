// import { Injectable } from "@nestjs/common";
// import * as postmark from 'postmark'


// @Injectable()
// export class PostmarkService {
// private client: postmark.ServerClient;

// constructor() {
// this.client = new postmark.ServerClient('701b853e-3624-4763-bd5b-5ae99d8aa0f7');
// }

// async sendEmail(to: string, subject: string, content: string) {
// const email = {
// From: ‘your@email.com’,
// To: to,
// Subject: subject,
// HtmlBody: content,
// };

// return this.client.sendEmail(email);
// }
// }