//export const BASE_URL = "https://www.saucedemo.com/";
const ENV_URL = {
    prod: "https://www.saucedemo.com/",
    staging: "https://www.saucedemo.com/",
    dev: "https://www.saucedemo.com/",
    qa: "https://www.saucedemo.com/"
}
// Keep this file self-contained even when Node globals are not in TS libs.
declare const process: { env?: Record<string, string | undefined> } | undefined;

type EnvKey = keyof typeof ENV_URL;
const rawEnv = process?.env?.ENV;
const ENV: EnvKey = (rawEnv && rawEnv in ENV_URL ? rawEnv : "prod") as EnvKey;
export const BASE_URL = ENV_URL[ENV];


  

export const USERNAME = "standard_user";
export const PASSWORD = "secret_sauce";
