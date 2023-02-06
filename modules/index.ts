export function isBrowser() {
  return typeof window !== "undefined";
}

export function browser() {
  if (typeof navigator === "undefined") {
    return {};
  }
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }

  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) {
      return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }

  return { name: M[0], version: M[1] };
}

export const blobToBase64: (g: Blob) => Promise<string> = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(
        reader.result?.toString().replace(/^data:.+;base64,/, "") as string
      );
    };
  });
};
