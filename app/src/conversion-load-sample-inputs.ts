export default async function conversionLoadSampleInputs (model) {
  const progressBar = document.querySelector('#conversionInputs sl-progress-bar[name=progress]')
  progressBar.value = 0
  progressBar.setAttribute('style', 'display: block;')

  const inputVolumeElement = document.querySelector("#conversionInputs sl-input[name=input-volume]")

  const response = await fetch('/sample-data/AIMIOTestImage.AIM')
  const contentLength = +response.headers.get('Content-Length');
  inputVolumeElement.helpText = 'Input volume size: ' + contentLength + ' bytes'
  progressBar.max = contentLength

  const reader = response.body.getReader()

  let receivedLength = 0
  const chunks = []
  while(true) {
    const {done, value} = await reader.read()

    if (done) {
      break
    }

    chunks.push(value)
    receivedLength += value.length
    progressBar.value = receivedLength
    progressBar.textContent = `${receivedLength.toString()} / ${contentLength.toString()} bytes`
  }

  let inputVolume = new Uint8Array(receivedLength)
  let position = 0;
  for(let chunk of chunks) {
    inputVolume.set(chunk, position); // (4.2)
    position += chunk.length;
  }

  model.inputVolume = inputVolume
  model.inputFileName = 'ITKIOScancoSampleVolume.aim'
  inputVolumeElement.value = inputVolume.subarray(0, 50).toString() + ' ...'
  progressBar.setAttribute('style', 'display: none;')
  progressBar.textContent = ''
  progressBar.max = 100
  progressBar.value = 0

  return model
}