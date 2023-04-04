const crypto = require("crypto");

const HASH_ALGO = "sha3-512";
const DIGEST_ALGO = "hex";
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (event) {
    const partitionKey = event.partitionKey;
    candidate = partitionKey
      ? typeof partitionKey === "string"
        ? partitionKey
        : JSON.stringify(partitionKey)
      : createHash(JSON.stringify(event));
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? createHash(candidate)
    : candidate;
};

const createHash = (data) => {
  const encryptedData = crypto
    .createHash(HASH_ALGO)
    .update(data)
    .digest(DIGEST_ALGO);
  return encryptedData;
};
