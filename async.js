/////////////////// Exercise
// EX01. An example of such an API is the XMLHttpRequest API which enables you to
// make HTTP requests to a remote server using JavaScript. Since this can take
// a long time, it's an asynchronous API, and you get notified about the progress
// and eventual completion of a request by attaching event listeners to the
// XMLHttpRequest object. Using the this API, perform the three steps above
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const getWord = new XMLHttpRequest();
getWord.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/girl');
getWord.addEventListener('load', function () {
  const response = JSON.parse(this.responseText);
  console.log(response);
});
getWord.send();

/*
EX02. The listeners that you attached to the XMLHttpRequest object in the previous
exercise were executed because the asynchronous methods you called on the
XMLHttpRequest object that you created executed certain statement(s)
internally. Write down these statement(s) and  explain their purpose: 

// instantiate with the new,
//  added event listeners
//  executed the function with send() after the load happens  // the load is live for client server communication
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX03. Mention any functions/APIs provided by JavaScript host environments that
allow you to schedule asynchronous operations

:
 setInterval
 setTimeout
 fetch APIs
 async/await
eventListenings
 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX04. Write a code to illustrate that the code coming after a call to setTimeout and
depends on the result of the callback argument of setTimeout() gets access to
unprocessed result
*/

let fullName = 'Hydra';
const greeting = function () {
  setTimeout(function () {
    fullName = 'Juma Elvin';
    console.log(fullName);
  }, 3000);
};
// console.log(fullName);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 EX05. If we want to programmatically make use of the result of an asynchronous
function that calls its callback when the asynchronous operation is complete, where should we write that code?

::::::
inside the asynchronous function

 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX06. Write an asynchronous function that makes use of the XMLHttpRequest API
and write an example  usage of the function.

*/

function RetGreet(url, callback) {
  const getWord = new XMLHttpRequest();
  getWord.open('GET', url);
  getWord.addEventListener('load', function () {
    const response = JSON.parse(this.responseText);
    callback(response)
  });
  getWord.send();
}
//// example usage
RetGreet('https://api.dictionaryapi.dev/api/v2/entries/en/girl ', function (response) {console.log(response);});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX07. Create your own asynchronous API with one asynchronous method that
makes use of setTimeout() to compute the factorial of its argument after 3
seconds and stores the result in a property of the API. Write a driver code to test the API. Note:
a negative number has no factorial and you can also place an upper limit on
the number this 
 */

class FactorialAPI extends EventTarget {
  constructor() {

    //  the this keyword will be set manually by super function
    super();
  }

  calcFactorial(number) {
    if (number < 0) {
      this.dispatchEvent(
        new CustomEvent('error', { detail: 'Cannot calculate factorial for negative numbers' })
      );
      return;
    }

    if (number > 10) {
      this.dispatchEvent(
        new CustomEvent('error', { detail: 'Limitation: unless below 10' })
      );
      return;
    }

    setTimeout(() => {
      let factor = 1;
      for (let i = 1; i <= number; i++) {
        factor *= i;
      }
      this.factorial = factor;
      this.dispatchEvent(
        new CustomEvent('factorialCalculated', {
          detail: ` result is : ${factor} `,
        })
      );
    }, 3000);
  }
}

// when  Testing the API instantiate
const factorial = new FactorialAPI();

factorial.addEventListener('factorialCalculated', event => console.log(event.detail));
factorial.addEventListener('error', event => console.log(event.detail));

factorial.calcFactorial(4);

// factorial.calcFactorial(3)
// function factorialApiFunction(number, cb) {
//   const factorial = new FactorialAPI();
//   factorial.calcFactorial(number)
//   factorial.addEventListener('factorialCalculated', e => {
//     console.log(e.detail)
//     cb(number)
//   })
//   factorial.addEventListener('error', e=> console.error(e.detail))
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX08. Write code that makes use of your asynchronous API. HINT: See exercise 01

 */

//  typical xmlHttpreqs



//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX09. Write an asynchronous function that makes use of your asynchronous API and
an example usage of the function. HINT: See exercise 06
 */

//  from ex08

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX10. Suppose the asynchronous function that is making use of your asynchronous
API is to be used to generate the factorial of multiple numbers but for a
reason (say visual purposes), the factorials of the xth number must generated
after the factorial of the (x-1)th has been generated. REQUIRED:
Write code that makes use of your asynchronous function generate the
factorials of four numbers one after the other
:: callback hell;
 */
const numbers = [7, 6, 5, 4, 3, 2];

// we define the function inorder to calculate the numbers one by one
function calculateNextFactorial(index) {
  if (index >= numbers.length) {
    // if the condition is met we dont have any number to process
    return;
  }
  //  if not we still got some numbers to calculate...the function proceeds to calculate the next factorial

  /// callback function is invoked after receiving the result as its parameter
  factorialAPI.calculateFactorial(numbers[index], result => {
    // this event notifies the event listners that the factorial for the for the number has been completed...it receives the results as it is detail
    // cafactorialAPI.dispatchEvent();

    // the function makes arecurcive call to itself with the index increament by 1
    calculateNextFactorial(index + 1);
  });
}

calculateNextFactorial(0);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

EX11. Write a brief discussion on the code in the previous exercise
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX12. A Promise can be in one of three states. State and explain each
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

EX13. How do we access the final value of a promis
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX14. What is the other property of a promise apart from the result? how do we
access it
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX15. The Fetch API provides a modern and Promise-based interface for making
HTTP requests from the browser. It replaced the older XMLHttpRequest (XHR)
API and simplifies asynchronous network operations. REQUIRED
Write code that makes use of the Fetch API
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX16. If the asynchronous function you have attached to a promise object is
complete, you can have another function start executing without resorting to
the pyramid of doom structure. Explain how and 
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX17. Write promise based version of the asynchronous function you created at
Exercise 09. The new version only takes the number, does the same
(calculates factorial of the number), but returns a promise instead of using
callbacks.
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
EX18. Using the function you created at Exercise 17, solve the problem in Exercise 1
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////
