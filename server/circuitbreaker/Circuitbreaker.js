import axios from 'axios'
import { response } from 'express';

import https from 'https'


const agent = new https.Agent({
  rejectUnauthorized: false,//add when working with https sites
});
    

class CircuitBreaker {
    constructor(request) {
      this.request = request
      this.state = "CLOSED"
      this.failureThreshold = 3
      this.failureCount = 0
      this.successThreshold = 2
      this.successCount = 0
      this.timeout = 6000
      this.nextAttempt = Date.now()
    }
  
     fire() {
      if (this.state === "OPEN") {
        if (this.nextAttempt <= Date.now()) {
          this.state = "HALF"
        } else {
          throw new Error("Breaker is OPEN")
        }
      }
      try {
        const response =  this.request
          console.log(response)
          return this.success(response.data)
      } catch (err) {
        return this.fail(err)
      }
    }
  
    success(response) {
      if (this.state === "HALF") {
        this.successCount++
        if (this.successCount > this.successThreshold) {
          this.successCount = 0
          this.state = "CLOSED"
        }
      }
      this.failureCount = 0
  
      this.status("Success")
      return response
    }
  
    fail(err) {
      this.failureCount++
      if (this.failureCount >= this.failureThreshold) {
        this.state = "OPEN"
        this.nextAttempt = Date.now() + this.timeout
      }
      this.status("Failure")
      return err
    }
  
    status(action) {
      console.table({
        Action: action,
        Timestamp: Date.now(),
        Successes: this.successCount,
        Failures: this.failureCount,
        "Next State": this.state
      })
    }
  }

export default CircuitBreaker;