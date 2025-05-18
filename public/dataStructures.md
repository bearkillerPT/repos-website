# Messages, Data Structures and Logic

## Initial setup

Após um slave ser configurado, ele:
- dá subscribe to outqueue/0/Config
- envia um heartbeat com o stationID 0
- Recebe uma config message, verifica que o macAddress da mensagem é o mesmo do slave e fica com o stationID que vem na mensagem
- dá unsubscribe from outqueue/0/Config
- dá subsribe to outqueue/{stationID}/Reservation 

## Config

Mensagem enviada, pela API, para configurar um slave, após receber um heartbeat com stationID 0.

- Tópico: outqueue/0/Config
- Estrutura:

```ts
interface Config_t {
  stationID: number; // int
  macAddress: string; // string
}
```

## Heartbeat

Os heartbeats são usados para saber se um slave está online e, durante reservas, para calcular a energia consumida.
(RTOS task) É extremamente importante que sejam mensagens realmente periódicas, com um desvio e desfasamento minimo (especialmente durante a reserva).

- Período 10s
- Tópico: inqueue/{stationID}/Heartbeat
- Estrutura:

```ts
interface Heartbeat_t {
  status: "READY" | "CHARGING";
  iRMSCurrent0: number; // float/double
  iRMSCurrent1: number; // float/double
  iRMSCurrent2: number; // float/double
  macAddress: string;
  referencePosition: {
    latitude: number; // float/double
    longitude: number; // float/double
  };
  currentConfig: {
    maxPower: number; // int - configuration maxPower
    voltage: number; // int
    // either we have a voltage reading or we hardcode it with the voltage measured during the instalation
    connectionType: 0 | 1 | 2 | 3;
    // 0 - monophasic using phase 0
    // 1 - monophasic using phase 1
    // 2 - monophasic using phase 2
    // 3 - triphasic
  };
  timestamp: number; // unsigned long - Epoch timestamp in milliseconds
  currentReservation: number | null; // unsigned long - id of the reservation currently being charged
  fwVersion: string; // we can and should implement OTA updates
}
```

- Lógica durante reservas, por exemplo, para uma reserva das 10:00 às 11:00:
  - 10:00:00: o slave entra em reserva;
  - 10:00:10: o slave envia o primeiro heartbeat com a média da corrente lida, durante os 10s, em cada fase;
  - 11:00:00: o slave envia o ultimo (360º) heartbeat da reserva.

## Reservations

### Criar uma reserva

- Tópico outqueue/{stationID}/Reservation
- Estrutura:

```ts
interface Reservation_t {
  id: number; // unsigned long
  startTime: number; // unsigned long
  endTime: number; // unsigned long
  selectedConnector: number; // int
  maxPower: number; // int
}
```

### Confirmar uma reserva

Mensagem enviada, pelo slave, para confirmar uma reserva.

- Tópico: inqueue/{stationID}/ConfirmReservation"
- Estrutura:

```ts
interface ConfirmReservation_t {
  id: number; // unsigned long reservationID
}
```

# Pontos a discutir com o Vitor
- Método concreto do setup inicial do slave:
  - Se for direto (i.e. modbus), após a config podemos printar o stationID e o resto é feito na APP.
- Mensagens para erros (limite de potencia excedido,);
- Reservas monofásicas, em fase específica, num carregador ligado a 3 fases;
- OTA updates;

# Perguntas para o Rui

- Vamos configurar a localização (latitude e longitude) do master/slaves?
