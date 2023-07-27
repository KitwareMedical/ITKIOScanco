import conversionLoadSampleInputs from "./conversion-load-sample-inputs.js"

class ConversionModel {

  inputVolume: Uint8Array
  outputFormat: string
  forceServerSide: boolean

  constructor() {
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
    const inputElement = document.querySelector('#conversionInputs input[name=input-volume-file]')
    inputElement.addEventListener('change', (event) => {
        const dataTransfer = event.dataTransfer
        const files = event.target.files || dataTransfer.files

        files[0].arrayBuffer().then((arrayBuffer) => {
            model.inputs.set("input", new Uint8Array(arrayBuffer))
            const input = document.querySelector("#conversionInputs sl-input[name=input]")
            input.value = model.inputs.get("input").toString().substring(0, 50) + ' ...'
        })
    })

    // // ----------------------------------------------
    // // Options
    // const stringifyElement = document.querySelector('#conversionInputs sl-checkbox[name=stringify]')
    // stringifyElement.addEventListener('sl-change', (event) => {
    //     model.options.set("stringify", stringifyElement.checked)
    // })

    // const compressionLevelElement = document.querySelector('#conversionInputs sl-input[name=compression-level]')
    // compressionLevelElement.addEventListener('sl-change', (event) => {
    //     model.options.set("compressionLevel", parseInt(compressionLevelElement.value))
    // })

    // const dataUrlPrefixElement = document.querySelector('#conversionInputs sl-input[name=data-url-prefix]')
    // dataUrlPrefixElement.addEventListener('sl-change', (event) => {
    //     model.options.set("dataUrlPrefix", dataUrlPrefixElement.value)
    // })

    // ----------------------------------------------
    // Outputs
    const outputOutputDownload = document.querySelector('#conversionOutputs sl-button[name=output-download]')
    outputOutputDownload.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (model.outputs.has("output")) {
            globalThis.downloadFile(model.outputs.get("output"), "output.bin")
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

        const { webWorker, output } = await conversion.conversion(this.webWorker,
          model.inputs.get('input').slice(),
          Object.fromEntries(model.options.entries())
        )

        const t1 = performance.now()
        globalThis.notify("conversion successfully completed", `in ${t1 - t0} milliseconds.`, "success", "rocket-fill")
        this.webWorker = webWorker

        model.outputs.set("output", output)
        outputOutputDownload.variant = "success"
        outputOutputDownload.disabled = false
        const outputOutput = document.querySelector('#conversionOutputs sl-textarea[name=output]')
        outputOutput.value = output.toString().substring(0, 200) + ' ...'
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
