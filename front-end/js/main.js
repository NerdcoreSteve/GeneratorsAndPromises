require('whatwg-fetch')
require('babel-polyfill')

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

/*
fetchit('/ajax', 'post', { param: 'You are a penguin' })
    .then(response => response.json())
    .then(json => console.log('parsed json', json))
    .catch(e => console.log('parsing failed', e))
*/

//Here's how we handle the same async code with generators
const
    async = starFunc =>
        function () {
            const
                handle = iterator =>
                    iterator.next().value.then(x => {
                        const iteration = iterator.next(x)
                        //Not quite right
                        /*
                        if(!iteration.done) {
                            handle(iterator)
                        }
                        */
                    })
                handle(starFunc(...arguments))
        },
    fetchit2 = async(function* (path, method, payload) {
        const response = yield fetch(
            path,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload ? JSON.stringify(payload) : undefined
            })
        console.log(response)
        const json = yield response.json()
        console.log(json)
    })

//Should be in try catch block?
fetchit2('/ajax', 'post', { param: 'You are a penguin' })
