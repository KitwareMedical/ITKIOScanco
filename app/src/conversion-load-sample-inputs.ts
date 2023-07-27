export default async function conversionLoadSampleInputs (model) {
  const progressBar = document.querySelector('#conversionInputs sl-progress-bar[name=progress]')
  progressBar.value = 0
  progressBar.setAttribute('style', 'display: block;')

  const inputVolumeElement = document.querySelector("#conversionInputs sl-input[name=input-volume]")

  const url = import.meta.env.DEV ? '/sample-data/AIMIOTestImage.AIM' : 'https://itk.mypinata.cloud/ipfs/QmPaZBXqb99fsKQi28tCuGpW1LgiVrBYKRimY28nA9mYgE'
  const response = await fetch(url)
  const contentLength = parseInt(response.headers.get('Content-Length'))
  inputVolumeElement.helpText = 'Input volume size: ' + contentLength + ' bytes'

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
    const percent = receivedLength / contentLength * 100
    progressBar.value = percent
    progressBar.textContent = `${percent.toFixed(2)}%`
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