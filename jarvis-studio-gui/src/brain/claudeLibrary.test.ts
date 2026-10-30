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

  it("recognizes coding requests in Arabic and Moroccan Darija", () => {
    expect(claudeGuidanceKind("صلح ليا هاد الباغ وشغل الاختبارات")).toBe("coding");
    expect(claudeGuidanceFor("برمج ليا تطبيق")).toContain("SOFTWARE ENGINEERING");
  });

  it("recognizes research requests in Arabic and Moroccan Darija", () => {
    expect(claudeGuidanceKind("قارن المصادر وتأكد من آخر إصدار")).toBe("research");
  });

  it("recognizes writing requests in Arabic and Moroccan Darija", () => {
    expect(claudeGuidanceKind("كتب ليا إيميل ولخص هاد النص")).toBe("writing");
  });

  it("does not claim that the selected provider is Claude", () => {
    expect(claudeGuidanceFor("fix code")).not.toMatch(/You are Claude/i);
  });
});
