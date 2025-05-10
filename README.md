# NewRelic

## Repositorio mostrando os arquivos e configs que adicionei para o enviar Logs e Metrics para o NewRelic

### Adicionei na Branch "otel-bootstrap" o arquivo que usei para configurar a mapagem de dados que iria enviar para NewRelic, lá esta documentado o que exatamente fiz para o envio correto (após muitos erros)

### nas configurações do .Env na raiz do projeto, adicionei:
export OTEL_SERVICE_NAME=getting-started-java
export OTEL_EXPERIMENTAL_EXPORTER_OTLP_RETRY_ENABLED=true
export OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION=BASE2_EXPONENTIAL_BUCKET_HISTOGRAM
export OTEL_EXPERIMENTAL_RESOURCE_DISABLED_KEYS=process.command_args
export OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.nr-data.net
export OTEL_EXPORTER_OTLP_HEADERS=api-key=63e29ebb818309dd859e41d256ee2113FFFFNRAL
export OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT=4095
export OTEL_EXPORTER_OTLP_COMPRESSION=gzip
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta

#### Para o mapeaar corretamente o OpenTelemetery.

Já no NewRelic para visualizar os Logs:
Criei uma key API Ingest - License, ja que enviaria uma resposta em JSON e não uma resposta em REST Api!!!

-----------------------------------------------------------------------------------------------------------------------------
O mais importante é você criar sua Api Key e também no codigo declarar o - service.name - para conseguir enviar os logs 
