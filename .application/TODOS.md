## 20220907 - ongoing implmentation of pagination ( as discussed in the Fireabase Documentation )
### DONE:
 0. able to fetch records for the first page. 
### TODO:
 1. Pass a last document snapshot instead of null to implement actual pagination
 2. Enable backward pagination.
 3. Convert user initialization to batch writes intead ( if necessitated. )
 4. Use `<Suspense>` instead of useEffect() with state: loading.
 5. When a new trade log has been added,  the previous snapshot last item is still the same, so the current page is not updated but the previous 1.
    - Make it so that the trade logs will move down instead of staying as is.
 6. Add basic security to the firestore queries:
   - Take note of the following
      - Firebase rules ONLY APPLIES to the POTENTIAL result set of the query, it does not guarantee that it will be satisfied UNLESS, the query is compatible with the rule.
         - I know this may sound unclear but I dont really get this at this point. But the point is, when we query, we are getting a list and NOT a single record ( eg: allow list if: resource.data.uid == request.auth.uid) is not working. The query fails.
         - I am assumming this is the case because of what Frank Mentioned here: https://stackoverflow.com/a/57684408/9765927
         - To secure your query (based on what I understand ), we should also structure it in a way that it is aligned with our rules.
7. Add firestore check or ping firestore if available.
8. Use Context in the Calculator  Module