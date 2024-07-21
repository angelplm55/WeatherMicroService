# Weather Microservice

Este proyecto es un microservicio en Node.js que proporciona información climática utilizando la API de OpenWeatherMap.

## Configuración

1. Clona este repositorio
2. Crea un archivo `.env` con tu clave API de OpenWeatherMap:
    ```
    OPENWEATHERMAP_API_KEY=tu_api_key
    MONGODB_URI=mongodb://mongo:27017
    PORT=3000
    ```
3. Construye y ejecuta los contenedores:
    ```bash
    docker-compose up --build
    ```

## Endpoints

- `GET /weather?lat={lat}&lon={lon}`: Devuelve la información climática horaria y diaria para las coordenadas especificadas.

## Tests

Ejecuta los tests de integración:
```bash
npm run test-integration

## Postman

Además se ha incluido en el proyecto una colección de Postman para testear la API fácilmente. 



