## KnowledgePool as a Platform
KnowledgePoolintends to be a social platform that requires 
users to create long-form written content that is reviewed by 
community members before being published. 

Content on the platform should share what users have learned, 
their experience learning, and how other users can take actions 
to expand upon or try similar experiences and share their results.

## Project Structure
If you're like me, I had little clue on the file structure for 
a Next.js application (as such, the folder structure could 
still be out of whack). However, I can share what I understand 
thus far.

All application logic is stored in the src/app/ directory.

Within the app/api/ folder are routes that are essentially the backend 
for the application. In these routes I connect to and execute
SQL statements in a MySQL database.

Examples:
A request to http://domain/api/post will return a list of all 
posts.
A request to http://domain/api/post/[post_id] is a dynamic 
route and will return the post with the given post_id, i.e. 
http://domain/api/post/3 will return the data for post with post_id=3.


I have placed pages that users can navigate to for content 
in the app/pages/ folder, whose structure roughly mirrors the 
api folder. I've done this to help align my page fetches with 
the api routes. At this moment, the primary focus has been on 
creating routes in the api, so not much is going on in pages/.