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

function displayUIText(showWords)
{
	scaledUIContext.fillStyle = "black";
	scaledUIContext.fillRect(0, 0, scaledUICanvas.width, scaledUICanvas.height);
	scaledUIContext.font = "bold 15px Arial";
	scaledUIContext.fillStyle = "white";
	scaledUIContext.fillText(showWords, 600, 30);
}
