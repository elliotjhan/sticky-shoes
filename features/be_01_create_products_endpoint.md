# Make initial products endpoint and deliver dummy data

- [ ]  navigate to your project's server/public/api/ folder
- [ ]  make a file, functions.php (we will visit this file a few times)
- [ ]  inside functions.php, create a function called "error_handler" that takes in a single parameter, error, and returns nothing.
- [ ]  inside error_handler, create an associative array called output
- [ ]  in output, add a key 'success' with a value of false
- [ ]  in output, add a key of 'error', and a value of the getMessage method of the error variable you passed into the function
- [ ]  Encode the output variable into JSON, and put the resulting string in json_output
- [ ]  print out the json_output variable
- [ ]  edit the file, products.php, comment out the code that is already there
- [ ]  in products.php, import the functions.php file.  Make sure it is required, and that it is only imported once.  hiiint hiiint.
- [ ]  in your products.php, set the exception handler to the function you made in your functions.php
- [ ]  use file_get_contents to grab the contents of the dummy data json file 'dummy-products_list.json', assign it to a variable called output
- [ ]  print the output file

#### postman endpoint example
![successful output](assets/be01_1.png)

- [ ]  cause an error by calling a non-existant function, doStuff.  See if you get an error output.  Make sure to do this AFTER the set_exeption_handler

#### postman endpoint example
![successful output](assets/be01_2.png)

- notice the status code 500 on the middle-right?