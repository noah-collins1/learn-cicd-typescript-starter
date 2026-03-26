import { describe, it, expect } from "vitest";
import { getAPIKey } from "../auth";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  it("returns null when authorization header is empty string", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  it("returns null when authorization header has only one part", () => {
    expect(getAPIKey({ authorization: "somekey" })).toBeNull();
  });

  it("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken" })).toBeNull();
    expect(getAPIKey({ authorization: "Basic abc123" })).toBeNull();
  });

  it("returns the key when scheme is ApiKey", () => {
    expect(getAPIKey({ authorization: "ApiKey mysecretkey" })).toBe(
      "mysecretkey",
    );
  });

  it("returns the second token even when extra spaces create more parts", () => {
    expect(getAPIKey({ authorization: "ApiKey key extrapart" })).toBe("key");
  });
});
