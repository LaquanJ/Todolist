# Template - Web
A template for a ReactJS SPA frontend website.


## Configuration
See [this page](./doc/configuration.md) for details on how to configure the
solution in a deployment context.


## Build and Run Instructions
This repository leverages Docker to streamline development. Use the following
command in this root directory to build and run the solution:

`docker-compose up`

Once running, you can access the solution at
[http://localhost:8080](http://localhost:8080)

### Build Arguments
All required environment variables with the prefix `REACT_APP` must be defined
as build arguments to ensure the packager performs the associated replacements.


## Testing
This solution uses the Jest framework for unit and integration tests. With the
solution running, the test suite can be executed with the following commands:

* Full Test Suite `docker-compose exec app npm run test`
* Unit Test Suite `docker-compose exec app npm run test:unit`
* Integration Test Suite `docker-compose exec app npm run test:integration`
* User Defined Test Pattern `docker-compose exec app npm run test --
  <userpattern>`
  * Example for just the index.jsx unit test: `docker-compose exec app npm run
    test -- unit/index`
* Linting `docker-compose exec app npm run test-lint`
  * Rules applied are green check marked items in https://eslint.org/docs/latest/rules/

### Test Debugging
Port 9230 is setup as the solution's testing debug port and exposed on the
Docker host for development purposes. To debug tests, execute the tests with the
following command:

`docker-compose exec app npm run test-debug`

The container's test execution will then wait for your host's debugger to
attach.

### Test Suite Mount Directory
Due to the opinionated nature of Create React App; all tests must be present
under the root `src` directory to be executed by the toolchain. To maintain the
CLA project structure pattern of keeping tests separate, docker-compose is
configured to mount the host test folder to `/opt/cla/src/__tests__`. The caveat
here is that is may not be obvious where the tests are located depending on if
the developer is in the Docker context or not. Most notably, this will impact
the debugging configuration; a proper setup likely being:

* Local Root
  * ./test
* Remote Root
  * /opt/cla/src/\_\_tests__


## Production vs Development Differences
Production deployment of this solution is predicated on Azure Active Directory
authentication being configured appropriately. To streamline local development
efforts a minimal handful of bypass logic exists to "fake" the authentication
when in development mode as follows:

```
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT ONLY CODE');
  console.log(process.env);
} else {
  console.log('PRODUCTION ONLY CODE');
}
```

When the solution is built for production the NODE_ENV variable and any
underlying gated logic will be stripped from the code base as part of Webpack's
minification effort; since effectively its detected as dead code.
