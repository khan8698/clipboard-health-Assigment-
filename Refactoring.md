# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Tickets

1. Create mapping for the department agent ID with agent ID in central DB
   - Estimate: 0.5h
   - Acceptence criteria: For every Agent with a department ID ther exist a Agent Id
   - Description: Create a new table in DB with following columns
     - ID
     - Department ID
     - Agent Department ID
     - Agent Central ID
2. Create CRUD APIs which translates the department ID to central ID.
   - Estimate: 6h
   - API will return central DB Agent ID when a valid agent ID is provided. It should handle the errors appropriately.
   - Description: Create APIs Which will create, read, update and delete the Central DB Agent ID if client provides a valid department ID/Agent ID. APIs should be protected and should be accessible to appropriate user only. In case of invalid department ID appropriate errors should be returned. Unauthorized persons shouldn't have access to this API. All edge cases must be handled.
3. Create a function which will get the agent data from central DB after getting the central DB agent ID when department requests
   - Estimate: 2h
   - API will get Agent data from central DB when a valid agent ID is provided. It should handle the errors appropriately.
   - Description: Create an API which will return the Agent details if client provides a valid agent ID. API should be protected and should be accessible to appropriate user only. In case of invalid ID appropriate errors should be returned. Unauthorized persons shouldn't have access to this API. All edge cases must be handled.
4. Upgrade function in such a way that it would cache the data once called and update that periodically
   - Estimate: 8h
   - API will cache Agent data it got from central DB.
   - Description: A cache mechanism should be implemented for the function which will keep the user data from central DB in cache once DB has returned the data. It shoul dalso update the data periodically. The refresh time perios Shouls be configurable

### Assumptions:
1. Department information data base is separate from the central DB.
2. Microservice architecture would be followed.
3. Multiple services could communicate with each other.
4. Every department got its separate service which interact with other services