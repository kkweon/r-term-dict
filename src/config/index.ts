import devConfig from "./dev";
import prodConfig from "./prod";
import testConfig from "./test";

let config: IConfig;
if (process.env.NODE_ENV === "test") config = testConfig;
else if (process.env.NODE_ENV === "development") config = devConfig;
else if (process.env.NODE_ENV === "production") config = prodConfig;
else config = devConfig;

console.log("Current Config => ", config);

export default config;
