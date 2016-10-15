var uiTextPaddingX = 600;
var uiTextPaddingY = 30;
var debugTextPaddingX = 10;
var debugTextPaddingY = 20;

function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng)
{
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
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

function displayUIText(showText)
{
    scaledUIContext.fillStyle = "black";
	scaledUIContext.fillRect(0, 0, scaledUICanvas.width, scaledUICanvas.height);
	scaledUIContext.font = "bold 15px Arial";
	scaledUIContext.fillStyle = "white";
	if (isEditorMode)
	{
		scaledUIContext.fillText(showText, debugTextPaddingX, debugTextPaddingY);
	}
	else
	{
		scaledUIContext.fillText(showText, uiTextPaddingX, uiTextPaddingY);
	}
}

function drawStrokeRect(canvasContext, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor) 
{
  canvasContext.strokeStyle = strokeColor;
  canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function wrapText(text)
{
    scaledUIContext.fillStyle = "black";
    scaledUIContext.fillRect(0, 0, scaledUICanvas.width, scaledUICanvas.height);
    scaledUIContext.font = "bold 15px Arial";
    scaledUIContext.fillStyle = "white";

    var maxWidth = scaledUICanvas.width - uiTextPaddingX - uiTextPaddingY;
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = scaledUIContext.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > 286 && n > 0) {
            scaledUIContext.fillText(line, uiTextPaddingX, uiTextPaddingY);
            line = words[n] + ' ';
            uiTextPaddingY += 20;
        }
        else {
            line = testLine;
        }
    }
    scaledUIContext.fillText(line, uiTextPaddingX, uiTextPaddingY);
}