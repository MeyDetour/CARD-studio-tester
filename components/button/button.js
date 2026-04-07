import { serializeParams } from "../../src/helpers/serializer.js";
export function button(leftIcon, rightIcon, link, functionName, text, classname = "",params={}) {
  if (!link && !functionName) {
    return "PLEASE PROVIDE ACTION OR LINK FOR BUTTON";
  }

  if (link) {
    return `
      <a href="${link}" class="button ${classname}">
        ${leftIcon ? `<img src="/assets/${leftIcon}.svg">` : ""}
        ${text? text : "" }
        ${rightIcon ? `<img src="/assets/${rightIcon}.svg">` : ""}
      </a>
    `
  }
  const serializedParams = serializeParams(params);

  return `
    <button onclick="${functionName}(${serializedParams})" class="button ${classname}">
      ${leftIcon ? `<img src="/assets/${leftIcon}.svg">` : ""}
      ${text? text : "" }
      ${rightIcon ? `<img src="/assets/${rightIcon}.svg">` : ""}
    </button>
  `
}

// expose to window for inline onclick handlers used in templates
 