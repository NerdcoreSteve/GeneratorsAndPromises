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

//Now we use a function I grabbed from https://www.promisejs.org/generators/
function async(makeGenerator){
  return function () {
    var generator = makeGenerator.apply(this, arguments)

    function handle(result){
      // result => { done: [Boolean], value: [Object] }
      if (result.done) return tap(Promise.resolve(result.value))

      return Promise.resolve(result.value).then(function (res){
        return handle(generator.next(res))
      }, function (err){
        return handle(generator.throw(err))
      })
    }

    try {
      return handle(generator.next())
    } catch (ex) {
      return Promise.reject(ex)
    }
  }
}

//And we use async to do the same code in a way that makes your async code look a little more sync
const
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
                })
    })

fetchit2('/ajax', 'post', { param: 'Your mom is a potato' }).then(console.log)
