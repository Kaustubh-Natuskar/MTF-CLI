
import util from "util";
import child_process from "child_process";
const exec = util.promisify(child_process.exec);
import validator from "validator";

export default class cURL {
  constructor(url) {
    this.url = url;
  }

  validate() {
    return typeof this.url === 'string' && validator.isURL(this.url);
  }

  parseHeaders(output) {
    if (!output || output.length === 0) {
      return null;
    }
    const lines = output.split(/\r\n/);
    let headers = {};
    lines.forEach(line => {
      let values = line.split(/:\s/);
      if (values.length === 2 && typeof values[0] === 'string' && typeof values[1] === 'string') {
        let [key, value] = values;
        headers[key] = value.trim();
      }
    });
    return headers;
  }

  async getHeaders() {
    if (!this.validate()) {
      throw new Error('Invalid parameter.');
    }
    // const cmd = `curl -I ${this.url}`;
    const cmd = `curl -s -o response.txt -w "%{http_code}" ${this.url}`;
    //const cmd = `curl -o /dev/null -s -w "%{http_code}\n"  ${this.url}`;

    try {
      const { stdout, stderr } = await exec(cmd);
      //return this.parseHeaders(stdout);
      return stdout;
    } catch (err) {
      return err;
    }
  }
}

// module.exports = cURL;
