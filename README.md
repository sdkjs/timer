# timer

a human oriented timer for javascript

```js
// start running in 2000 ms just like javascript's default timer
var timer = new Timer(function() {
  console.log('running')
}, 2000)

timer.run()
timer.start()
timer.stop()
timer.reset()
timer.reset(1000)
// timer will not be started any more.
timer.cancel()
```
