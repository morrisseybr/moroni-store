import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
} from "firebase-admin/app";

const FIREBASE_SERVICE_ACCOUNT = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
} as const;

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(FIREBASE_SERVICE_ACCOUNT as ServiceAccount),
      })
    : getApps()[0];

export { app };
