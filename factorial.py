import sys

data = sys.argv[1]

def hello_world(x):
    if x == 1:
        return 1
    else:
        return x * hello_world(x - 1)

print(hello_world( int(data) ))