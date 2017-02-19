require('whatwg-fetch')
require('babel-polyfill')
/*TODO
get rid of fetchit and fetchit2, just call fetch and .then it and call fetch directly in your generator
mention you didn't handle errors in the in async function
    async should just execute, not return a function
I could go to the bother of fixing that, but it's boring and someone else already did it
show how to use co
https://github.com/tj/co
*/

const
    tap = x => { console.log(x); return x }

//Here's how I've shown how to use promises before
const
    fetchit = (path, method, payload) =>
        fetch(
            path,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload ? JSON.stringify(payload) : undefined
            })

fetchit('/ajax', 'post', { param: 'You are a penguin' })
    .then(response => response.json())
    .then(json => console.log('parsed json', json))
    .catch(e => console.log('parsing failed', e))

//Here's how we handle the same async code with generators
const
    async = starFunc =>
        function () {
            const
                iterator = starFunc(...arguments),
                iteration = iterator.next(),
                promise = iteration.value,
                handle = x => {
                    const iteration = iterator.next(x)
                    if(!iteration.done) {
                        iteration.value.then(handle)
                    }
                }
            promise.then(handle)
        },
    fetchit2 = async(function* (path, method, payload) {
        const
            response = yield fetch(
                path,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: payload ? JSON.stringify(payload) : undefined
                }),
            json = yield response.json()
        console.log(json)
    })

//Should be in try catch block?
fetchit2('/ajax', 'post', { param: 'You are a penguin' })
