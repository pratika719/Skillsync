import { Client,Account } from "appwrite";
const client =new client();


client
  .setEndpoint("https://cloud.appwrite.io/v1") // or your self-hosted endpoint
  .setProject("YOUR_PROJECT_ID");



export const account =new Account(client);

