import puppeteer, { Browser, Page } from "puppeteer";

import { TwilioService } from "./twillio-service";

export class TausteMonitor {
  private readonly loginUrl =
    "https://tauste.com.br/sorocaba3/customer/account/login/";

  private readonly orderHistoryUrl =
    "https://tauste.com.br/sorocaba3/sales/order/history/";

  private readonly checkInterval: number;

  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor(
    private readonly email: string,
    private readonly password: string,
    private readonly zipcode: string,
    checkIntervalMinutes = 5
  ) {
    this.checkInterval = checkIntervalMinutes * 60 * 1000;
  }

  public async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false, slowMo: 20 });
    this.page = await this.browser.newPage();
    await this.page.goto(this.loginUrl);
    await this.login();
  }

  public async startMonitoring(): Promise<void> {
    if (!this.page || !this.browser) {
      throw new Error(
        "O monitor não foi inicializado. Chame initialize() primeiro."
      );
    }

    console.log("Iniciando monitoramento de status do pedido...");
    console.log(`Verificando a cada ${this.checkInterval / 60000} minutos.`);

    const checkStatus = async () => {
      console.log(
        `[${new Date().toLocaleTimeString()}] Verificando status do pedido...`
      );

      await this.accessOrderHistory();
      const status = await this.getLastOrderStatus();

      if (status !== "A caminho") {
        setTimeout(checkStatus, this.checkInterval);

        return;
      }

      console.log("ALERTA: Seu pedido está A CAMINHO!");

      const twilioService = new TwilioService();
      await twilioService.sendSmsNotification();

      return;
    };

    await checkStatus();
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  private async login(): Promise<void> {
    if (!this.page) return;

    console.log("Login");
    await this.closeModal();

    await this.page.waitForSelector("#email");
    await this.page.waitForSelector("#pass");

    await this.page.type("#email", this.email);
    await this.page.type("#pass", this.password);

    await this.page.click(".primary button.login");
  }

  private async closeModal(): Promise<void> {
    if (!this.page) return;

    const modal = await this.page.waitForSelector(".modal-popup", {
      timeout: 5000,
    });

    if (!modal) return;

    await this.page.waitForSelector("#zipcode");
    await this.page.type("#zipcode", this.zipcode);

    await this.page.click(".secondary-toolbar button.action.secondary");
  }

  private async accessOrderHistory(): Promise<void> {
    if (!this.page) return;
    await this.page.goto(this.orderHistoryUrl);
  }

  private async getLastOrderStatus(): Promise<string> {
    if (!this.page) throw new Error("Página não inicializada");

    await this.page.waitForSelector(".orders-history__item");

    const orderNumberSelector =
      ".orders-history__item:first-child .orders-history__item--order span";
    const orderNumber = await this.getValues(orderNumberSelector);

    const statusSelector =
      ".orders-history__item:first-child .orders-history__item--status span";
    const status = await this.getValues(statusSelector);

    console.log(`Número pedido: ${orderNumber} - Status: ${status}`);

    return status;
  }

  private async getValues(selector: string): Promise<string> {
    if (!this.page) throw new Error("Página não inicializada");

    await this.page.waitForSelector(selector);
    const element = await this.page.$(selector);

    return await this.page.evaluate(
      (element) => element?.textContent?.trim() || "",
      element
    );
  }
}
