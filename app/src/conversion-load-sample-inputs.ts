export default async function conversionLoadSampleInputs (model) {
  const progressBar = document.querySelector('#conversionInputs sl-progress-bar[name=progress]')
  progressBar.value = 0
  progressBar.setAttribute('style', 'display: block;')

  const inputVolumeDescription = document.getElementById("input-volume-description")

  const url = import.meta.env.DEV ? '/sample-data/AIMIOTestImage.AIM' : 'https://data.kitware.com/api/v1/file/653283f75be10c8fb6ed4efc/download'
  const response = await fetch(url)
  const contentLength = parseInt(response.headers.get('Content-Length'))
  inputVolumeDescription.innerHTML = `Sample AIM volume size: <sl-format-bytes value="${contentLength}"></sl-format-bytes>`

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
  progressBar.setAttribute('style', 'display: none;')
  progressBar.textContent = ''
  progressBar.max = 100
  progressBar.value = 0

  return model
}
