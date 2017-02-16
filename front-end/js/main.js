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

fetchit('/ajax', 'post', { param: 'You are a penguin' })
    .then(response => response.json())
    .then(json => console.log('parsed json', json))
    .catch(e => console.log('parsing failed', e))

//Here's how we handle the same async code with generators
//TODO handle errors with async!!
const
    async = starFunc => {
        const
            gen = starFunc()

        return function () {
            return arguments
        }
    },
    fetchit2 = async(function* (path, method, payload) {
        yield fetch(
            path,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload ? JSON.stringify(payload) : undefined
            })
    })

//Should be in try catch block?
console.log(fetchit2('/ajax', 'post', { param: 'You are a penguin' }))
