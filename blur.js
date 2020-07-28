let imageObj = new Image()
imageObj.src = "img.jpg"

imageObj.onload = calcFilter => {
  let canvas = document.getElementById('myCanvas')
  let canvas2 = document.getElementById('myCanvas2')

  let context = canvas.getContext('2d')
  let context2 = canvas2.getContext('2d')

  let imageWidth = imageObj.width
  let imageHeight = imageObj.height

  context2.drawImage(imageObj, 0, 0)

  // grab image data
  let input = context2.getImageData(0, 0, imageWidth, imageHeight)

  // create new array
  let output = new Uint8ClampedArray(input.data.length)

  // set them to be the same
  output = input

  // write new values to array
  for (let i = 0, len = input.data.length; i < len; i++) {
    if (i % 4 === 3) {
      continue
    }

    output.data[i] = (input.data[i] +
      (input.data[i - 4] || input.data[i]) +
      (input.data[i + 4] || input.data[i]) +
      (input.data[i - 4 * imageWidth] || input.data[i]) +
      (input.data[i + 4 * imageWidth] || input.data[i]) +
      (input.data[i - 4 * imageWidth - 4] || input.data[i]) +
      (input.data[i + 4 * imageWidth + 4] || input.data[i]) +
      (input.data[i - 4 * imageWidth + 4] || input.data[i]) +
      (input.data[i + 4 * imageWidth - 4] || input.data[i])
    ) / 9
  }

  console.log(input)
  console.log(output)

  context.putImageData(output, 0, 0)
  delete output
}