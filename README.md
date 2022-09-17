# lxght
A lightweight JS framework with no virtual DOM.

## Usage
Use either the normal or minified version, which can be fetched from [jsdelivr](https://cdn.jsdelivr.net/gh/raxracks/lxght/lxght.min.js) and used in a script tag.  
  
Use `{{ expression }}` for templating, must have that exact whitespace.  
  
Use the `<embed-html value="<h1>hello</h1>" />` tag to embed innerHTML, example [here](https://github.com/raxracks/lxght/blob/d4c138913468e6bb5b0b06ea8c3d8c59793a039c/examples/iteration.html#L21).

## Caveats
- Currently uses eval, but might change if I can come up with a simple way to use something else
- Can be ugly to use in [some places](https://github.com/raxracks/lxght/blob/d4c138913468e6bb5b0b06ea8c3d8c59793a039c/examples/fetching.html#L39)
- More that I can't think of at the moment
