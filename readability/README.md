# Readable code

> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.

## Comments

When writing comments, it's more useful to describing WHY the code exists, rather than WHAT it does. Compare these to examples:

```
// Consume messages on queueName
channel.consume(queueName, msg => {
```

```
// Wait a bit before moving back to queue to prevent error spamming
setTimeout(() => {
	channel.nack(msg, { requeue: true, });
}, config.get('worker.nackDelay'));
```

The first comment does not add anything that the code itself was not already describing, making it down right useless. The latter comment however, describes a piece of code that might otherwise be hard to understand the purpose of and is therefore a lot more useful. 

## Code styles

```
import { EXPECTATIONS } from 'constants;

const _actionFromQuestion = (anamnesis, QuestionForm, additionalQuestions) => {
}

export const setIssue = () => (payload) => {
	const currentQuestionAction = _actionFromQuestion(
		anamnesis, 
		QuestionForm, 
		additionalQuestions
	);
}
``` 

There are several things happening here. `EXPECTATIONS` in uppercase suggests it being a constant, `QuestionForm` beginning with uppercase is likely to be a class or an instantiatable function, while the camelcase names are likely to be functions or variables. A consistent intendation has been applied, as well as keeping row length below 80 characters. `_actionFromQuestion` begins with an underscore to show that it is a "private" function, while `setIssue` without the underscore is not. 

Whether you think the uses in question are good or not, using these code styles adds a lot of readability to the code and makes it faster to understand what something is and in what context it runs. 

## Linting

Linting is a term that has become synonmous to formatting code to adhere to a set of code style rules (like how identation should be done, variables defined and so forth). Linting tools are available for any major code editor and sharing linting rules across tools is becoming increasingly simpler, allowing for teams to stay cohesive. 

There are several popular and public code styles that can be used as is or as a starting point, some of which include:

* [AirBnB](https://github.com/airbnb/javascript)
* [Google](https://google.github.io/styleguide/jsguide.html)
* [Idiomatic](https://github.com/rwaldron/idiomatic.js/)
* [JavaScript Standard style](https://standardjs.com/)

## Naming conventions

```
const caseUninvite = ({ caseId, role }) => {}

const invite_to_case = ({ id, role }) => {}
```

An important aspect is consistency. If you have found the method `caseUninvite`, it would be a lot easier to find the corresponding method for invites if it was named `caseInvite`. Also note that keeping consistency regarding parameter and variable names helps to understand and follow code. 

```
const fv = (rate, nper, pmt, pv) => {};
```

```
const future_value = (rate, num_periods, payment, present_value) => {};
```

Another important thing about naming is using names that are understandable. The first example above is impossible to understand without commenting, while the second example is documenting itself and immediatly understandable. 

It can also be useful to identify some terms that are likely to occur often in a project before coding even begins. This helps keeping consistency through the entire project group and helping disucssions and conversations, and it also helps to mitigate problems with conflicting terms (like what a "visit" or a "case" means). It also helps avoiding using terms that are actual keywords in the programming language (like "case"), which could also create problems. 

## Oranize code - Avoid deep nesting

This is an example of how to NOT do things:

```
export const storeAnonymizedData = () => {
    return getClient(sftpConfig.credentials)
        .then(batches => {
            return Promise.mapSeries(batches, (batch, i) => {
                return Promise.all(batch.map(anamnesis => {
                    return getReportByFormat({...})
                        .then(() => {
                            return Promise.all(anamnesis.reports.map(report => {
                                return storeFileAt({...})
                                    .catch(err => {
                                        console.log(err);
                                        sentry.captureException(err);
                                    });
                        ...
```

It's hard to follow along all the steps and what they do, when you get deeper you will have lost where you came from and you will have problems with row length. Your code will also not be very flexible or reusable. Instead, break your functions apart into smaller functions that will be easier to read, and your flow easier to follow. 

## Grouping with white space

This is a topic of discussion. Some developers like using white space to group and separate things for readability, while others prefer keeping the number of lines as few as possible. Both sides have valid arguments, but it should be determined what to strive for in your group before starting your project. 

```
const isMessageTypeAllowed = (caseData, type) => {
    if (!caseData) throw new ArgumentException('Can not create message right now');
    const { CHAT, PENDING_ACTION, PENDING_PATIENT } = actionTypes;
    if (type === messageTypes.MESSAGE) { throw new ArgumentException('Not allowed to chat right now'); }
    return caseData;
};
```

```
const isMessageTypeAllowed = (caseData, type) => {
    if (!caseData) throw new ArgumentException('Can not create message right now');

    const { CHAT, PENDING_ACTION, PENDING_PATIENT } = actionTypes;

    if (type === messageTypes.MESSAGE) { 
        throw new ArgumentException('Not allowed to chat right now'); 
    }
    
    return caseData;
};
```

## Organize - Don't Repeat Yourself
### (But avoid premature abstractions)

```
box1.x = 10;
box1.y = 20;
box2.x = 30;
box2.y = 20;
box3.x = 50;
box3.y = 20;
box4.x = 70;
box4.y = 20;
```

```
[box1, box2, box3, box4].forEach((box, i) => {
    box.x = 10 + i * 20;
    box.y = 20;
});
```

Avoid repeating yourself more than three times, and even at your second repetition start considering if you can make a more abstract and reusable solution. However, it's easy to start doing abstractions to early. Don't repeat yourself, but it's seldom worth the work to write abstract solutions until you actually start repeating yourself. 

## Write tests and refactor your code

It's hard to know beforehand how your code will develop. Don't be afraid to change things as you go along, in fact you should often revisit your code to change things that are unclear or to find unneeded repetitions that could be solved with a more abstract function.

Writing tests elegantly aide you by both forcing you to write small and efficient functions as well making refactoring a lot more safe. 