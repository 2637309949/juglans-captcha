## juglans-captcha

### Example

```javascript
const captcha = Captcha({
  urlPrefix: '/captcha',
  config: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#cc9966'
  },
  cipher: {
    key: '5cbd5f603fd886000e3bb75e',
    iv: '5c9dbc4c9699fa000e1e0a98'
  }
})
app.Use(Captcha)
```

## API

// set diff property if you want
```javascript
const defaultOpts = {
  urlPrefix: '/captcha',
  maxAge: 60000,
  config: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#cc9966'
  },
  cipher: {
    key: '5cbd5f603fd886000e3bb75e',
    iv: '5c9dbc4c9699fa000e1e0a98'
  }
}
```

## MIT License

Copyright (c) 2018-2020 Double

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
