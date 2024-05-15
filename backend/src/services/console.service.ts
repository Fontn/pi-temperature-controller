class ConsoleService {
  static log(message) {
    const d = new Date();
    const time = d.toLocaleTimeString();
    if (
      typeof message === 'undefined' ||
      typeof message === 'boolean' ||
      typeof message === 'number' ||
      typeof message === 'bigint' ||
      typeof message === 'string' ||
      typeof message === 'symbol'
    ) {
      console.log(`[${time}]: ${String(message)}`);
      return;
    }
    console.log(`[${time}]:`);
    console.log(message);
  }
}

export default ConsoleService
