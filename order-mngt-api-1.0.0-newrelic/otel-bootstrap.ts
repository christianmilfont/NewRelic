import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// Configuração do logger do OpenTelemetry
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const newRelicApiKey = '63e29ebb818309dd859e41d256ee2113FFFFNRAL';

// Exportador OTLP para enviar os dados para o New Relic
const traceExporter = new OTLPTraceExporter({
  url: 'https://otlp.nr-data.net:4317',
  headers: {
    'api-key': newRelicApiKey,
  },
});

// Configuração do SDK com nome de serviço diretamente
const sdk = new NodeSDK({
  traceExporter,
  serviceName: 'order-mgnt-api', // Definindo o nome do serviço diretamente
});

sdk.start(); // Inicia o SDK

console.log('✅ OpenTelemetry configurado e SDK iniciado');
