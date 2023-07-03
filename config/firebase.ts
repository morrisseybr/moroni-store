import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
} from "firebase-admin/app";

import serviceAccount from "./moroni-store-firebase-key.json";

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}
