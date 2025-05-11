import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import OrderDto from './OrderDto';
import { trace, context } from '@opentelemetry/api';
import * as newrelic from 'newrelic';

@Controller()
export class AppController {
  @Get()
    getHello():string {
    return 'Hello World';
  }
  constructor(private readonly appService: AppService) {}

  @Post('order')
  async createOrder(@Body() orderDto: OrderDto) {
    // Obter o span ativo do contexto atual
    const span = trace.getSpan(context.active());
const traceId = span ? span.spanContext().traceId : 'trace-not-available';  // Garantindo que o traceId não seja undefined
    // Verificar se o traceId foi encontrado
    if (traceId) {
      // Registrar o evento de log com o traceId
      newrelic.recordLogEvent({
        message: `📥 Pedido recebido com traceId: ${traceId}`,
        level: 'info',
        timestamp: Date.now(),
      });
    } else {
      // Caso o traceId não seja encontrado
      newrelic.recordLogEvent({
        message: '📥 Pedido recebido, mas sem traceId',
        level: 'warning',
        timestamp: Date.now(),
      });
    }

    // Criar o pedido
    return await this.appService.createOrder(orderDto);
  }


  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    return await this.appService.getOrder(id);
  }
}
