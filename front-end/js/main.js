require('whatwg-fetch')
require('babel-polyfill')

//Here's how I've shown how to use promises before
const
    fetchit = (path, payload) =>
        fetch(path, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

fetchit('/ajax', { param: 'You are a penguin' })
    .then(response => response.json())
    .then(json => console.log('parsed json', json))
    .catch(ex => console.log('parsing failed', ex))
