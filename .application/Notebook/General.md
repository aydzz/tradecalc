# Features
## Trading Sessions
 - Trading Sessions are not logged in the Journal Records
    - However, they can be logged if the user decided to do so. 
    - Note that the trades that are going to be logged will store only the values that are significant for the Trading Journal Feature.
    - This is a placehoder feature.


## Trading Journal
 - Users will be able to manually input trades in the application
 - Data will only track the significant values to generate trends and perfomance analytics
    - PnLs
    - Durations
    - etc.

# Implementations
- I think it would be better if all entities bound to the user will use the `currentUser.uid` instead of fetching data twice from the DB just to get the userID from the user details table.

# Notes
- 20220904 - added a TradingSession.js Model as a placeholder
   - For now, the implementation of PnL calculation will be on the TradeSetting.js


# Problems: 
## 20220904 - submission using refs refreshes the page
   - Searching the web I found something useful here: https://thewebdev.info/2021/10/03/how-to-prevent-basic-react-form-submit-from-refreshing-the-entire-page/
   - Using the link given, instead of firing the submit() function, we should dispatch an event using the ref instead.
   - Then the event listner in the Form JSX `onSubmit` will catch what we want to do.
   - Take note of the event parameters as they are important in this implementation.