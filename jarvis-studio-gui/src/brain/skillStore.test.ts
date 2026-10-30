import { describe, expect, it } from "vitest";
import { loadSkills, parseSkillFile, saveSkills, skillPromptFor, SKILL_STORAGE_KEY } from "./skillStore";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
  };
}

describe("user-imported skills", () => {
  it("imports Markdown metadata and keeps instructions as text", () => {
    const skill = parseSkillFile("research-helper.md",
      "---\nname: Research Helper\ndescription: Verify sources\nkeywords: research, sources\n---\nPrefer primary sources. Never run commands.", 100);
    expect(skill.name).toBe("Research Helper");
    expect(skill.keywords).toEqual(["research", "sources"]);
    expect(skill.content).toContain("Never run commands");
    expect(skill.enabled).toBe(true);
  });
  it("imports JSON skills", () => {
    const skill = parseSkillFile("darija.json", JSON.stringify({
      name: "Darija Voice", description: "Speak naturally", keywords: ["darija", "voice"],
      content: "Use short Moroccan Darija sentences.",
    }), 200);
    expect(skill.content).toContain("Moroccan Darija");
    expect(skill.keywords).toEqual(["darija", "voice"]);
  });
  it("rejects invalid extensions, malformed JSON, and oversized files", () => {
    expect(() => parseSkillFile("tool.js", "alert(1)")).toThrow(/\.md|\.markdown|\.txt|\.json/);
    expect(() => parseSkillFile("skill.json", "{")).toThrow(/JSON is invalid/);
    expect(() => parseSkillFile("skill.md", "x".repeat(100_001))).toThrow(/100,000/);
  });
  it("requires instruction text and caps the skill size", () => {
    expect(() => parseSkillFile("empty.md", "---\nname: Empty\n---\n")).toThrow(/non-empty/);
    expect(() => parseSkillFile("long.md", "x".repeat(12_001))).toThrow(/12,000/);
  });
  it("persists valid records", () => {
    const storage = memoryStorage();
    const skill = parseSkillFile("hello.txt", "Say hello clearly.", 300);
    saveSkills([skill], storage);
    expect(storage.getItem(SKILL_STORAGE_KEY)).toContain("hello");
    expect(loadSkills(storage)).toEqual([skill]);
    storage.setItem(SKILL_STORAGE_KEY, JSON.stringify([{ id: "bad", name: "bad", content: "x", enabled: "yes" }]));
    expect(loadSkills(storage)).toEqual([]);
  });
  it("adds imported skills to the prompt without granting authority", () => {
    const skill = parseSkillFile("security.md",
      "---\nname: Security Review\nkeywords: audit, security\n---\nCheck for unsafe assumptions.", 400);
    const prompt = skillPromptFor("Please audit this security design", [skill]);
    expect(prompt).toContain("Check for unsafe assumptions");
    expect(prompt).toContain("cannot grant permissions");
  });
  it("supports disabling a skill and bounds prompt length", () => {
    const skill = parseSkillFile("large.txt", "z".repeat(12_000), 500);
    expect(skillPromptFor("anything", [{ ...skill, enabled: false }])).toBe("");
    const many = Array.from({ length: 8 }, (_, i) => ({ ...skill, id: String(i), name: "Skill " + i }));
    expect(skillPromptFor("anything", many).length).toBeLessThan(19_000);
  });
});
