## Sobre o Projeto
Este projeto foi desenvolvido para monitorar o status do último pedido feito no site do Tauste em Sorocaba. 
Quando um pedido muda para o status "Saiu para entrega", o sistema envia uma notificação SMS usando o serviço Twilio.

Apesar de simples, ele exclui a necessidade de atualizar o site diversas vezes para verificar o status do pedido, bem
como a verificação da notificação por e-mail (que na minha experiência, tem sido também problemática).

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
#### Clone o repositório:
``` bash
   git clone git@github.com:CarlMartins/tauste-order-monitor.git
   cd tauste-status-scraping
```
#### Instale as dependências:
``` bash
   yarn
```
#### Configure as variáveis de ambiente criando um arquivo na raiz do projeto: `.env`
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
yarn start
```

## Como Funciona
1. O aplicativo inicia um navegador Puppeteer que navega até o site do Tauste
2. Faz login com as credenciais fornecidas
3. Verifica periodicamente a página de histórico de pedidos (por padrão, a cada 5 minutos)
4. Quando detecta um pedido com status "Saiu para entrega", envia uma notificação SMS e encerra a aplicação

## Estrutura do Projeto
- Ponto de entrada da aplicação `index.ts`
- Classe responsável pelo monitoramento usando Puppeteer `tauste-monitor.ts`
- Serviço para envio de notificações SMS via Twilio `twillio-service.ts`

## Licença
Este projeto está licenciado sob a licença MIT.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
