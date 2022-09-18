# lxght
A lightweight JS framework with no virtual DOM.

## Usage
Use either the normal or minified version, which can be fetched from [jsdelivr](https://cdn.jsdelivr.net/gh/raxracks/lxght/lxght.min.js) and used in a script tag.  
  
Use `{{ expression }}` for templating, must have that exact whitespace.  
  
Use `<embed-html value="<h1>hello</h1>"></embed-html>` to embed innerHTML, example [here](https://github.com/raxracks/lxght/blob/master/examples/iteration.html#L211).

## Addons
- Component Addon
    - Adds support for creating instances of a function which returns a string with HTML as an HTML element, like react
    - Component function names must be fully lowercase
- JSX Addon
    - Read [here](#jsx-layer)

## Caveats
- Uses Function()
- Can be ugly to use in [some places](https://github.com/raxracks/lxght/blob/master/examples/fetching.html#L38)
- More that I can't think of at the moment

# JSX Layer
There is a jsx addon in the addons folder or at https://lxght-cdn.onrender.com/addons/jsx.min.js, this layer is mostly intended for more readable embedded html.
  
This layer is very thin, requires the components addon (https://lxght-cdn.onrender.com/addons/component.min.js), and may completely break in some use cases.  
  
It literally just gets turned into a template literal to be used like a normal component function, for example
```
function counter() {
    return (
        <button class="interactive" onclick="w.count++">
            Count value: {{ count }}
        </button>
    );
}
```
becomes
```
function counter() {
    return (`
        <button class="interactive" onclick="w.count++">
            Count value: {{ count }}
        </button>
    `);
}
```