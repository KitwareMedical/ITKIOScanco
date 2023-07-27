import { readImageArrayBuffer, writeImageArrayBuffer } from "itk-wasm"

import conversionLoadSampleInputs from "./conversion-load-sample-inputs.js"

class ConversionModel {

  inputVolume: Uint8Array
  inputFileName: string
  outputFormat: string
  forceServerSide: boolean
  outputVolume: Uint8Array

  constructor() {
    this.inputFileName = "scanco-volume"
    this.outputFormat = "mha"
    this.forceServerSide = false
    }
  }


class ConversionController  {

  constructor(loadSampleInputs) {
    this.loadSampleInputs = loadSampleInputs

    this.model = new ConversionModel()
    const model = this.model

    this.webWorker = null

    if (loadSampleInputs) {
      const loadSampleInputsButton = document.querySelector("#conversionInputs [name=loadSampleInputs]")
      loadSampleInputsButton.setAttribute('style', 'display: block-inline;')
      loadSampleInputsButton.addEventListener('click', (event) => {
        loadSampleInputs(model)
      })
    }

    // ----------------------------------------------
    // Inputs
    const inputVolumeElement = document.querySelector('#conversionInputs input[name=input-volume-file]')
    inputVolumeElement.addEventListener('change', (event) => {
        const dataTransfer = event.dataTransfer
        const files = event.target.files || dataTransfer.files
        console.log(files[0])

        files[0].arrayBuffer().then((arrayBuffer) => {
            model.inputVolume = new Uint8Array(arrayBuffer)
            const inputVolumeElement = document.querySelector("#conversionInputs sl-input[name=input-volume]")
            inputVolumeElement.value = model.inputVolume.subarray(0, 50).toString() + ' ...'
            inputVolumeElement.helpText = `Input volume size: ${model.inputVolume.length.toString()}  bytes`
        })
    })

    const outputFormatElement = document.querySelector('#conversionInputs sl-select[name=output-format]')
    outputFormatElement.addEventListener('sl-change', (event) => {
        model.outputFormat = outputFormatElement.value
        console.log(model.outputFormat)
    })

    // // ----------------------------------------------
    // // Options
    // const forceServerSideElement = document.querySelector('#conversionInputs sl-checkbox[name=forceServerSide]')
    // forceServerSideElement.addEventListener('sl-change', (event) => {
    //     model.options.set("forceServerSide", forceServerSideElement.checked)
    // })

    // ----------------------------------------------
    // Outputs
    const outputOutputDownload = document.querySelector('#conversionOutputs sl-button[name=output-download]')
    outputOutputDownload.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (model.outputVolume) {
            globalThis.downloadFile(model.outputVolume, `${model.inputFileName}.${model.outputFormat}`)
        }
    })

    const runButton = document.querySelector('#conversionInputs sl-button[name="run"]')
    runButton.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()

      if(!model.inputVolume) {
        globalThis.notify("Required input volume not provided", "Please provide an AIM or ISQ file", "danger", "exclamation-octagon")
        return
      }


      try {
        runButton.loading = true
        const t0 = performance.now()

        const { webWorker, image } = await readImageArrayBuffer(this.webWorker,
          model.inputVolume.slice(),
          'volume.aim'
        )
        this.webWorker = webWorker
        console.log(image)
        // Avoid later use of detached buffer
        const direction = image.direction.slice()
        const { arrayBuffer } = await writeImageArrayBuffer(webWorker, image, `${model.inputFileName}.${model.outputFormat}`)

        const t1 = performance.now()
        globalThis.notify("conversion successfully completed", `in ${t1 - t0} milliseconds.`, "success", "rocket-fill")

        model.outputVolume = new Uint8Array(arrayBuffer)

        outputOutputDownload.variant = "success"
        outputOutputDownload.disabled = false
        const outputOutput = document.querySelector('#conversionOutputs sl-textarea[name=output-file]')
        function replacer (key, value) {
          if (!!value && value.byteLength !== undefined) {
            return String(value.slice(0, 6)) + '...'
          }
          return value
        }
        image.direction = direction
        image.data = "[...]"
        outputOutput.value = JSON.stringify(image, replacer, 2)
      } catch (error) {
        globalThis.notify("Error while running pipeline", error.toString(), "danger", "exclamation-octagon")
        throw error
      } finally {
        runButton.loading = false
      }
    })
  }
}

const conversionController = new ConversionController(conversionLoadSampleInputs)
