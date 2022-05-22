# How to test this assignment
Download the postman-collection and run all the tests. For methods that needs a logged in user, make sure to first make the login-call before proceeding with the rest. 

If you want to check what the web-hook sends to a subscriber you can use the "Register new subcriber" in the Webhook folder in the collection and in the request body add a destination. For example, you can go to [webhook.site](https://webhook.site/) and copy the URL from there and paste it to the destination in the request body. The webhook will publish the event to the subscribers when doing the PUT method on a shoppinglist.

# API design assignment

In this assignment, you will implement a web API following the theory of REST. We encourage you to have your own ideas about the API service to build. Maybe you have some idea you want to start with through an API-driven design? For those of you without any ideas, we present a scenario below. That will also give a hint of the extent of this assignment.

## Overall requirements

You are expected to have error handling, security, good code structure, accessibility through HTTP/HTTPS, and so on. Below are two sets of requirements for this assignment. To PASS the Web APIs module project, you must fulfill all the "mandatory" requirements and at least five linguistic design rules. The "linguistic design rules" are introduced in the lectures. Watch/follow them! You are free to choose your own implementation or use our proposed suggestion. You are free to choose any frameworks, libraries, and modules for solving this assignment as long as the examiners can test your solution easily. Please read the **MUST** and **SHOULD** carefully.

## Mandatory API design requirements

* The API MUST at least support representations with "application/json"
* The API should try to follow the constraints for RESTful APIs
* The API MUST embrace the idea of HATEOAS. The API should have one entry point and use HATEOAS for making the API browsable.
* The API should allow the client to create, read, update and delete resources. You MUST have at least one call for GET, PUT, POST, and DELETE methods.
* Unsafe HTTP methods and data about users in the system should require authentication done through the API with the implementation of JWT-tokens.
* The API MUST give some ability to register a webhook, which will trigger on some of your chosen events.
* In your examination repository, you MUST provide a [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) collection. The examiner MUST be able to load this into the POSTMAN application or a [NEWMAN CLI](https://www.getpostman.com/docs/postman/collection_runs/command_line_integration_with_newman) and test your API without ANY further configuration. For more information about POSTMAN and NEWMAN see this article: https://scotch.io/tutorials/write-api-tests-with-postman-and-newman
* Do not forget to make calls that show your error handling like bad requests, wrong credentials, and so on.
* The code MUST be published in your examination repository along with a report (see below).
* Your solution MUST be testable without any configuration, installations of servers, and so on. Preferable, the API will be testable through a public URL. Any instructions on how to test your solution should be in your repository README.md.
* The code MUST be "individually" created. The examiners may run a code anti-plagiarism tool on your code. Plagiarism will be seriously considered and reported for action.
* Make a script file that automatically populated your application with some data for testing.

## Linguistic design rules for APIs (MUST implement at least five rules)

* rule 1: Forward slash separator (/) must be used to indicate a "hierarchical relationship".
* rule 2: A trailing forward-slash (/) should not be included in URIs.
* rule 3: Hyphens (-) should be used to improve the readability of URIs.
* rule 4: Underscores (_) should not be used in URIs.
* rule 5: Lowercase letters should be preferred in URI paths.
* rule 6: File extensions should not be included in URIs.
* rule 7: A "singular" noun should be used for document names.
* rule 8: A "plural" noun should be used for collection names.
* rule 9: A plural noun should be used for store names.
* rule 10: CRUD function names or their synonyms should not be used in URIs.
* rule 11: A verb or verb phrase should be used for controller names.
* rule 12: The query component of a URI may be used to filter collections or stores.
* rule 13: The query component of a URI should be used to paginate collection or store results.

## Our suggestion for those without their own ideas

The "LNU Fishing Club" needs an API to collect fishing reports. They are thinking of building a client application but want a separate web API before taking this process along. The idea is that anglers should report their catch and make this data public. They want to collect data like:

* The user who catches the fish
* The position (longitude and latitude) of the catch
* The name of the lake/river
* The city of the fishing spot
* Specie of the fish
* Weight
* Length
* Image-URL
* Timestamp of the catch

To do un-safe HTTP calls, the API MUST have Authentication/Authorization. A user should be able to sign in through the API safely (see requirements).

Of course, you are free to implement additional features in your web API.

## Report

This examination is a hand-in assignment. You will need to defend your design decisions in writing by answering the questions below in a report. These questions should be answered in your Merge Request Assignment Report. _(See details under "Hand in" below)_

The report should include the course code, course name, your name, and an introduction describing the problem you have tried to solve.

The following questions **MUST** be answered in the report.

1. Explain and defend your implementation of HATEOAS in your solution.
2. If your solution should implement multiple representations of the resources. How would you do it?
3. Motivate and defend your authentication solution.
 3a. What other authentication solutions could you implement?
 3b. What are the pros/cons of this solution?
4. Explain how your webhook works.
5. Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this.
6. Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API.
7. Did you do something extra besides the fundamental requirements? Explain them.
8. **Do not miss it!** A text document "LastName_API_Documentation.txt" where you will list your resource URIs and their corresponding brief descriptions. If you have a URI being used with multiple HTTP methods, you need to describe each pair of **HTTP METHOD : URI** separately. For example, if you have a resource URI as www.example.com/fish/types and you have HTTP methods GET, PUT, POST, and DELETE to perform something on that resource, you need to describe each pair of Method and URI briefly, e.g., what GET www.example.com/fish/types does, what PUT www.example.com/fish/types does, what DELETE www.example.com/fish/types does, and so on.

## Examination

The grade for this assignment is F (fail), Fx (fail, with options to improve), and P (pass). We will take note of your effort and give you grades like P-, P, or P+ that could affect your final grade on this course. 
We will look at the "linguistic design quality" and "structure" of the API and the code, how easy your API is to understand, the extent of your effort, and the easiness for the examiner to test your solution.

## Hints

* Start by making a plan on how to solve the assignment. What do you have to do? What steps do you have to take? What do you need to know and learn? Plan your work and plan early!
* Start with your resources/models. Create them and write a seed script that fills your storage with some data to play with when testing your API.
* Do not spend time on over-doing validation rules. In a real scenario, we should, but in this assignment, the API is the most important.
* Maybe a simple client application will help you develop a good API, especially with respect to HATEOAS.
* Learning and using POSTMAN/NEWMAN is your own responsibility. Make sure to read the article: https://scotch.io/tutorials/write-api-tests-with-postman-and-newman

## Hand in of the assignment

You hand in your assignment by making a Merge Request (MR). Make sure you do the following:

* Create an MR from your 'main'-branch to your 'lnu/submit'-branch.
* Add a title: "Submission, API design assignment".
* Check the boxes in the description by adding an 'x' between the brackets.
* Make sure to fill in the Assignment Report. (The questions are in HTML comments so that you can leave them there. Make sure to **not** write your code inside comments!)
* Select the milestone to which you would like to make the submission. Important!

Do not add anything else. Do not close your MR. Doing that will count as if you have withdrawn your submission.

You can continue to push to the main branch, and those commits will be added to the submission. The pipeline will indicate that your submission is late if you commit after the deadline.

You can edit the MR, and the assignment report after the MR is opened.

You can add comments to your MR if you want to communicate anything to the examiner.
