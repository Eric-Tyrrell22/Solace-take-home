# Discussion

## Database & Seeding

- There's probably a better way to do seeding for join tables

## Pagination

- For larger data sets you'd need to do pagination of some sort
- I'd probably avoid letting users go through more than a few hundred due to performance issues with pagination
- `LIMIT + OFFSET` could have significant performance issues
  - There are alternative pagination approaches, but are real humans going to scan 100,000 advocates?

## Filtering

### Backend

- On the filtering side, you'll want indexes to support any filters you add
- Worth setting up a test in CI to ensure Drizzle Kit thinks the filters are indexed

### Frontend

- More filters should be added
- I would also consider an alternative way of asking users rather than having many filters like in ecommerce
  - One approach would be to have a user answer several multiple choice questions
  - Or ask them to explain what they're looking for and then use an LLM to build a filter for a user
  - That would feel better on mobile

## Performance Considerations

- If we wanted huge tables of advocates anyways, we'd need to use virtual lists of some sort
  - Too large of a list could cause React performance issues

## Search

- I didn't really touch the full text search part here
- Since we're using Postgres we can create full text search indexes, although I'm not familiar with how those work
- If it became a large enough issue you could look into running an Elasticsearch, or equivalent, cluster
  - The difficulty here would be keeping it in sync with Postgres

## Input Optimization

- You'd want to add a debounce function in order to prevent sending 1 request per character typed

## Maintenance & Testing

- I believe Next 14 is no longer maintained so I did consider upgrading this
- Also, you'd obviously want to start adding tests
