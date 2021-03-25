const CircuitBreaker = require('./CircuitBreaker.js')

const breaker = new CircuitBreaker(unstableRequest)
// Our unstable request simulation
const unstableRequest = () => {
  return new Promise((resolve, reject) => {
      if (Math.random() > .6) {
        resolve({data: "Success"})
      } else {
        reject({data: "Failed"})
      }
  })
}

setInterval(() => {
    breaker
      .then(console.log)
      .catch(console.error)
  }, 1000 )
