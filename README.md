# Сервис сокращения URL
Описание проекта
Сервис сокращения URL позволяет пользователям сокращать длинные ссылки, делая их более удобными для использования и распространения. Проект реализован с использованием NestJS для бэкенда, PostgreSQL в качестве базы данных и React для фронтенда.

## Технологии
- Бэкенд: NestJS
- База данных: PostgreSQL
- Фронтенд: React
- Дополнительно: TypeScript, Axios, Redux (или Context API для управления состоянием)



## Требования для запуска через Docker

- [Docker](https://www.docker.com/get-started) (версия 20.10 или выше)
- [Docker Compose](https://docs.docker.com/compose/) (версия 1.27 или выше)

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/RajabovIlyas/url-shortener.git
   cd url-shortener
   ```

## Запуск

Для запуска клиента и сервера выполните следующую команду в корневой директории проекта:

```bash
docker-compose up
```

Это создаст и запустит контейнеры для клиента и сервера. Вы можете добавить флаг -d, чтобы запустить контейнеры в фоновом режиме:


```bash
docker-compose up -d
```

