# Eruku Mesi North America

## Documentation

Software Requirements Specification: [doc/srs.md](doc/srs.md) ([see revisions](https://gitlab.cas.mcmaster.ca/tut/eruku-mesi/-/commits/master/doc/srs.md))

Design Document: [doc/design.md](doc/design.md) ([see revisions](https://gitlab.cas.mcmaster.ca/tut/eruku-mesi/-/commits/master/doc/design.md))

SRS-driven roadmap information given in [3.2 Functional Requirements](doc/srs.md#32-functional-requirements).

Note: only the mandatory features in [2.6 Apportioning of Requirements](https://gitlab.cas.mcmaster.ca/tut/eruku-mesi/-/blob/master/doc/srs.md#26-apportioning-of-requirements) are being targeted for the final release while the rest, while included in the requirements/design documentation, would be initially out of scope unless additional time permits.

## Getting Started with Eruku Mesi App

Create a `.env` file in the `backend` directory and replace `<password>` and `<dbname>` with MongoDB password and database name.

## Install & Usage
This project uses node, npm, and expo.

In the `backend` directory:

1. run `npm install`

2. run `nodemon server` or `npm start`

In the project directory, you can run: `npm` and `expo` commands:

1. run `npm install`

2. run `expo start` or `npm start`

Additionally, if testing on mobile, the device may need to be within the same LAN as the serving host to access the back-end API.

Reference: <https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1/>
