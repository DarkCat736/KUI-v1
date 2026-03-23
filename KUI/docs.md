# KUI Docs
___

## Global Constants:

_currentWindow_ - Reference to the current window loaded in the KUI Writer

___
## KUI Writer:

**All KUI Writer commands can be called via `KUIWriter.whateverFunction()`**

_background(color, {x0, y0, x1, y1, r0, r1})_ - Set background of the window to an RGB color by passing an array formated as `[r, g, b]`, OR set the background to a gradient using a KUI Gradient Object passed to the color parameter. You can optionally adjust the way the gradient appears using the x0, y0, x1, y1, r0, and r1 parameters. r0 and r1 are only used on RADIAL gradients.

_createButton(x, y, w, h, id, {color, hoverColor, clickedColor})_ - Create a button element and add it to the element stack. The x and y parameters set the position of the button and the w and h parameters set the width and height of the button. The id parameter allows you to access the element later on in the code. All color parameters are optional, but if you only set the color parameter the others will be auto set based off of that color.

___

## KUI Utils

_KUIGradient(gradientType, stops)_ - (**CLASS**)

`gradientType` can be either the `LINEAR` or `RADIAL` constants.

`stops` follows the format of `[[stopPosition, [r, g, b]]]`, for example: `[[0, [0, 0, 0]], [1, [255, 255, 255]]]` would be a valid stops array.