## 20220907 - ongoing implmentation of pagination ( as discussed in the Fireabase Documentation )
### DONE:
 0. able to fetch records for the first page. 
### TODO:
 1. Pass a last document snapshot instead of null to implement actual pagination
 2. Enable backward pagination.
 3. Convert user initialization to batch writes intead ( if necessitated. )
 4. Use `<Suspense>` instead of useEffect() with state: loading.