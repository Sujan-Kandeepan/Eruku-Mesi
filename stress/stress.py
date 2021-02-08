import os

"""
Beginning of Test Cases
Each stress test will be run and the output will
be outputed to report.json
"""
os.system('rm report.json')
os.system('echo "---- Beginning of Tests ----\n" >> report.json')

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
		os.system('echo "---- Sress Tesing" ' + file + " " + str(count) + "/" + str(total) + " ----")
		os.system('echo "---- Sress Tesing" ' + file + " " + str(count) + "/" + str(total) + " ---- >> report.json" )
		os.system('artillery run --config config.yaml ' + file + " >> report.json")