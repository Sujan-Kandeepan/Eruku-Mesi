import os, errno

"""
Beginning of Test Cases
Each stress test will be run and the output will
be outputed to report.json
"""

filename = 'report.txt'

# deletes report.txt only if it already exists
try:
    os.remove(filename)
except OSError as e: 
	if e.errno != errno.ENOENT: # checks ENOENT = errno.ENOENT(no such file exists)
		raise # only executed when a different error occurred 

os.system('echo "---- Beginning of Tests ----\n"')


requests = ["DELETE", "GET", "GET_2", "POST", "POST_2"]
routes = [
			"accounts",
			"events",
			"feedback",
			"file",
			"information",
			"message",
			"newsStory",
			"notification",
			"photo",
			"setting"
		]
ext = ".yaml"

count = 0
total = len(routes) * len(requests)
for route in routes:
	for request in requests:
		count += 1
		file = route + "/" + request + ext
		print("---- Stress Testing " + file + " " + str(count) + "/" + str(total) + " ----")
		os.system('echo "---- Stress Tesing" ' + file + " " + str(count) + "/" + str(total) + " ---- >> report.txt" )
		os.system('artillery run --config config.yaml ' + file + " >> report.txt")