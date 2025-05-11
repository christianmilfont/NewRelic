## O que fiz para o traceId capturar:
- importei o otel-bootstrap na main
- dentro do app.controller, adicionei duas constantes (Span e traceId) visando logar o traceId quando o pedido chegar
- dentro do meu app.service, propaguei os headers de trace ao chamar outros serviços
- tambem tirei a integração direta com o newrelic dentro do service, ja que meu .env e otel ja estao configurados
- mesmo no meu controller ja existindo as duas constantes eu adicionei la tbm para deixar mais independete.

### agora que instrumentei meu backend, mexi no frontend para ele capturar esse meu trace e o enviar as requisicoes

- para isso fiz um otel-frontend, configurando span e capturando meu trace
- depois importei no meu App.jsx principal
- agora para propagar o traceparent do front para o back, precisei incluir o cabeçalho traceparent nas requisições http enviadas do frontend, de forma que o backend possa ler esse cabeçalho e associar os logs de ambos os lados
- nesse caso como nosso redux no createOrder faz as ações, precisa adicionar o cabeçalho as requisições feitas durante o processo da criacao do pedido

