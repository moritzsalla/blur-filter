const c = document.querySelector('canvas');
const ctx = c.getContext('2d');

const targetWidth = 400;
const targetHeight = 400;

c.width = targetWidth * 2;
c.height = targetHeight * 2;
c.style.width = `${targetWidth}px`;
c.style.height = `${targetHeight}px`;
ctx.scale(2, 2);

const img = new Image();
img.src =
  'https://uc9b5404710330d5ef0d5e996615.previews.dropboxusercontent.com/p/thumb/AA11YiYmaAU0Cki2V3SuzzvARyd8afoeg81Fgn0-IXlQAoLYHpQeKcsL52z5GmzXIw3GdeRmT7Whu_YFg47ATpMzjyt63d-HBBYvrCauBpyrSs1LzrcmRT3p_TjqVKcgW52Y7Uniowu-uhlInNOh6tz516czt1LjHc4r-ve6KyAJ55-ZBcB7VrApr-NE58dbVbNJxZI-Xp3qY16XNPfzLuTiipkTVInUrAPuxIzy1kZRfr6uwz1X1-xBuNk5sptqvna4shZW7bFIXVWTxODW-OAyWCFCs-6dxQRzpyFPXHqhHM0lAPp07ivyMptNxweDTFHUZWH0C3p51_gGnlTzhvsVl8oTnSXdZcPIZw7NqDA-8Vaw3Mg84txd4JVJjbdweE7NGM59BSkvg69vo-bTkUoP/p.jpeg?fv_content=true&size_mode=5';
img.crossOrigin = 'Anonymous';
img.onload = () => {
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  const { data } = imgData;

  for (i = 0; i < data.length; i++) {
    // if (i % 4 === 3) {
    //   continue;
    // }

    if (data.filter((_, i) => i % 3 == 0)) {
      colorFilter(data, i);
    }
  }

  for (i = 0; i < targetWidth; i++) console.log(imgData.data[i]);

  ctx.putImageData(imgData, 0, 0);
};

// data = image data, i = iterator, factor = blur intensity
const blurFilter = (data, i, factor) => {
  data[i] =
    (data[i] + // ---------------------------------- COL 1 ROW 1
    data[i - factor] + // -------------------------- COL 2 ROW 1
    data[i + factor] + // -------------------------- COL 3 ROW 1
    data[i - factor * targetWidth] + // ------------ COL 1 ROW 2
    data[i + factor * targetWidth] + // ------------ COL 2 ROW 2
    data[i - factor * targetWidth - factor] + // --- COL 3 ROW 2
    data[i + factor * targetWidth + factor] + // --- COL 1 ROW 3
    data[i - factor * targetWidth + factor] + // --- COL 2 ROW 3
      data[i + factor * targetWidth - factor]) / //- COL 3 ROW 3
    9;
};

const meanFilter = (data, i) => {
  data[i] =
    // TOP
    (data[i - 3 - 1] +
      data[i - 3] +
      data[i - 3 + 1] +
      // CENTER
      data[i - 1] +
      data[i] +
      data[i + 1] +
      // BOTTOM
      data[i + 3 - 1] +
      data[i + 3] +
      data[i + 3 + 1]) /
    9;
};

const colorFilter = (data, i) => {
  data[i] = 120;
};
