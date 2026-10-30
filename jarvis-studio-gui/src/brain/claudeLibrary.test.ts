import { describe, expect, it } from "vitest";
import { claudeGuidanceFor, claudeGuidanceKind } from "./claudeLibrary";

describe("Claude reference library", () => {
  it("selects engineering notes for repository work", () => {
    expect(claudeGuidanceKind("Fix the TypeScript bug and run tests")).toBe("coding");
    expect(claudeGuidanceFor("Review this repository")).toContain("SOFTWARE ENGINEERING");
  });

  it("selects research notes for source-backed questions", () => {
    expect(claudeGuidanceKind("Research and compare sources")).toBe("research");
    expect(claudeGuidanceFor("Verify the latest release")).toContain("RESEARCH");
  });

  it("selects writing notes for drafting", () => {
    expect(claudeGuidanceKind("Rewrite this email")).toBe("writing");
    expect(claudeGuidanceFor("Draft a memo")).toContain("WRITING");
  });

  it("uses general notes when no specialist intent is detected", () => {
    expect(claudeGuidanceKind("Hello Jarvis")).toBe("general");
    expect(claudeGuidanceFor("Hello Jarvis")).toContain("REASONING");
  });

  it("does not claim that the selected provider is Claude", () => {
    expect(claudeGuidanceFor("fix code")).not.toMatch(/You are Claude/i);
  });
});
