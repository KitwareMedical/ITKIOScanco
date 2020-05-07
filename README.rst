ITKIOScanco
===========

.. image:: https://github.com/InsightSoftwareConsortium/ITKIOScanco/workflows/Build,%20test,%20package/badge.svg

.. image:: https://dev.azure.com/itkioscanco/ITKIOScanco/_apis/build/status/KitwareMedical.ITKIOScanco?branchName=master
    :target: https://dev.azure.com/itkioscanco/ITKIOScanco/_build/latest?definitionId=1&branchName=master
    :alt:    Build Status

.. image:: https://img.shields.io/pypi/v/itk-ioscanco.svg
    :target: https://pypi.python.org/pypi/itk-ioscanco
    :alt: PyPI Version

.. image:: https://img.shields.io/badge/License-Apache%202.0-blue.svg
    :target: https://github.com/KitwareMedical/ITKIOScanco/blob/master/LICENSE
    :alt: License

.. image:: https://mybinder.org/badge.svg
    :target: https://mybinder.org/v2/gh/KitwareMedical/ITKIOScanco/master?filepath=examples%2FITKIOScanco.ipynb

Overview
--------

An `ITK <https://www.itk.org/>`_ module to read and write Scanco microCT .isq files.

ITK is an open-source, cross-platform library that provides developers with an extensive suite of software tools for image analysis. Developed through extreme programming methodologies, ITK employs leading-edge algorithms for registering and segmenting multidimensional scientific images.

.. image:: https://media.giphy.com/media/W1UCXb57bzGZDOi4kr/giphy.gif
  :alt: ITKIOScano Notebook

Installation
------------

Python
``````

Binary `Python packages <https://pypi.python.org/pypi/itk-ioscanco>`_ are
available for Linux, macOS, and Windows. They can be installed with::

  python -m pip install --upgrade pip
  python -m pip install itk-ioscanco

C++
```

Build the module as a separate project against an ITK build tree::

  git clone https://github.com/KitwareMedical/ITKIOScanco
  mkdir ITKIOScanco-build
  cd ITKIOScanco-build
  cmake -DITK_DIR=/your/path/to/ITK-build ../ITKIOScanco
  cmake --build .

Alternatively, since ITK 5.0, the module can be built by enabling the option::

  Module_IOScanco:BOOL=ON

in ITK's CMake configuration.

License
-------

This software is distributed under the Apache 2.0 license. Please see the
*LICENSE* file for details.
