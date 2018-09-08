import * as https from "https";

export class Fetch<Payload = any> {
  constructor(
    public options: https.RequestOptions
  ) {}

  public async exec (payload?: Payload): Promise<any> {
    return new Promise((resolve, reject) => {

      let payloadStr: string;
      if(payload) {
        payloadStr = JSON.stringify(payload);
        this.options.headers = {
          ...this.options.headers,
          "Content-Length": payloadStr.length
        }
      }

      const request = https.request(this.options, (response) => {
        response.setEncoding("utf8");
        let data = "";
        response.on("data", (body) => data += body);
        response.on("end", () => {
          try {
            data = JSON.parse(data)
          } catch(error) {
            reject(new Error("Failed to obtain access token."));
          }
          return resolve(data);
        });
      });
      if(payload) {
        request.write(payloadStr);
      }
      request.end();
    });
  }
}
