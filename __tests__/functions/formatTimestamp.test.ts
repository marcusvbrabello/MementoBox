import { formatTimestamp } from "../../app/functions/formatTimestamp";

describe("formatTimestamp", () => {
  it("returns a string in DD/MM/YYYY HH:MM:SS format", () => {
    const date = new Date(2025, 5, 9, 21, 31, 20);
    const timestamp = date.getTime();
    const formatted = formatTimestamp(timestamp);
    expect(formatted).toBe("09/06/2025 21:31:20");
  });
});
