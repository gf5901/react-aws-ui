# AWS React UI

## Why use AWS React UI?

The AWS Console already exists, so why use this?

### 1. Open source

You know exactly what the code does. Calls are made directly to the AWS SDK.

### 2. Can self-host

### 3. No need to log in to AWS

### 4. Fast loading and caching


## Installation

Install homebrew: https://docs.brew.sh/Installation

Install node version manager (nvm):

```
brew install nvm
```

Install yarn

```
brew install yarn
```

Install project dependencies

```
nvm use
yarn install
```

Add your AWS Access and Secret to the .env file

```properties
ACCESS_KEY_ID=my key
SECRET_ACCESS_KEY=my secret
```

## Running Locally

```
yarn start
```

## Build Test

```
yarn build-test
```

## Build Production

```
yarn build-prod
```