# jQuery Ratings
Plugin that can be configured via data- attributes or JavaScript.
[See it in action!](http://codepen.io/team/ResourceAmmirati/pen/KNdZWZ)

[Quick Start](#quick-start) | [Configuration](#configuration) | [Methods](#methods) | [Events](#events)

# Quick Start
By default, the plugin will find any elements that have the `data-ratings` attribute.

```html
<div>
	<span id="ratings-1" data-ratings='{"max": 5, "value": 0}'></span>
</div>
```


# Configuration
The configuration object accepts the following properties:

Property | Type	| Default
---------|------|--------
[enabled](#enabled-boolean)|Boolean|true
[max](#max-number)|Number|5
[icons](#icons-object)|Object|{"empty": "[SVG]", "full": "[SVG]"}
[value](#value-number)|Number|0


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

[Quick Start](#quick-start) | [Configuration](#configuration) | [Methods](#methods) | [Events](#events)

# Methods
Method | Parameters | Description
-------|------------|-------------
[disable](#disable)|silent (Boolean)|Sets the configuration property `enabled` to false.
[enable](#enable)|silent (Boolean)|Sets the configuration property `enabled` to true. Triggers the `ratings:enabled` event. Specifying `silent` to true will prevent the event trigger.
[get](#get)|property (String)|Retrieves the specified configuration property.
[max](#max)|value (Number), silent (Boolean)|Sets the configuration property `max`.
[value](#value)|value (Number), silent (Boolean)|Set the configuration property `value`. Triggers the `ratings:update` and ratings:update.value events. Specifying `silent` to true will prevent the event triggers.


### disable
#### silent (Boolean) Call without triggering events.
Sets the configuration property `enabled` to false. Triggers the `ratings:disabled` event. Specifying `silent` to true will prevent the event trigger.

```javascript
$('#my-ratings').on('ratings:disabled', function () { console.log('#my-ratings disabled'); });
$('#my-ratings').ratings('disable');
```

### enable
#### silent (Boolean) Call without triggering events.
Sets the configuration property `enabled` to true. Triggers the `ratings:enabled` event. Specifying `silent` to true will prevent the event trigger.

```javascript
$('#my-ratings').on('ratings:enabled', function () { console.log('#my-ratings enabled'); });
$('#my-ratings').ratings('enable');
```

### get
#### property (String) The property to retrieve.
Retrieves the specified configuration property.

```javascript
console.log($('#my-ratings').ratings('get', 'value'));
```

### max
#### value (Number)
#### silent (Boolean) Call without triggering events.
Sets the configuration property `max`. Triggers the `ratings:update` and ratings:update.max events. Specifying `silent` to true will prevent the event triggers.

```javascript
$('#my-ratings').ratings('max', 6);
```

### value
#### value (Number)
#### silent (Boolean) Call without triggering events.
Sets the configuration property `value`. Triggers the `ratings:update` and ratings:update.value events. Specifying `silent` to true will prevent the event triggers.


```javascript
$('#my-ratings').ratings('value', 3);
```
[Quick Start](#quick-start) | [Configuration](#configuration) | [Methods](#methods) | [Events](#events)

# Events

### ratings:change
Triggered after calling the [value](#value) method. Passes the new value to the callback.

### ratings:enabled
Triggered after calling the [enable](#enable) method. Passes the configuration object to the callback.

### ratings:disabled
Triggered after calling the [disable](#disable) method. Passes the configuration object to the callback.

### ratings:update
Triggered after calling the [max](#max) or [value](#value) method. Passes the configuration object to the callback.

[Quick Start](#quick-start) | [Configuration](#configuration) | [Methods](#methods) | [Events](#events)

# Examples
[View on CODEPEN](http://codepen.io/team/ResourceAmmirati/pen/KNdZWZ)


