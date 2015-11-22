from os import listdir
from os.path import join
from convert_obj_three import convert_ascii
import sys

path = "C:/Users/Aleksander/Documents/3dsMaxProjects/Threejs_platformer/export/"

def is_object_file(input_file):
	if input_file[-4:] == ".obj":
		return True
	else:
		return False

files = [ f for f in listdir(path) if is_object_file(join(path,f)) ]

fileStart = ""

if len(sys.argv) > 1:
	fileStart = sys.argv[1]

for f in files:

	if (fileStart != "") & f.startswith(fileStart):
		input = path + f
		output = f[:-3] + "js"
		convert_ascii(input, "", "", output)
	elif fileStart == "":
		input = path + f
		output = f[:-3] + "js"
		convert_ascii(input, "", "", output)
