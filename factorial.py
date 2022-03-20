import sys
import numpy as np
import json
from langdetect import detect, DetectorFactory

data = sys.argv[1]

DetectorFactory.seed = 0
print((detect(data)))