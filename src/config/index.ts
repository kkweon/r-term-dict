import devConfig from "./dev";
import testConfig from "./test";
import prodConfig from "./prod";

let config: IConfig;
if (process.env.NODE_ENV === "test") config = testConfig;
else if (process.env.NODE_ENV === "development") config = devConfig;
else if (process.env.NODE_ENV === "production") config = prodConfig;
else config = devConfig;

export default config;
