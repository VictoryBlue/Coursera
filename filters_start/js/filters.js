/* Filters the given pixels to grayscale.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterGrayscale(pixels) {
    let r, g, b, distance;
    for (let i = 0; i < pixels.length; i+=4) {
        r = pixels[i];
        g = pixels[i+1];
        b = pixels[i+2];
        pixels[i] = pixels[i+1] = pixels[i+2] = (r + g + b)/Math.sqrt(3);
    }
    return pixels;
}

/* Brightens the given pixels.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterBrighten(pixels) {
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] = pixels[i] + 10;
    }
    return pixels;
}

/* Applies a threshold filter to the given pixels. Makes all pixels above
 * the threshold black and all pixels below the threshold white.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterThreshold(pixels) {
    let r, g, b, distance;
    for (let i = 0; i < pixels.length; i+=4) {
        {
            r = pixels[i];
            g = pixels[i+1];
            b = pixels[i+2];
            distance = Math.sqrt(r**2 + g**2 + b**2);
            if (distance < 255/2) {
                pixels[i] = 0;
                pixels[i+1] = 0;
                pixels[i+2] = 0;
            } else {
                pixels[i] = 255;
                pixels[i+1] = 255;
                pixels[i+2] = 255;
            }
        }
    }
    return pixels;
}
