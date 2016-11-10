# jQuery Ratings
jQuery Rating Plugin that can be configured via data- attributes or JavaScript.

# Getting Started
By default, the plugin will find any elements that have the data-ratings attribute.

```html
<div>
	<span id="ratings-1" data-ratings='{"max": 5, "value": 0}'></span>
</div>
```

# Configuration
The configuration object accepts the following properties.

Property | Type	| Default
---------|------|--------
enabled|Boolean|true
max|Number|5
icons|Object|
value|Number|0


### enabled (Boolean)
Determines if the ratings are clickable/draggable. Default: true.

### max (Number)
The max number the rating can have. Default: 5.

### icons (Object)
#### empty (String)
HTML string or selector that points to an element to use as the template. This value is used when displaying a rating that has not been selected.

#### full (String)
HTML string or selector that points to an element to use as the template. This value is used when displaying a rating that has been selected.

### value (Number)
The initial value of the ratings.


# Methods
Method | Parameters | Description
-------|------------|-------------
disable|silent (Boolean)|Sets the configuration property `enabled` to false. Triggers the ratings:disabled event. Specifying `silent` to true will prevent the event trigger.
enable|silent (Boolean)|Sets the configuration property `enabled` to true. Triggers the ratings:enabled event. Specifying `silent` to true will prevent the event trigger.
get|property (String)|Retrieved the specified configuration property.
max|value (Number), silent (Boolean)|Sets the configuration property `max`. Triggers the ratings:update and ratings:update.max events. Specifying `silent` to true will prevent the event triggers.
value|value (Number), silent (Boolean)|Set the configuration property `value`. Triggers the ratings:update and ratings:update.value events. Specifying `silent` to true will prevent the event triggers.




# Examples
[View on CODEPEN](http://codepen.io/team/ResourceAmmirati/pen/KNdZWZ)


