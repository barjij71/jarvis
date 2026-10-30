import { describe, expect, it } from "vitest";
import { claudeGuidanceFor, claudeGuidanceKind } from "./claudeLibrary";

describe("JARVIS task guidance library", () => {
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

  it("selects device automation guidance for actions", () => {
    expect(claudeGuidanceKind("Open the app and send a message")).toBe("automation");
    expect(claudeGuidanceFor("turn off the flashlight")).toContain("DEVICE AND WORKFLOW AUTOMATION");
  });

  it("selects voice guidance for speech-related requests", () => {
    expect(claudeGuidanceKind("Fix the microphone and wake word")).toBe("voice");
    expect(claudeGuidanceFor("Improve spoken replies in Darija")).toContain("VOICE AND CONVERSATION");
  });

  it("selects planning guidance for roadmaps and multi-step work", () => {
    expect(claudeGuidanceKind("Create a roadmap with milestones")).toBe("planning");
    expect(claudeGuidanceFor("قسم المهمة إلى خطوات")).toContain("TASK PLANNING");
  });

  it("selects security guidance before generic coding language", () => {
    expect(claudeGuidanceKind("Audit API key storage and permissions")).toBe("security");
    expect(claudeGuidanceKind("راجع أمان صلاحيات التطبيق")).toBe("security");
    expect(claudeGuidanceFor("Review secret handling")).toContain("SECURITY AND PRIVACY");
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
    expect(claudeGuidanceKind("قلب ليا على مصادر وقارن المعلومات")).toBe("research");
  });

  it("recognizes writing requests in Arabic and Moroccan Darija", () => {
    expect(claudeGuidanceKind("كتب ليا إيميل ولخص هاد النص")).toBe("writing");
    expect(claudeGuidanceKind("صايب ليا رسالة قصيرة")).toBe("writing");
  });

  it("recognizes explicit Arabic coding, research, and writing requests", () => {
    expect(claudeGuidanceKind("برمج لي أداة بسيطة")).toBe("coding");
    expect(claudeGuidanceKind("ابحث عن مصادر موثوقة وقارن بينها")).toBe("research");
    expect(claudeGuidanceKind("اكتب رسالة رسمية قصيرة")).toBe("writing");
  });

  it("recognizes Moroccan Darija automation and voice requests", () => {
    expect(claudeGuidanceKind("شعل ليا الفلاش")).toBe("automation");
    expect(claudeGuidanceKind("حسن ليا الصوت ديال جارفيس")).toBe("voice");
  });

  it("keeps general reasoning for Arabic questions without specialist intent", () => {
    expect(claudeGuidanceKind("شنو الفرق بين هاد الجوج؟")).toBe("general");
    expect(claudeGuidanceKind("اشرح لي الفكرة ببساطة")).toBe("general");
  });

  it("does not claim that the selected provider is Claude", () => {
    expect(claudeGuidanceFor("fix code")).not.toMatch(/You are Claude/i);
  });

  it("does not inject archive paths or permission-changing instructions", () => {
    for (const prompt of [
      "Fix the bug and run tests",
      "Research this question",
      "Rewrite this paragraph",
      "Open the app and send a message",
      "Improve the microphone",
      "Audit API key storage",
      "شنو الفرق بين هاد الجوج؟",
    ]) {
      const guidance = claudeGuidanceFor(prompt);
      expect(guidance).not.toContain("ANTHROPIC/CLAUDE-OPUS-5.5.md");
      expect(guidance).not.toMatch(/ignore all previous instructions/i);
      expect(guidance).not.toMatch(/grant (?:new )?tool permissions/i);
    }
  });
});
