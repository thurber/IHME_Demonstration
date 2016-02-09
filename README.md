# IHME_Demonstration

A data visualization demo project for the IHME.

Displays the relative overweight prevalence in males vs females for a selected country in a selected year for the 25 - 29 age group (my current age group).

Tested in Chrome 48.0, otherwise little focus was placed in supporting older/other browsers.

Live demo available at: http://thurber.github.io/IHME_Demonstration/

React based architecture built with npm and webpack. `src` files include a controller and several components.

To build:
```
npm install -D
webpack -p
```

Improvements could include:
* Better css management
* Handlers for treating the data in a more arbitrary and efficient manner
* Modularization of certain helpers such as tooltips
* Adding the data citation: *Global Burden of Disease Study 2013. Global Burden of Disease Study 2013 (GBD 2013) Obesity Prevalence 1990-2013. Seattle, United States: Institute for Health Metrics and Evaluation (IHME), 2014.*
* etc.


