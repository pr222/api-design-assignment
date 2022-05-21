# 1. HATEOAS
<!-- Explain and defend your implementation of HATEOAS in your solution. -->

# 2. Multiple representations
<!-- If your solution should implement multiple representations of the resources. How would you do it? -->

# 3. Authentication
<!-- Motivate and defend your authentication solution. 3a. What other authentication solutions could you implement? 3b. What are the pros/cons of this solution? -->

# 4. Webhook
A loggedin user can register for the webhook by providing a email, link-destination and secret in the request body. The server will save the registered subscriber to the database for later use. When the API runs an update on an individual shoppinglist, the server will publish the event to all subscribers by sending a request to their destination-urls and provide the secret and the updated shoppinglist.

# 5. Other solutions
I would have added pagination next, in order to be able to handle potentially many shoppinglists at once and beign able to browse them. 
<!-- Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this. -->

# 6. Linguistic rules
<!-- Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API. -->

1. Rule 1: I have used a forward slash separator to indicate a hierarchical relationship. 
2. Rule 2: I did not include a trailing forward slash to any of my URIs, since it makes it so much easier when specifying URLs in the code for requests and such, knowing that when I add something I can always start the addition with a trailing slash. Therefore I minimize the risk for breaking any links for accidentally adding two forward slashes where ther should only be one.
3. Rule 5: I only used lowercase letters in URI paths, since that also maked it easier to not do later mistakes by sometimes using any uppercase letters and at another time with lowercase letters. 
4. Rule 7: I have only used singular nouns for document names to make it easier to distinct a singular item from a collection of items.
5. Rule 8: Similarly, I have used plural nouns for collection names in order to make it clear that it represents several and not one.
6. Rule 10: I have not used any CRUD function names in the URIs, that is because I have instead used different HTTP request methods to indicate the CRUD-functionality. This makes the URIs themselves much cleaner and removes any potential semantic duplication.

# 7. Extra implementation
<!-- Did you do something extra besides the fundamental requirements? Explain them. -->


Do not miss it! A text document "LastName_API_Documentation.txt" where you will list your resource URIs and their corresponding brief descriptions. If you have a URI being used with multiple HTTP methods, you need to describe each pair of HTTP METHOD : URI separately. For example, if you have a resource URI as www.example.com/fish/types and you have HTTP methods GET, PUT, POST, and DELETE to perform something on that resource, you need to describe each pair of Method and URI briefly, e.g., what GET www.example.com/fish/types does, what PUT www.example.com/fish/types does, what DELETE www.example.com/fish/types does, and so on.