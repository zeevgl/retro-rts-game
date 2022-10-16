function drawText(ctx, text, x, y, color = "black", textAlign = "center", font = "12px Arial") {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}