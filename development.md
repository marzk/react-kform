# Development

## 0.0.2

this version focus on other fields, test cases and examples.

### Form Validation Progress

* Sync Validation
  * when to validate? typing or debounce
* Async Validation
  * if it is in pending, should be indicated?
  * race condition
* Submit Validation
* Multiple fields Validation

### Form Value Structure

develop a new form value structure from immutablejs.

### Other Fields

* button
* fieldset
* inpuk[]
  * button
  * checkbox
  * file
  * hidden
  * image
  * password
  * radio
  * reset
  * submit
  * _color_
  * _date_
  * _datetime_
  * _email_
  * _month_
  * _number_
  * _range_
  * _search_
  * _time_
  * _url_
* label
* select & option
* progress
* textarea

these should be dealt for dirty code.

### Test cases & examples

should include all these fields.

* validation
  * sync/async validate
  * call other fields validate
  * set field status freely
* dirty
  * undirty, check every field validation
* input[text]
  * username
    * sync validate word/number/_ 8 - 16
    * async validate if has same username
  * password
    * sync validate word/number/_ 8 - 16
    * sync validate same with confirmPassword
  * confirmPassword
    * sync validate same with password
  * submit
    * check every field isValid
    * isValid false, return
    * validate every field
    * any sync vaidate is rejected, return
    * ok

## 0.0.1
  * input onChange/onBlur
  * form onSubmit
  * sync/async validate
