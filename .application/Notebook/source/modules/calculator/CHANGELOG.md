## 2022-10-23: Integrated Formik in the TradeForm 
- used formik for validation
- used standard formik change handlers ( `useFieldProps` ) from formik
	- since this is the case for Formik, handling the updates of calculation ( reassignment of Trade, TradeCalculator ) is being handled in inside Formir Rerenders
- implementing the calculation in formik rerendering causes an infinite loop for the custom comparison function (isEqualTo()) so I had to update the `NullTrade.js` defaul createdDate to `null`
### Take Notes:
- React throws error regarding rerendering CalculatorIndex component when there are problems with rerendering things inside formik. From my perspective this may be cause by the following:
	- Setting of the External Components ( i passed a state setter from parent (eg: CalculatorIndex.jsx ) that is being used by other sibling component ( eg: `TradeLogs.jsx` ))
	- After some tweaking, the Error seems to resolve itself XD ( just take note of this. )