import { Fetch } from "../util";
import { Handler } from "./";

export const ProxyRoute: Handler<ShopifyProxyRequest, ShopifyProxyResponse> = async (context) => {
  const response = await new Fetch({
    host: context.session.cookies.shop,
    path: context.request.path,
    port: 443,
    method: context.request.method,
    headers: {
      "X-Shopify-Access-Token": context.session.cookies.token
    }
  }).exec(context.request.payload);

  return {
    ...context,
    code: 200,
    response: response
  };
}

export interface ShopifyProxyRequest extends Handler.Request {
  path: string;
  method: string;
  payload?: any;
}
export interface ShopifyProxyResponse extends Handler.Response {}
