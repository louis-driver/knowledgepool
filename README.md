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

Within the app/actions/ folder are server actions that are essentially the backend 
for the application. In these routes I connect to and execute
SQL statements in a MySQL database.

I am currently migragting away from the use of API routes, as the use of
server components means that fetching does not need to be done through an
API, as the pages are created on the server and can thus directly access any data
my API routes would provide.

Examples:
Within a page.tsx file, a call to getPosts() from a file in the /actions
folder will return posts for the user to view, to generate a page from.
This would have previouslt been accomplished by a request to http://domain/api/post.

A request to http://domain/post/[post_id] is a dynamic 
route and will return a page for the post with the given post_id.

## User Interface
Currently the UI has been barebones as I learn data transferring
and authentication methods for a Next.js project. I simply needed to 
verify that each page was receving the necessary data.

Design work will be the next step for this project.

## Authentication
I've created a from-scratch authentication system that will likely be replaced by
Oauth in the future. However, It has helped me better understand the inner-workings
of validating user account creation and utilizing cookies.

The middleware.ts file in the /src folder will run on the folders/files in its config.
This prevents uses from accessing protected resources if they do not have an account
by redirecting them to sign in if they do not have a valid session cookie. 