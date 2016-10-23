function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng)
{
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
	canvasContext.restore();
}

// Rotates around center, instead of top left
function drawRotatedTile(image, imageSourceX, imageSourceY, imageXWidth, imageYHeight, drawXLoc, drawYLoc, drawWidth, drawHeight, angle)
{
    const TO_RADIANS = Math.PI / 180;
    var xyCoord = -image.width / 2;

    canvasContext.save();
    canvasContext.translate(drawXLoc, drawYLoc);
    canvasContext.translate(image.width / 2, image.width / 2);
    console.log("drawXLoc2 = " + drawXLoc + ", " + "drawYLoc2 = " + drawYLoc);
    canvasContext.rotate(angle * TO_RADIANS);

    canvasContext.drawImage(image, imageSourceX, imageSourceY, imageXWidth, imageYHeight, xyCoord, xyCoord, drawWidth, drawHeight);
    console.log("xyCoord = " + xyCoord);
    canvasContext.restore();

}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor)
{
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor)
{
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

var debugTextPaddingX = 0;
var debugTextPaddingY = 0;
function displayUIText(showText, x, y)
{
    var uiTextPaddingX = 600;
    var uiTextPaddingY = 140
	scaledContext.font = "bold 15px Arial";
	scaledContext.fillStyle = "white";
	if (isEditorMode)
	{
	    scaledContext.fillText(showText, x, y);
	}
	else
	{
		scaledContext.fillText(showText, uiTextPaddingX, uiTextPaddingY);
	}
}

function drawStrokeRect(canvasContext, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor) 
{
  canvasContext.strokeStyle = strokeColor;
  canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function wrapText(text)
{
    scaledContext.fillStyle = "black";
    scaledContext.fillRect(0, 0, scaledCanvas.width, scaledCanvas.height);
    scaledContext.font = "bold 15px Arial";
    scaledContext.fillStyle = "white";

    var maxWidth = scaledCanvas.width - uiTextPaddingX - uiTextPaddingY;
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++)
    {
        var testLine = line + words[n] + ' ';
        var metrics = scaledContext.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > 286 && n > 0)
        {
            scaledContext.fillText(line, uiTextPaddingX, uiTextPaddingY);
            line = words[n] + ' ';
            uiTextPaddingY += 20;
        }
        else
        {
            line = testLine;
        }
    }
    scaledContext.fillText(line, uiTextPaddingX, uiTextPaddingY);
}

