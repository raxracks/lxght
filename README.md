# lxght
A lightweight JS framework with no virtual DOM.

## Usage
Use either the normal or minified version, which can be fetched from [jsdelivr](https://cdn.jsdelivr.net/gh/raxracks/lxght/lxght.min.js) and used in a script tag.  
  
Use `{{ expression }}` for templating, must have that exact whitespace.  
  
Use `<embed-html value="<h1>hello</h1>"></embed-html>` to embed innerHTML, example [here](https://github.com/raxracks/lxght/blob/master/examples/iteration.html#L211).

## Caveats
- Uses Function()
- Can be ugly to use in [some places](https://github.com/raxracks/lxght/blob/master/examples/fetching.html#L38)
- More that I can't think of at the moment
