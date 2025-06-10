import * as dotenv from "dotenv";

import { TausteMonitor } from "./tauste-monitor";

dotenv.config();

async function main() {
  const email = process.env.EMAIL || "";
  const password = process.env.PASSWORD || "";
  const zipcode = process.env.ZIPCODE || "";

  if (!email || !password || !zipcode) {
    console.error("Credenciais não configuradas. Verifique o arquivo .env");
    process.exit(1);
  }

  const monitor = new TausteMonitor(email, password, zipcode);

  try {
    await monitor.initialize();
    await monitor.startMonitoring();
  } catch (error) {
    console.error("Erro durante o monitoramento:", error);
    await monitor.close();
  }
}

process.on("SIGINT", async () => {
  console.log("Encerrando monitoramento...");
  process.exit(0);
});

main().then(_ => _);
