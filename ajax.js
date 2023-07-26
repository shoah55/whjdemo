function ajax(options) {
  const defaultOptions = {
    type: "get",
    data: "",
  };
  const opts = { ...defaultOptions, ...options };
  console.log(opts);
  if (opts.data.constructor === Object) {
    let str = "?";
    for (let key in opts.data) {
      str += `${key}=${opts.data[key]}&`;
    }
    opts.data = str.slice(0, -1);
  }
  const xhr = new XMLHttpRequest();
  if (opts.type === "get") {
    xhr.open(opts.type, opts.url + opts.data, true);
    xhr.send();
  } else {
    xhr.open(opts.type, opts.url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(opts.data.slice(1));
  }
  xhr.onload = function () {
    if(opts.dataType === "json") {
      opts.success(JSON.parse(xhr.responseText));
    } else {
      opts.success(xhr.responseText);
    }
  };
}
