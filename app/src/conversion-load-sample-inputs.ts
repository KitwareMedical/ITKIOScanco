export default async function conversionLoadSampleInputs (model) {
  const progressBar = document.querySelector('#conversionInputs sl-progress-bar[name=progress]')
  progressBar.value = 0
  progressBar.setAttribute('style', 'display: block-inline;')

  // const sampleInput = new Uint8Array([222, 173, 190, 239])
  context.inputs.set("input", sampleInput)
  const inputElement = document.querySelector("#conversionInputs sl-input[name=input-volume]")
  // inputElement.value = sampleInput[:50].toString() + ' ...'

  return model
}