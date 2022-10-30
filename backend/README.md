# blog-FreJun-Task.
steps-
```
1)do npm i 

2)run backend with -a)npm run start or (npm run dev) or (node app.js)   -----(any one command)

3)To add blog use this api - with POST
**http://localhost:5001/api/blog/addblog**.
with title,category, body in "req.body"

4)for GET list of posts with pagination use - i use req.query
      **http://localhost:5001/api/blogs?page=1&limit=5**
 
5) for Task to update data in database and return array of all the words in the post body starting letter a or A, use -
 GET request.
  **http://localhost:5001/api/blog/:id**
  
```
