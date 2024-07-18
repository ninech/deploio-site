# Deploio Landing Page

This is the landing page for deplo.io. It is based on the [pricing calculator](https://github.com/ninech/pricing-calculator.git).

## Requirements

- [NodeJS 20+](https://nodejs.org/en)
- [npm](https://npm.io) (or equivalent)

## Setup

Clone the repository:

```
git clone git@github.com:ninech/deploio-site.git
```

Change into the new directory:

```
cd deploio-site
```

Install dependencies:

```
npm install
```

Run the setup:

```
npm run setup
```

## Testing

Unit testing is handled by React Testing Library, Jest, swc while End-to-End (E2E) Testing is conducted by Playwright. To run all tests, execute:

```
npm run test
```

## Deployment

To prepare for deployment, run:

```
npm run build
```
