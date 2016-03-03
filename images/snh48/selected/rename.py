import os
c = 1
for fileName in os.listdir("."):
	if fileName.startswith("rsz"):
	    os.rename(fileName, "zp_"+str(c)+".jpg")
	    c = c+1