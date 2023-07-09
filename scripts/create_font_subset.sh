#!/bin/bash

pyftsubset "$1" --output-file="bitter-regular-subset.woff2" --flavor="woff2" --layout-features="kern,liga,clig,ccmp,locl,mark,mkmk" --unicodes="U+0041-005A,U+0061-007A"
