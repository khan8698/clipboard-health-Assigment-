const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the partition key passsed in the input", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1234" });
    expect(trivialKey).toBe("1234");
  });
  it("Returns the partition key as string if passsed as number in the input", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 1234 });
    expect(trivialKey).toBe("1234");
  });
  it("Returns the Hash for the input data if no partitionkey is present", () => {
    const trivialKey = deterministicPartitionKey({ foo: 1 });
    expect(trivialKey).toBe(
      "23381aabd41a8373b8213bd229205d1076acb3d2aaaff67687881a9bafe754a5bab6fa31865d6b7ae2d31ae3ba695206004b79807b1b2e9804c413b28cf6118c"
    );
  });
  it("Returns the Hash if very long input is given", () => {
    const trivialKey = deterministicPartitionKey(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
    expect(trivialKey).toBe(
      "3506518250b23d65e29c5fe65491ad1358da77277ff4996946aa4c1f4314607fe4f2f7a47546cf1ff1edb4727474fab69fa9a660c6f075c7a649f1574c7ddeb5"
    );
  });
});
