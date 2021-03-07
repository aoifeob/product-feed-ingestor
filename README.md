# Product Feed Exercise

In `index.js` you'll find a skeleton function that reads `commerce-feed.csv.gz`
and writes it to `processed.csv.gz`.

Modify the script so that it alters the csv following these rules before
writing it, compressed, back to `processed.csv.gz`

- Wrap all prices with "$ USD" e.g. "529.00" becomes "$529.00 USD"
- Remove all rows where the availability column equals "out of stock"
- Remove all rows where the brand contains "Collier"

When the process is complete, write a brief report to the console.

```
Total Row Count: xxxx
Removed Row Count: xxxx
Max Price: xxxx
Min Price: xxxx
```

Use any npm package you like to help you with this.







