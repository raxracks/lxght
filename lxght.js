const els = [];
const rem = new RegExp(/{{ .*? }}/g);
const w = new Proxy(window, {
  set: (t, k, v) => {
    t[k] = v;
    render();
    return true;
  },
  get: (t, k) => {
    return t[k];
  },
});

let eh = () => {
  document.querySelectorAll("embed-html").forEach((embeddedHTML) => {
    embeddedHTML.innerHTML = parse(embeddedHTML.getAttribute("value"));
  });
};

let update = (parent) => {
  return new Promise((r, _) => {
    let pEls = parent.querySelectorAll("*");

    pEls.forEach((el) => {
      for (let node in el.childNodes) {
        let m = el.childNodes[node]?.nodeValue?.match(rem);
        if (m) {
          if (!el.lxd) el.lxd = { nodes: {}, props: {} };
          el.lxd.nodes[node] = el.childNodes[node].nodeValue;
          if (!els.includes(el)) els.push(el);
        }
      }

      for (let prop in el) {
        if (prop.toLowerCase().includes("text") || prop.includes("HTML"))
          continue;

        let m = el.getAttribute(prop)?.toString()?.match(rem);
        if (m) {
          if (!el.lxd) el.lxd = { nodes: {}, props: {} };
          el.lxd.props[prop] = el.getAttribute(prop);
          if (!els.includes(el)) els.push(el);
        }
      }
    });

    r();
  });
};

let parse = (t) => {
  let o = t.replaceAll("\n", "");
  let m = o.match(rem);

  m?.forEach((mv) => {
    let e = mv.slice(3, -3);
    o = o.split(mv).join(eval(e));
  });

  return o;
};

let render = () => {
  els.forEach((el) => {
    for (let node in el.lxd.nodes) {
      el.childNodes[node].nodeValue = parse(el.lxd.nodes[node]);
    }

    for (let prop in el.lxd.props) {
      el[prop] = parse(el.lxd.props[prop]);
    }
  });

  eh();
};

document.addEventListener("DOMContentLoaded", () => {
  update(document.body).then(() => {
    render();
  });
});
