import { truncateText } from "../utils";

describe("truncateText", () => {
  test("should return text as is if it's shorter than or equal to maxLength", () => {
    expect(truncateText("short text", 20)).toBe("short text");
  });

  test("should truncate text and add ellipsis if it's longer than maxLength", () => {
    expect(
      truncateText("This is a very long text that needs to be truncated", 20)
    ).toBe("This is a very long ...");
  });

  test("should handle empty text", () => {
    expect(truncateText("", 20)).toBe("");
  });

  test("should handle text with exactly maxLength", () => {
    expect(truncateText("exactly twenty chars", 20)).toBe(
      "exactly twenty chars"
    );
    expect(truncateText("exactly twenty chars", 20).length).toBe(20);
  });
});
