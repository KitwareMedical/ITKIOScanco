import * as imageIo from '@itk-wasm/image-io'

// Use local, vendored WebAssembly module assets
const pipelinesBaseUrl: string | URL = new URL('/itk/image-io', document.location.origin).href
imageIo.setPipelinesBaseUrl(pipelinesBaseUrl)

import './conversion-controller.js'
// import './calibration-controller.js'
