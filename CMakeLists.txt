cmake_minimum_required(VERSION 3.16.3)
project(IOScanco)
set(IOScanco_LIBRARIES IOScanco)

add_definitions(-D_CRT_SECURE_NO_WARNINGS)

if(NOT ITK_SOURCE_DIR)
  find_package(ITK 5.0 REQUIRED)
  list(APPEND CMAKE_MODULE_PATH ${ITK_CMAKE_DIR})
  include(ITKModuleExternal)
else()
  itk_module_impl()
endif()
