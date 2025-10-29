There's probably a better way to do seeding for join tables.

for larger data sets you'd need to do pagination of some sort.
I'd probably avoid letting users go through more than a few hundred due to performance issues with pagination
LIMIT + OFFSET could have significant performance issues. there are alternative pagination approaches, but are real humans going to scan 100,000 advocates?


on the filtering side, you'll want indexes to support any filters you add. Worth setting up a test in CI to ensure drizzle kit thinks the filters are indexed.

on the frontend side, more filters should be added. I would also consider an alternative way of asking users rather than having many filters like in ecommerce. 
One approach would be like have a user answer several multiple choice questions, or ask them to explain what they're looking for and then use an LLM to build a filter for a user. 
that would feel better on mobile.

if we wanted huge tables of advocates anyways, we'd need to use virtual lists of some sort. too large of a list could cause react performance issues.

I didn't  really touch the full text search part here. since we're using postgres we can create full text search indexes, although I'm not familiar with how those work.
if it became a large enough issue you could look into running an elasticsearch, or equivalent, cluster. the difficulty here would be keeping it in sync with pg

you'd want to add a debounce function in order to prevent sending 1 request per character typed.

I believe next 14 is no longer maintained so I did consider upgrading this.
