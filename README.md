## Sobre o Projeto
Este projeto foi desenvolvido para automatizar o monitoramento de status de pedidos do supermercado Tauste em Sorocaba. 
Quando um pedido muda para o status "A caminho", o sistema envia uma notificação SMS usando o serviço Twilio.

## Requisitos
- Node.js (versão recomendada: 18+)
- Yarn
- Conta Twilio para envio de SMS

## Dependências
- dotenv: ^16.5.0
- puppeteer: ^24.10.0
- twilio: ^5.7.0
- eslint-config-getting-better: ^1.0.5

## Instalação
1. Clone o repositório:
``` bash
   git clone git@github.com:CarlMartins/tauste-order-monitor.git
   cd tauste-status-scraping
```
1. Instale as dependências:
``` bash
   yarn
```
1. Configure as variáveis de ambiente criando um arquivo na raiz do projeto: `.env`
``` 
   # Credenciais Tauste
   EMAIL=seu-email@exemplo.com
   PASSWORD=sua-senha
   ZIPCODE=seu-cep
   
   # Credenciais Twilio
   ACCOUNT_SID=sua-account-sid-twilio
   AUTH_TOKEN=seu-auth-token-twilio
   MESSAGE_SENDER_NUMBER=numero-remetente-twilio
   MESSAGE_RECIPIENT_NUMBER=seu-numero-para-receber-sms
```

## Uso
Execute o aplicativo:
``` bash
npx ts-node index.ts
```
ou configure um script no seu : `package.json`
``` json
"scripts": {
  "start": "ts-node index.ts"
}
```
E depois execute:
``` bash
npm run start
```

## Como Funciona
1. O aplicativo inicia um navegador Puppeteer que navega até o site do Tauste
2. Faz login com as credenciais fornecidas
3. Verifica periodicamente a página de histórico de pedidos
4. Quando detecta um pedido com status "A caminho", envia uma notificação SMS
5. O monitoramento continua até que o programa seja encerrado manualmente

## Estrutura do Projeto
- : Ponto de entrada da aplicação `index.ts`
- : Classe responsável pelo monitoramento usando Puppeteer `tauste-monitor.ts`
- : Serviço para envio de notificações SMS via Twilio `twillio-service.ts`

## Licença
Este projeto está licenciado sob a licença ISC.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
