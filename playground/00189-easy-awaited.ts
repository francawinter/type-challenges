/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

// extends interface
interface Person {
  name: string
  age: number
}

interface User extends Person {
  email: string
}

interface ToString {
  toString(): string
}

class Person implements ToString {
  constructor(public name: string, public age: number) { }

  toString() {
    return `${this.name} ${this.age}`
  }
}


const user: User = {
  name: 'John',
  age: 30,
  email: '  ',
}

// extends in generics

//                      v constraint        v condition
type ExtendsExample<T extends string> = T extends number ? true : false

type ExtendsExample2<T extends string> = T

let example: ExtendsExample<> = 'some string'




// type ExtendsExample3 = T extends string

type Test = ExtendsExample2<string>
//   ^?

type MyAwaited2<T> = T extends PromiseLike<infer Inside> // Promise<infer Inside> 
  ? Inside extends PromiseLike<infer Inside2> 
    ? Inside2 extends PromiseLike<infer Inside3> 
      ? Inside3
      : Inside2
    : Inside
  : never

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer Inside>
  ? Inside extends PromiseLike<any>
    ? MyAwaited<Inside>
    : Inside
  : T

// Recursion
//
// function recurse(x: number){
//   if (x > 0) {
//     recurse(x - 1)
//     console.log(x)
//   }
// }

// recurse(10)

type TEST = MyAwaited<Promise<Promise<string | number>>>
//    ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
