import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseFeedInstant, selectPublishedAt, shortTeaser } from "./news-dates.ts";

const FETCHED_AT = Date.parse("2026-10-27T15:01:00.000Z");

describe("selectPublishedAt", () => {
  it("drops an embargo more than 15 minutes ahead of fetch time", () => {
    const published = selectPublishedAt({
      pubDate: "Wed, 28 Oct 2026 09:00:00 +0100",
      now: FETCHED_AT,
    });
    assert.equal(published, null);
    assert.equal(parseFeedInstant("Wed, 28 Oct 2026 09:00:00 +0100"), Date.parse("2026-10-28T08:00:00.000Z"));
  });

  it("keeps that stamp once fetch time has caught up", () => {
    assert.equal(
      selectPublishedAt({
        pubDate: "Wed, 28 Oct 2026 09:00:00 +0100",
        now: Date.parse("2026-10-28T08:10:00.000Z"),
      }),
      "2026-10-28T08:00:00.000Z",
    );
  });

  it("allows a few minutes of clock skew", () => {
    assert.equal(
      selectPublishedAt({
        pubDate: "Tue, 27 Oct 2026 16:10:00 +0100",
        now: Date.parse("2026-10-27T15:00:00.000Z"),
      }),
      "2026-10-27T15:10:00.000Z",
    );
  });

  it("uses Wien dc:date when pubDate is the two-hour GMT shift", () => {
    const fetchedDuringTheShift = Date.parse("2026-10-27T10:00:00.000Z");
    assert.equal(
      selectPublishedAt({
        pubDate: "Tue, 27 October 2026 11:14:18 GMT",
        dcDate: "2026-10-27T10:14:18+01:00",
        now: fetchedDuringTheShift,
      }),
      "2026-10-27T09:14:18.000Z",
    );
  });

  it("keeps tagesschau when pubDate and dc:date are the same instant", () => {
    assert.equal(
      selectPublishedAt({
        pubDate: "Tue, 27 Oct 2026 15:12:19 +0100",
        dcDate: "2026-10-27T14:12:19Z",
        now: FETCHED_AT,
      }),
      "2026-10-27T14:12:19.000Z",
    );
  });

  it("reads a zoneless civil time as Europe/Vienna, not UTC", () => {
    assert.equal(parseFeedInstant("2026-10-27T12:14:18"), Date.parse("2026-10-27T11:14:18.000Z"));
    assert.equal(parseFeedInstant("2026-07-15T12:14:18"), Date.parse("2026-07-15T10:14:18.000Z"));
    assert.equal(
      selectPublishedAt({ pubDate: "2026-10-27T12:14:18", now: FETCHED_AT }),
      "2026-10-27T11:14:18.000Z",
    );
  });
});

describe("shortTeaser", () => {
  it("cuts a long verbatim source text on a word boundary", () => {
    const source =
      "Am Montag, 2. November, um 18.30 Uhr liest Antje Ziegler im Rahmen von Montagslesen in der Bibliothek Hauptpost aus ihrem Lieblingsbuch. " +
      "Jeweils am ersten Montag des Monats lesen Gäste im Café StGall. Die Einladung wiederholt den gesamten Pressetext inklusive Ablauf, Biografie und Hinweise zur Kollekte, länger als eine Kurzmeldung.";
    const teaser = shortTeaser(source);
    assert.ok(teaser.length <= 220);
    assert.notEqual(teaser, source);
    assert.ok(teaser.endsWith("…"));
    assert.equal(shortTeaser("Kurze Meldung."), "Kurze Meldung.");
  });
});
