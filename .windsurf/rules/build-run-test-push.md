---
trigger: always_on
---

Before running npm run dev terminate any existing Node.js processes that appear to be running this specific development script. Then, execute npm run dev

after every change build the project, 
if build without errrors
then run the project
test the project and 
if all good then push, keep this as global memory