const els = [];
const aos = [];
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

let update = (p, cc = true) => {
  return new Promise((r) => {
    let pEls = p.querySelectorAll("*");

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

    if (cc)
      aos.forEach((ao) => {
        try {
          ao[0]();
        } catch {}
      });

    r();
  });
};

let parse = (t) => {
  let o = t.replaceAll("\n", "");
  let m = o.match(rem);

  m?.forEach((mv) => {
    let e = mv.slice(3, -3);
    o = o.split(mv).join(Function(`return ${e}`)());
  });

  return o;
};

let render = () => {
  els.forEach((el) => {
    for (let node in el.lxd.nodes) {
      let v = parse(el.lxd.nodes[node]);
      if (el.childNodes[node].nodeValue !== v)
        el.childNodes[node].nodeValue = v;
    }

    for (let prop in el.lxd.props) {
      let v = parse(el.lxd.props[prop]);
      if (el[prop] !== v) el[prop] = v;
    }
  });

  document.querySelectorAll("embed-html").forEach((embeddedHTML) => {
    embeddedHTML.innerHTML = parse(embeddedHTML.getAttribute("value"));
  });

  aos.forEach((ao) => {
    try {
      ao[1]();
    } catch {}
  });
};

let registerAddon = (u, r) => aos.push([u, r]);

document.addEventListener("DOMContentLoaded", () => {
  update(document.body).then(() => {
    render();
  });
});
