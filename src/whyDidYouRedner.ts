import React from "react";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // 是否跟踪所有函数组件
    trackAllPureComponents: false,
  });
}
