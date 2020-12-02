//手写promise
//简易版promise

//创建3个常量用于表示状态  便于开发以及后期维护
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
    //创建常量that 因为代码可能回异步，用于获取正确的This对象
    const that = this
    //一开始Promise的状态应该是pending
    that.state = PENDING
    //value变量用于保存resolve或者reject中传入的值
    that.value = null
    //resolvedCallbacks 和 rejectedCallbacks用于then中的回调，因为当执行完Promise时，状态可能还是等待中，这时候应该把then中的回调保存起来用于状态改变时使用
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []

    //把resolve 和 rejected函数添加在MyPromise函数体内部
    resolve(that,that.value);
    rejected(that,that.value);
}

function resolve(that,value){
    if(that.state === PENDING){
        that.state = RESOLVED
        that.value = value
        that.resolvedCallbacks.map(cb => cb(that.value))
    }
}
function rejected(that,value){
    if(that.state === PENDING){
        that.state = REJECTED
        that.value = value
        that.rejectedCallbacks.map(cb => cb(that.value))
    }
}

//实现then
MyPromise.prototype.then = function(onFulfilled,onRejected){
    const that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }
    if(that.state === PENDING){
        that.resolvedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }
    if(that.state === RESOLVED){
        onFulfilled(that.value)
    }
    if(that.state === REJECTED){
        onRejected(that.value)
    }

}