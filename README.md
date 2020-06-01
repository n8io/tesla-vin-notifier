# tesla-vin-notifier

## Setup

```shell
nvm install
yarn
cp -n .env.example .env # Fill out env variables
yarn dev
open https://localhost:3000
```

## Deploy to AWS Lamda
```shell
# Assuming you have installed apex up (https://apex.sh/docs/up/)
cp -n up.example.json up.json # Fill out env variables
up
```
