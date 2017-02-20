require('whatwg-fetch')
require('babel-polyfill')

//Here's how I've shown how to use promises before
fetch(
    '/ajax',
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ param: 'You are a penguin' })
    })
    .then(response => response.json())
    .then(console.log)

//Here's how we handle the same async code with generators
const
    async = starFunc => {
        const
            iterator = starFunc(),
            handle = x => {
                const iteration = iterator.next(x)
                if(!iteration.done) {
                    iteration.value.then(handle)
                }
            }
        iterator.next().value.then(handle)
    }

async(function* () {
    const
        response = yield fetch(
            '/ajax',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ param: 'Bananas are my friends' })
            }),
        json = yield response.json()
    console.log(json)
})

//I've not really bothered with handling errors in either of the above examples
//I could do, but it's mostly boring work that doesn't teach us much
//And there's already a library that does this for us with the generator approach
//https://github.com/tj/co
const
    co = require('co')

co(function* () {
    const
        response = yield fetch(
            '/ajax',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ param: 'Your mom is a potato' })
            }),
        json = yield response.json()
    console.log(json)
})

//It's co even returns a promise from the end of the promise chain so you can catch errors
co(function* () {
    const
        response = yield fetch(
            '/banana',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ param: 'Your mom is a potato' })
            }),
        json = yield response.json()
    console.log(json)
})
.catch(console.log)
