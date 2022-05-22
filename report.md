# 1. HATEOAS
There is an entrypoint in the root of the API that in its GET-response advertises all the links a client can use together with what and how to use them. In the GET shoppinglists response there is further again links provided of how to create a new one and how one can get and modify aldready existing shoppinglists. Included in the response for getting a specific shoppinglist there is also links for how to modify that specific resource with the shoppinglist id provided ready-to-go in the URLs. For responses with these links there is also always included a self link to represent the resource that the response is about. For creating or modifying a resource there is also provided a schema for how the objects in the request body should look like.

# 2. Multiple representations
I would add an Accept header to the response of an OPTION request that provides information about the avalable formats such as JSON or XML and possibly also with different schemas for the responses to choose from as a client. Then a specific query string could be used in the end of an URI to specify in which way the client wants the response data.  

# 3. Authentication
I have used authentication using JWT-tokens because it makes it easy for the API-consumer to include the provided token after a successful login in every request. This way there is no need to depend on a clientside session with session cookies. The con of the solution is that if the token would be leaked anyone could use it impersonating the one that the JWT belongs to. It may be hard to notice when this happens and that also leads to the other issue with tokens, that once the token has been issued and a user is "logged in" the user itself cannot "log out". On the pro-side the API can set the lifespan of the token and refesh access tokens to keep the user logged in.

Another authentication solution could have been by using OAuth, which would have removed the need for the API to itself handle and storing the users' passwords. Instead the authentication credentials would be authorized by a third-party. 

# 4. Webhook
A loggedin user can register for the webhook by providing a email, link-destination and secret in the request body. The server will save the registered subscriber to the database for later use. When the API runs an update on an individual shoppinglist, the server will publish the event to all subscribers by sending a request to their destination-urls and provide the secret and the updated shoppinglist.

# 5. Other solutions
I would have added pagination next, in order to be able to handle potentially many shoppinglists at once and beign able to browse them. Some queries for prices and similiar filtering would also have been nice to have.

I also wanted to have the products in the shoppinglists as a separate part that enables the same functionalities but for individual products and then to be able to add those products across several shoppinglists by connecting the products' id to the lists. Somehow I would also have liked to expand with something similar and have stores as a third category. 

The advertising of the schemas for the resources could probably also have been separated to havning a separate link that responds with the schema in a more sophisticated way.

I would have wanted to do more of letting the API specify its versions, using of ETags, make use of the OPTIONS header and other details that makes it easier for clients to consume the API.

# 6. Linguistic rules
1. Rule 1: I have used a forward slash separator to indicate a hierarchical relationship so that collections are used prior to individual documents, in order to keep consistency in the URIs. 
2. Rule 2: I did not include a trailing forward slash to any of my URIs, since it makes it so much easier when specifying URLs in the code for requests and such, knowing that when I add something I can always start the addition with a trailing slash. Therefore I minimize the risk for breaking any links for accidentally adding two forward slashes where ther should only be one.
3. Rule 5: I only used lowercase letters in URI paths, since that also maked it easier to not do later mistakes by sometimes using any uppercase letters and at another time with lowercase letters. 
4. Rule 7: I have only used singular nouns for document names to make it easier to distinct a singular item from a collection of items.
5. Rule 8: Similarly, I have used plural nouns for collection names in order to make it clear that it represents several and not one.
6. Rule 10: I have not used any CRUD function names in the URIs, that is because I have instead used different HTTP request methods to indicate the CRUD-functionality. This makes the URIs themselves much cleaner and removes any potential semantic duplication.

# 7. Extra implementation
I added a internal secret token for validation of the webhook-URL that publishes the event so that the shoppinglist-controller can make a call to the URL. This way the API can access that functionality in a de-coupled and scalable way and it prevents others than the API to use it.
