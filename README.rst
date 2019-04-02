ITKIOScanco
===========

.. image:: https://dev.azure.com/itkioscanco/ITKIOScanco/_apis/build/status/KitwareMedical.ITKIOScanco?branchName=master
    :target: https://dev.azure.com/itkioscanco/ITKIOScanco/_build/latest?definitionId=1&branchName=master
    :alt:    Build Status

.. image:: https://img.shields.io/pypi/v/itk-ioscanco.svg
    :target: https://pypi.python.org/pypi/itk-ioscanco
    :alt: PyPI Version

.. image:: https://img.shields.io/badge/License-Apache%202.0-blue.svg
    :target: https://github.com/KitwareMedical/ITKIOScanco/blob/master/LICENSE)
    :alt: License

Overview
--------

An `ITK <https://www.itk.org/>`_ module to read and write Scanco microCT .isq files.

ITK is an open-source, cross-platform library that provides developers with an extensive suite of software tools for image analysis. Developed through extreme programming methodologies, ITK employs leading-edge algorithms for registering and segmenting multidimensional scientific images.


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

License
-------

This software is distributed under the Apache 2.0 license. Please see the
*LICENSE* file for details.
