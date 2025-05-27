set(IOScanco_SRCS
  itkDataManipulation.cxx
  itkScancoImageIO.cxx
  itkScancoImageIOFactory.cxx
  )

itk_module_add_library(IOScanco ${IOScanco_SRCS})
